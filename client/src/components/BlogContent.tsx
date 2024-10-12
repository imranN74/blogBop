import { useParams } from "react-router-dom";
import { useRecoilValueLoadable, useRecoilState } from "recoil";
import { blogAtom, specificBlogSelector } from "../store/atom";
import { useEffect } from "react";
import { Loader } from "./Loader";

export const BlogContent = () => {
  type BlogPost = {
    title: string;
    content: string;
    createdAt: string;
    author: {
      name: string;
    };
    id: string;
  };

  const { id } = useParams();
  // const navigate = useNavigate();
  const [blog, setBlogContent] = useRecoilState<BlogPost[]>(
    blogAtom("blogContent")
  );
  const blogContent = useRecoilValueLoadable(
    specificBlogSelector(`/blog/${id}`)
  );

  if (blogContent.state === "hasValue") {
    console.log(blogContent.contents);
  }

  useEffect(() => {
    if (blogContent.state === "hasValue") {
      setBlogContent([blogContent.contents.data]);
    }
  }, [blogContent]);

  console.log(blog);

  if (blogContent.state === "loading") {
    return (
      <div className="mt-20 flex justify-center h-screen items-center">
        <Loader />
      </div>
    );
  } else if (blog.length > 0) {
    return (
      <div className="mt-20">
        <div className="font-extrabold text-5xl">{blog[0].title}</div>
        <div className="mt-4 font-medium">Posted on 10 October 2024</div>
        <div className="pt-5 text-lg">{blog[0].content}</div>
      </div>
    );
  }
};
