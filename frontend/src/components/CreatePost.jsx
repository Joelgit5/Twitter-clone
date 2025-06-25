import toast from "react-hot-toast";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { CircleX, Images, Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const CreatePost = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const imgRef = useRef(null);
  const emojiRef = useRef(null);

  const queryClient = useQueryClient();

  // Mutation to create a post
  const {
    mutate: createPost,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ text, img }) => {
      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, img }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create post");
    },
    onSuccess: () => {
      setText("");
      setImg(null);
      toast.success("Post created successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost({ text, img });
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setText((prev) => prev + emoji.native);
  };

  // Close picker on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex p-4 items-start gap-4 border-b border-gray-700 relative">
      <div className="avatar">
        <div className="w-8 rounded-full">
          <img src={authUser?.profileImg || "/avatar-placeholder.png"} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
        <textarea
          className="textarea w-full p-0 text-lg resize-none border-none focus:outline-none border-gray-800 bg-transparent"
          placeholder="What is happening?!"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {img && (
          <div className="relative w-72 mx-auto">
            <CircleX
              onClick={() => {
                setImg(null);
                imgRef.current.value = null;
              }}
              className="absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer"
            />
            <img
              src={img}
              className="w-full mx-auto h-72 object-contain rounded"
            />
          </div>
        )}

        <div className="flex justify-between items-center border-t py-2 border-t-gray-700">
          <div className="flex gap-3 items-center">
            {/* Image Icon */}
            <Images
              absoluteStrokeWidth
              className="w-6 h-6 cursor-pointer text-sky-400"
              onClick={() => imgRef.current.click()}
            />

            <input
              type="file"
              accept="image/*"
              hidden
              ref={imgRef}
              onChange={handleImgChange}
            />

            {/* Smile Icon */}
            <div className="relative" ref={emojiRef}>
              <Smile
                className="w-5 h-5 cursor-pointer text-sky-400"
                onClick={() => setShowEmojiPicker((prev) => !prev)}
              />
              {showEmojiPicker && (
                <div className="absolute z-50 top-8 left-0">
                  <Picker
                    data={data}
                    onEmojiSelect={handleEmojiSelect}
                    theme="dark"
                  />
                </div>
              )}
            </div>
          </div>

          <button
            className="btn btn-primary rounded-full btn-sm text-white px-4"
            type="submit"
          >
            {isPending ? "Posting..." : "Post"}
          </button>
        </div>

        {isError && <div className="text-red-500">{error.message}</div>}
      </form>
    </div>
  );
};

export default CreatePost;
