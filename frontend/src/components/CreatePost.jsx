import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CircleX, Images, Smile } from "lucide-react";

import { useRef, useState } from "react";
import toast from "react-hot-toast";

const CreatePost = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const imgRef = useRef(null);

  const queryClient = useQueryClient();

  // Mutation to create a post
  const {
    mutate: createPost,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ text, img }) => {
      try {
        const res = await fetch("/api/posts/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, img }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create post");
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: () => {
      setText("");
      setImg(null);
      toast.success("Post create successfully");
      // invalidate the query to refetch the data
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  // Fetch the authenticated user
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

  return (
    <div className="flex p-4 items-start gap-4 border-b border-gray-700">
      <div className="avatar">
        <div className="w-8 rounded-full">
          <img src={authUser.profileImg || "/avatar-placeholder.png"} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
        <textarea
          className="textarea w-full p-0 text-lg resize-none border-none focus:outline-none  border-gray-800"
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

        <div className="flex justify-between  border-t py-2 border-t-gray-700">
          <div className="flex gap-3 items-center">
            {/* Img Icon */}

            <Images
              absoluteStrokeWidth
              className="w-6 h-6 cursor-pointer text-sky-400"
              onClick={() => imgRef.current.click()}
            />

            {/* Emoji Icon */}
            <Smile className="w-5 h-5 cursor-pointer text-sky-400" />
          </div>

          <input
            type="file"
            accept="image/*"
            hidden
            ref={imgRef}
            onChange={handleImgChange}
          />

          <button className="btn btn-primary rounded-full btn-sm text-white px-4">
            {isPending ? "Posting..." : "Post"}
          </button>
        </div>

        {isError && <div className="text-red-500">{error.message}</div>}
      </form>
    </div>
  );
};

export default CreatePost;
