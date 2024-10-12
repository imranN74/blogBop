import { RecoilRoot } from "recoil";
import { Content } from "../components/Content";

export const LandingBlogs = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12">
      <RecoilRoot>
        <div className="col-span-1 md:col-start-2 md:col-end-12">
          <Content />
        </div>
      </RecoilRoot>
    </div>
  );
};
