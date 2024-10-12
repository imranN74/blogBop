import { Logo } from "./Logo";
import { useRecoilState } from "recoil";
import { authAtom } from "../store/atom";
import { LogButton } from "./Logbutton";
import { useEffect } from "react";
import { CreateButton } from "./CreateButton";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useRecoilState(authAtom);
  console.log(isLoggedIn);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
    }
  }, [isLoggedIn]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-white shadow-lg">
      <div className="flex justify-between items-center h-full mx-5">
        <div className="flex justify-around">
          <div className="flex border-4 rounded-lg border-double py-1 border-lime-800">
            <Logo />
            <Logo />
          </div>
          <div className="flex w-80 cursor-pointer justify-evenly items-center">
            <div
              onClick={() => {
                navigate("/");
              }}
              className="hover:underline font-semibold text-xl"
            >
              Blogs
            </div>
            <div className="hover:underline font-semibold text-xl">
              About Us
            </div>
          </div>
        </div>

        <div>
          <div className="flex">
            {isLoggedIn ? <CreateButton /> : ""}
            <LogButton status={isLoggedIn} />
          </div>
        </div>
      </div>
    </div>
  );
};
