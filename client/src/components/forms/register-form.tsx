import { FormProvider, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface IRegister {
  username: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const form = useForm<IRegister>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = handleSubmit((values: IRegister) => {
    console.log(values);
  });

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

        <Button className="w-full" type="submit">
          Register
        </Button>
      </form>
    </FormProvider>
  );
};
export default RegisterForm;
