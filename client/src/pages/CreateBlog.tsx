import { CreateBlogForm } from "../components/CreateBlogForm";

export const CreateBlog = () => {
  return (
    <div className="grid grid-cols-10">
      <div className="col-span-full md:col-start-3 md:col-end-9">
        <CreateBlogForm isEdit={false} />
      </div>
    </div>
  );
};
