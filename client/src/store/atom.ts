import { selectorFamily, atomFamily, atom } from "recoil";
import { BACKEND_BASE_URL } from "../config";
import axios from "axios";

type BlogPost = {
  title: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
  };
  id: string;
};

export const blogAtom = atomFamily<BlogPost[], string>({
  key: "blogData",
  default: [],
});

const storedAuth = localStorage.getItem("jwt") ? true : false;
export const authAtom = atom<boolean>({
  key: "isAuth",
  default: storedAuth,
});

export const blogSelector = selectorFamily({
  key: "blogFetch",
  get: (type: string) => async () => {
    const response = await axios.get(`${BACKEND_BASE_URL}${type}`);
    return response.data;
  },
});

export const specificBlogSelector = selectorFamily({
  key: "specificBlogFetch",
  get: (type: string) => async () => {
    const token = localStorage.getItem("jwt");
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}${type}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return "something went wrong while fetching the blog data";
    }
  },
});
