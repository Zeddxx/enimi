import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useAddCommentMutation } from "@/redux/auth";
import { useLocation, useNavigate } from "react-router-dom";
import SignedIn from "../auth/signed-in";
import SignedOut from "../auth/signed-out";

interface IComment {
  comment: string;
}

interface Props {
  animeId: string;
  title: string;
}

const CommentForm = ({ animeId, title }: Props) => {
  const [comment, { isLoading }] = useAddCommentMutation();

  const { pathname } = useLocation();
  const callbackUrl = encodeURIComponent(pathname);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate(`/login?callbackUrl=${callbackUrl}`, { replace: false });
  };

  const form = useForm<IComment>();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  const onSubmit = handleSubmit(async (values: IComment) => {
    const isSpoiler: boolean = values.comment
      .split(" ")
      .some((text) => text === "/spoiler");
    const commentText: string = values.comment.replace(" /spoiler", " ");
    try {
      await comment({
        comment: commentText,
        isSpoiler,
        animeId,
      })
        .unwrap()
        .then(() => form.reset())
        .catch((err) => console.error(err));
    } catch (error) {
      console.error(error);
      throw Error;
    }
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={onSubmit}
        className="flex w-full sm:flex-row flex-col gap-3 mb-6"
      >
        <Label className="w-full">
          <Input
            placeholder={`Comment to ${title}`}
            className=""
            {...register("comment", { required: "Comment is required!" })}
          />
          {errors.comment && <span>{errors.comment.message}</span>}
        </Label>
        <SignedIn className="sm:max-w-[13rem] w-full">
          <Button disabled={isLoading} type="submit" className=" w-full">
            Comment
          </Button>
        </SignedIn>
        <SignedOut className="sm:max-w-[13rem] w-full">
          <Button onClick={handleLogin} className=" w-full">
            Comment
          </Button>
        </SignedOut>
      </form>
    </FormProvider>
  );
};
export default CommentForm;
