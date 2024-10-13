import { ChangeEvent, useState } from "react";
import { PostBlog } from "@imrannazir/medium-common-zod";
import axios from "axios";
import { BACKEND_BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const CreateBlogForm = () => {
  const navigate = useNavigate();
  const [blogData, setBlogdata] = useState<PostBlog>({
    title: "",
    content: "",
  });

  const token = localStorage.getItem("jwt");
  async function handlePostSubmit() {
    if (blogData.title === "" || blogData.content === "") {
      alert("Please fill all fields");
    }
    const response = await axios.post(
      `${BACKEND_BASE_URL}/blog`,
      {
        title: blogData.title,
        content: blogData.content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert(response.data.message);
    navigate("/");
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setBlogdata({ ...blogData, [name]: value });
  }

  return (
    <div className="mt-24">
      <div>
        <div className="mb-6">
          <input
            onChange={handleInputChange}
            type="text"
            placeholder="Title"
            name="title"
            id=""
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
          <label className="sr-only">Your comment</label>
          <textarea
            name="content"
            onChange={handleInputChange}
            rows={10}
            cols={60}
            id="comment"
            className="w-full px-1 text-sm text-gray-900 bg-white border border-gray-300 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Write a body..."
            required
          ></textarea>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handlePostSubmit}
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-7 py-3 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};
