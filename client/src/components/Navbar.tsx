import { Logo } from "./Logo";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authAtom } from "../store/atom";
import { LogButton } from "./Logbutton";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = useRecoilValue(authAtom);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the menu state
  };

  useEffect(() => {
    const button = document.getElementById("menu-toggle-button");
    if (button) {
      button.setAttribute("aria-expanded", menuOpen ? "true" : "false");
    }
  }, [menuOpen]);

  return (
    <nav className="cursor-pointer bg-white fixed top-0 left-0 right-0 z-50 border-gray-200 dark:bg-gray-900 border-b dark:border-gray-700">
      <div className="cursor-pointer max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div>
          <div className="cursor-pointer flex border-4 rounded-lg border-double py-1 border-lime-800">
            <Logo />
            <Logo />
          </div>
        </div>
        <button
          data-collapse-toggle="navbar-multi-level"
          type="button"
          onClick={toggleMenu}
          className="cursor-pointer inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-multi-level"
          id="menu-toggle-button"
        >
          <span className="cursor-pointer sr-only">Open main menu</span>
          <svg
            className="cursor-pointer w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`cursor-pointer w-full md:block md:w-auto ${
            menuOpen ? "" : "hidden"
          }`}
          id="navbar-multi-level"
        >
          <ul className="cursor-pointer flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              {isLoggedIn ? (
                <div
                  onClick={() => {
                    navigate("/post");
                    toggleMenu();
                  }}
                  className="cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Create Post
                </div>
              ) : (
                ""
              )}
            </li>
            <li>
              <div
                onClick={() => {
                  navigate("/");
                  toggleMenu();
                }}
                className="cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                aria-current="page"
              >
                Blogs
              </div>
            </li>
            <li>
              <div
                onClick={() => {
                  navigate("/aboutus");
                  toggleMenu();
                }}
                className="cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                About Us
              </div>
            </li>
            <li>
              <LogButton status={isLoggedIn} toggle={toggleMenu} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
