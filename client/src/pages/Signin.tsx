import { SignForm } from "../components/SignForm";
import { Quote } from "../components/Quote";

export const Signin = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <SignForm pageType="signin" />
      </div>
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
};
