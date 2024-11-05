import { ChangeEvent, useEffect, useState } from "react";
import { PostBlog } from "@imrannazir/medium-common-zod";
import axios from "axios";
import { BACKEND_BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { blogAtom } from "../store/atom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const CreateBlogForm: React.FC<{ isEdit: boolean }> = ({ isEdit }) => {
  type BlogPost = {
    title: string;
    content: string;
    createdAt: string;
    author: {
      name: string;
    };
    id: string;
    isAuther: boolean;
  };

  const specificBlog = useRecoilValue<BlogPost[]>(blogAtom("blogContent"));
  const navigate = useNavigate();
  const { id } = useParams();
  const [blogData, setBlogdata] = useState<PostBlog>({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (isEdit && specificBlog[0]) {
      setBlogdata({
        title: specificBlog[0].title,
        content: specificBlog[0].content,
      });
    } else {
      navigate(`/post`);
    }
  }, [isEdit]);

  const token = localStorage.getItem("jwt");
  async function handlePostSubmit() {
    if (blogData.title === "" || blogData.content === "") {
      toast.error("Please fill all fields");
    } else {
      const endPoint = isEdit ? `/blog/edit/${id}` : "/blog";
      const response = await axios.post(
        `${BACKEND_BASE_URL}${endPoint}`,
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
      toast.success(response.data.message);
      navigate("/");
    }
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
        <div className="flex justify-center">
          <div className="text-2xl text-red-600 font-bold underline">
            {isEdit ? "UPDATE BLOG" : "POST NEW BLOG"}
          </div>
        </div>
        <div className="mb-6 mx-2">
          <label className="text-2xl font-semibold">Title</label>
          <input
            onChange={handleInputChange}
            value={blogData.title}
            type="text"
            placeholder="Title"
            name="title"
            id=""
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
          <label className="text-2xl font-semibold">Content</label>
          <textarea
            name="content"
            onChange={handleInputChange}
            value={blogData.content}
            rows={10}
            cols={90}
            id="comment"
            className="w-full px-4 py-4 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Write content here..."
            required
          ></textarea>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handlePostSubmit}
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-7 py-3 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isEdit ? "Update" : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
};
