import { useRecoilValue } from "recoil";
import { blogAtom } from "../store/atom";

export const UserName = () => {
  const userName = useRecoilValue(blogAtom("userName"));
  return <div>{userName[0].author.name}</div>;
};
