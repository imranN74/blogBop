import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authAtom } from "../store/atom";

interface UserStatus {
  status: boolean;
  toggle: () => void;
}

export const LogButton: React.FC<UserStatus> = ({ status, toggle }) => {
  const setAuth = useSetRecoilState(authAtom);
  const navigate = useNavigate();
  function handleLogButtonClick() {
    if (status) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("name");
      setAuth(false);
      navigate("/login");
    } else {
      navigate("/login");
    }
  }

  return (
    <div
      onClick={() => {
        handleLogButtonClick();
        toggle();
      }}
      className="cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    >
      {status ? "Logout" : "Login"}
    </div>
  );
};
