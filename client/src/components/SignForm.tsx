import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { SignupInput } from "@imrannazir/medium-common-zod";
import { BACKEND_BASE_URL } from "../config";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { authAtom } from "../store/atom";
import { toast } from "react-toastify";

interface multyPage {
  pageType: string;
}

export const SignForm = ({ pageType }: multyPage) => {
  const [userData, setUserData] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  const setAuthToken = useSetRecoilState<boolean>(authAtom);
  const navigate = useNavigate();
  async function sendSignupRequest() {
    try {
      const { data } = await axios.post(
        `${BACKEND_BASE_URL}/user/${
          pageType === "signup" ? "signup" : "login"
        }`,
        userData
      );
      const token = data.token;
      setAuthToken(true);
      localStorage.setItem("jwt", token);
      if (pageType === "signup") {
        const name = userData.name.split(" ")[0];
        localStorage.setItem("name", name);
      } else {
        const name = data.name.split(" ")[0];
        localStorage.setItem("name", name);
      }
      navigate("/");
    } catch (error: any) {
      console.log(error.response);
      const { data, status } = error.response;
      if (status === 409) {
        toast.warn(data.message);
      } else {
        toast.warn(data.message);
      }
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-3/4">
        <div className="flex justify-center">
          <div className="font-semibold text-3xl">
            {pageType === "signup"
              ? "Create an account"
              : "Login to your account"}
          </div>
        </div>
        <div className="flex justify-center pt-2">
          <div>
            {pageType === "signup"
              ? "Already have an account?"
              : "Don't have an account?"}
            <span className="underline pl-2">
              <Link to={pageType === "signup" ? "/login" : "/signup"}>
                {pageType === "signup" ? "Login" : "Signup"}
              </Link>
            </span>
          </div>
        </div>
        <div>
          {pageType === "signup" ? (
            <LabelledInput
              placeholder="Full Name"
              label="Full Name"
              type="text"
              onchangeFun={(e) => {
                setUserData({ ...userData, name: e.target.value });
              }}
            />
          ) : (
            ""
          )}
          <LabelledInput
            placeholder="Email"
            label="Email"
            type="email"
            onchangeFun={(e) => {
              setUserData({ ...userData, email: e.target.value });
            }}
          />
          <LabelledInput
            placeholder="Password"
            label="Password"
            type="password"
            onchangeFun={(e) => {
              setUserData({ ...userData, password: e.target.value });
            }}
          />
          <div className="pt-4">
            <button
              type="button"
              onClick={sendSignupRequest}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full"
            >
              {pageType === "signup" ? "Signup" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface inputLabel {
  placeholder: string;
  label: string;
  type: string;
  onchangeFun: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LabelledInput = ({
  placeholder,
  label,
  type,
  onchangeFun,
}: inputLabel) => {
  return (
    <div className="py-2">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        type={type}
        id=""
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        onChange={onchangeFun}
        required
      />
    </div>
  );
};
