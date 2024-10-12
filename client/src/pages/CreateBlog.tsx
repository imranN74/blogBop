import { CreateBlogForm } from "../components/CreateBlogForm";

export const CreateBlog = () => {
  return (
    <div className="grid grid-cols-10">
      <div className="col-start-3 col-end-9">
        <CreateBlogForm />
      </div>
    </div>
  );
};
