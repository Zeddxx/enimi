import RegisterForm from "@/components/forms/register-form";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <div className="auth_card border-r-muted bg-muted w-full hidden lg:block h-full border-r">
        {/* <img src="" alt="" /> */}
      </div>

      <div className="h-full flex flex-col justify-center min-h-[calc(100dvh-80px)] items-center w-full">

        <div className="w-full rounded border-muted sm:px-8 px-4 max-w-lg mx-auto">
          <h1 className="text-[clamp(1.5rem,6vw,2.4rem)] font-medium">
            Create an Account?
          </h1>
          <p className="text-muted-foreground text-sm">
            Creating an account on enimi will open features such as (currently
            watching etc.)
          </p>

          <span className="w-full h-px bg-muted flex my-5"></span>

          <div className="my-4">
            <RegisterForm />
          </div>

          <div className="">
            <p className="text-muted-foreground">
              Already have an account?
              <Link
                to="/login"
                className="text-primary underline underline-offset-2 ml-1"
              >
                Login.
              </Link>
            </p>
          </div>
        </div>

      </div>
    </>
  );
};
export default Register;
