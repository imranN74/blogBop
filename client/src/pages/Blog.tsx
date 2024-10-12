import { BlogContent } from "../components/BlogContent";

export const Blog = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-start-2 col-end-12">
        <BlogContent />
      </div>
    </div>
  );
};
