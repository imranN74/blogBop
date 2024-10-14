import { useParams } from "react-router-dom";
import { useRecoilValueLoadable, useRecoilState } from "recoil";
import { blogAtom, specificBlogSelector } from "../store/atom";
import { useEffect } from "react";
import { Loader } from "./Loader";
import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";

export const BlogContent = () => {
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

  const { id } = useParams();
  // const navigate = useNavigate();
  const [blog, setBlogContent] = useRecoilState<BlogPost[]>(
    blogAtom("blogContent")
  );
  const blogContent = useRecoilValueLoadable(
    specificBlogSelector(`/blog/${id}`)
  );

  // if (blogContent.state === "hasValue") {
  //   console.log(blogContent.contents);
  // }

  useEffect(() => {
    if (blogContent.state === "hasValue") {
      setBlogContent([
        blogContent.contents.data,
        blogContent.contents.isAuther,
      ]);
    }
  }, [blogContent]);

  // console.log("auther right=====", blog);

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
        <div className=" mt-4 flex justify-between">
          <div className="flex items-center">
            <div className="font-medium">Posted on 10 October 2024</div>
            <div className="px-2">&#9679;</div>
            <div className="font-medium">{blog[0].author.name}</div>
          </div>
          {blog[1] ? (
            <div className="flex">
              <DeleteButton />
              <EditButton />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="pt-5 text-lg">{blog[0].content}</div>
      </div>
    );
  }
};
