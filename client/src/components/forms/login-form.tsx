// react imports...
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

// react hook form imports...
import { FormProvider, useForm } from "react-hook-form";

// shadcn components import...
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// rtk mutations import...
import { useLoginMutation } from "@/redux/auth";

// utility functions imports...
import { isCustomError } from "@/lib/utils";

// types imports...
import { ExtendedError } from "@/types/more.types";


// interface types for login user
interface ILogin {
  email: string;
  password: string;
}

const LoginForm = () => {
  const form = useForm<ILogin>();

  // state to store the error getting from the server...
  const [credentialError, setCredentialError] = React.useState<string>("");

  // navigator to navigate user after login
  const navigate = useNavigate();

  // params to search for callback url
  const [searchParams] = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/home"

  // form states destructured.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  // login mutation function.
  const [login, { isLoading }] = useLoginMutation();

  // onSubmit handler!
  const onSubmit = handleSubmit(async (values: ILogin) => {
    try {
      toast.promise(handleLogin(values), {
        loading: "Logging in...",
        success: "logged in successfully!",
        error: "Something went wrong!",
      });
      form.reset();
    } catch (error) {
      throw Error;
    }
  });

  const handleLogin = async (values: ILogin) => {
    try {
      await login(values).unwrap();
      setCredentialError("");
      // if all good the navigate user back to the callback url.
      navigate(callbackUrl, { replace: true });
    } catch (error) {
      if (isCustomError(error)) {
        setCredentialError((error as ExtendedError).data.message);
        throw Error;
      } else {
        console.error(error);
        setCredentialError("something went wrong!");
      }
      throw Error;
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className="space-y-3">
        <div className="">
          <Label className="font-normal text-base">
            Email
            <Input
              placeholder="example@gmail.com"
              type="email"
              className="mt-2"
              {...register("email", { required: "email is required!" })}
            />
            {errors.email && (
              <span className="error_msg_state">{errors.email.message}</span>
            )}
          </Label>
        </div>

        <div className="">
          <Label className="font-normal text-base">
            Password
            <Input
              placeholder="******"
              type="password"
              className="mt-2"
              {...register("password", {
                required: "password is required!",
                validate: (password) => {
                  if (password.length < 6) {
                    return "Password must be at least 6 characters!";
                  } else {
                    return true;
                  }
                },
              })}
            />
            {errors.password && (
              <span className="error_msg_state">{errors.password.message}</span>
            )}
          </Label>
        </div>
        {credentialError && (
          <span className="py-2 text-center block bg-destructive/20 px-2 text-destructive">
            ⚠️ {credentialError}
          </span>
        )}

        <Button
          isLoading={isLoading}
          disabled={isLoading}
          className="w-full"
          type="submit"
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </FormProvider>
  );
};
export default LoginForm;
