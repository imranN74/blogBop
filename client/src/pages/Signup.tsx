import { RecoilRoot } from "recoil";
import { Quote } from "../components/Quote";
import { SignForm } from "../components/SignForm";

export const Signup = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <RecoilRoot>
          <SignForm pageType="signup" />
        </RecoilRoot>
      </div>
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
};
