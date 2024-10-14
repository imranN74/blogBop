import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { blogAtom, blogSelector } from "../store/atom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader } from "./Loader";

export const Content = () => {
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

  const response = useRecoilValueLoadable(blogSelector("/blog"));
  const [blogData, setBlogData] = useRecoilState<BlogPost[]>(blogAtom("blog"));

  useEffect(() => {
    if (response.state === "hasValue") {
      setBlogData(response.contents.data);
    }
  }, [response]);

  return (
    <div className="mt-20">
      {response.state === "loading" ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className="">
          {blogData.map((element, index) => {
            const createdDate = element.createdAt.split("T");
            const date = new Date(createdDate[0]);

            const options: Intl.DateTimeFormatOptions = {
              day: "numeric",
              month: "long",
              year: "numeric",
            };
            const findate = date.toLocaleDateString("en-GB", options);

            return (
              <div key={index} className="mt-2 border-b py-5 shadow rounded-sm">
                <div className="flex mx-5">
                  <div className="px-1 font-semibold">
                    {element.author.name === ""
                      ? "Anonymous"
                      : element.author.name}
                  </div>
                  <div className="px-1">&#9679;</div>
                  <div className="px-1">{findate}</div>
                </div>
                <div className="mx-5 mt-2">
                  <div className="font-bold">
                    {element.title.length > 100
                      ? element.title.slice(0, 100) + "...."
                      : element.title}
                  </div>
                  <div className="mt-1">
                    {element.content.length > 250
                      ? element.content.slice(0, 250) + "...."
                      : element.content}
                    <Link
                      to={`/blog/${element.id}`}
                      className="font-bold font-mono  text-blue-500"
                    >
                      read
                    </Link>
                  </div>
                </div>
                <div className="mx-5 mt-5"></div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
