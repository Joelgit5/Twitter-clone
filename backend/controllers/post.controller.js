import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";

import { v2 as cloudinary } from "cloudinary";

// PATH     : /api/post/create"
// METHOD   : POST
// ACCESS   : PUBLIC
// DESC     : Crate Post
export const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    let { img } = req.body;
    const userId = req.user._id.toString();
    const user = await User.findById(userId);

    if (!user) return res.status(400).json({ message: "User not found" });

    if (!text && !img)
      return res.status(400).json({ message: "Post must have text or img" });

    if (img) {
      const uploadRespone = await cloudinary.uploader.upload(img);
      img = uploadRespone.secure_url;
    }

    const newPost = await Post.create({ user: userId, text, img });

    res.status(201).json(newPost);
  } catch (error) {
    console.log("Error in createPost Controller", error.message);
    res.status(500).json({ error: error.message });
  }
};

// PATH     : /api/post/id"
// METHOD   : DELETE
// ACCESS   : PUBLIC
// DESC     : Delete Post
export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post Not Found" });
    }

    if (post.user.toString() !== req.user._id.toString())
      return res
        .status(401)
        .json({ error: "You are not authorized to delete the post" });

    if (post.img) {
      const imgId = post.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }

    await Post.findByIdAndDelete(id);
    res.status(200).json("Post deleted successfully");
  } catch (error) {
    console.log("Error in deletePost Controller", error.message);
    res.status(500).json({ error: error.message });
  }
};

// PATH     : /api/post/comment/id"
// METHOD   : POST
// ACCESS   : PUBLIC
// DESC     : Comment On Post
export const commentOnPost = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;

    if (!text) return res.status(400).json({ error: "Text field is required" });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post Not Found" });

    const comment = { user: userId, text };
    post.comments.push(comment);
    await post.save();

    const notification = new Notification({
      from: userId,
      to: post.user,
      type: "comment",
    });

    await notification.save();

    return res.status(200).json(post);
  } catch (error) {
    console.log("Error in commentOnPost Controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

// PATH     : /api/post/like/user Id"
// METHOD   : POST
// ACCESS   : PUBLIC
// DESC     : Link & Unlike Post
export const likeUnlikePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const userLikePost = post.likes.includes(userId);

    if (userLikePost) {
      // Unlike The Post
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });

      res.status(200).json({ message: "Post Unliked Successfully" });
    } else {
      // Like The Post
      post.likes.push(userId);
      await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
      await post.save();

      const notification = new Notification({
        from: userId,
        to: post.user,
        type: "like",
      });
      await notification.save();

      return res.status(200).json({ message: "Post Liked Successfully" });
    }
  } catch (error) {
    console.log("Error in likeUnlikePost Controller", error.message);
    res.status(500).json({ error: error.message });
  }
};

// PATH     : /api/post/like/all"
// METHOD   : GET
// ACCESS   : PUBLIC
// DESC     : Get all Posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("user", "-password")
      .populate("comments.user", "-password");

    if (!posts || posts.length === 0) return res.status(200).json([]);

    return res.status(200).json(posts);
  } catch (error) {
    console.log("Error in getAllPosts Controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

// PATH     : /api/post/likes/userId"
// METHOD   : GET
// ACCESS   : PUBLIC
// DESC     : Get All Liked Posts
export const getLikedPosts = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const likedPosts = await Post.find({ _id: { $in: user.likedPosts } })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    res.status(200).json(likedPosts);
  } catch (error) {
    console.log("Error in getLikedPosts Controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

// PATH     : /api/post/following"
// METHOD   : GET
// ACCESS   : PUBLIC
// DESC     : Get Following Posts
export const getFollowingPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const following = user.following;

    const feedPosts = await Post.find({ user: { $in: following } })
      .sort({ createdAt: -1 })
      .populate("user", "-password")
      .populate("comments.user", "-password");

    return res.status(200).json(feedPosts);
  } catch (error) {
    console.log("Error in getFollowingPosts Controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

// PATH     : /api/post/user/username"
// METHOD   : GET
// ACCESS   : PUBLIC
// DESC     : Get User Posts
export const getUserPosts = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const post = await Post.find({
      user: user._id,
    })
      .sort({ createdAt: -1 })
      .populate("user", "-password")
      .populate("comments.user", "-password");

    return res.status(200).json(post);
  } catch (error) {
    console.log("Error in getUserPosts Controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
};
