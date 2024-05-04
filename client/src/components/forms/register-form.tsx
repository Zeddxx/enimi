// react imports...
import React from "react";
import toast from "react-hot-toast";

// react hook form imports...
import { FormProvider, useForm } from "react-hook-form";

// shadcn components imports...
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

// rtk mutations...
import { useRegisterMutation } from "@/redux/auth";

// utlities functions...
import { isCustomError } from "@/lib/utils";

// types imports...
import { ExtendedError } from "@/types/more.types";


// interface for registering a user.
interface IRegister {
  username: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const form = useForm<IRegister>();

  // state to store the error and success message getting back from the backend.
  const [credentialError, setCredentialError] = React.useState<string>("");
  const [credentialSuccess, setCredentialSuccess] = React.useState<string>("");

  // register user mutations.
  const [registerUser, { isLoading }] = useRegisterMutation();

  // form state destructoring...
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  // onSubmit handler
  const onSubmit = handleSubmit(async (values: IRegister) => {
    try {
      toast.promise(handleRegister(values), {
        loading: "Creating account...",
        success: "Account created successfully!. Check your email to verify.",
        error: "Something went wrong!",
      }).then(() => setCredentialSuccess(`Check your email ${values.email.slice(0,5)+'****'} and verify your account!`))
      form.reset();
    } catch (error) {
      throw Error;
    }
  });

  const handleRegister = async (values: IRegister) => {
    try {
      await registerUser(values).unwrap();
      form.reset();
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
            Username
            <Input
              placeholder="@enimi"
              type="text"
              className="mt-2"
              {...register("username", { required: "username is required!" })}
            />
            {errors.username && (
              <span className="error_msg_state">{errors.username.message}</span>
            )}
          </Label>
        </div>

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

        {credentialSuccess && (
          <span className="p-2 text-center text-green-500 bg-green-200 block">
            {credentialSuccess}
          </span>
        )}

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
          {isLoading ? "Creating..." : "Register"}
        </Button>
      </form>
    </FormProvider>
  );
};
export default RegisterForm;
