import { FormProvider, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useLoginMutation } from "@/redux/auth";
import toast from "react-hot-toast";

interface ILogin {
  email: string;
  password: string;
}

const LoginForm = () => {
  const form = useForm<ILogin>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = handleSubmit(async (values: ILogin) => {
    try {
      toast.promise(login(values).unwrap(), {
        loading: "Logging in...",
        success: "logged in successfully!",
        error: "Something went wrong!",
      });
      form.reset();
    } catch (error) {
      console.log(error);
    }
  });

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
