import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const DeleteButton = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  async function handleDeleteButton() {
    const confirmValue: boolean = confirm("Do you want to delete this post?");

    if (confirmValue) {
      try {
        const token = localStorage.getItem("jwt");
        const { data } = await axios.post(
          `${BACKEND_BASE_URL}/blog/delete/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.warning(data.message);
        navigate("/");
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    }
  }

  return (
    <div>
      <button
        title="delete post"
        onClick={handleDeleteButton}
        type="button"
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
    </div>
  );
};
