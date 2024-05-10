import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useAddCommentMutation } from "@/redux/auth";

interface IComment {
  comment: string;
}

interface Props {
  animeId: string;
}

const CommentForm = ({ animeId }: Props) => {
  const [comment, { isLoading }] = useAddCommentMutation();
  const form = useForm<IComment>();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  const onSubmit = handleSubmit(async (values: IComment) => {
    try {
      await comment({
        ...values,
        animeId,
      }).unwrap();
    } catch (error) {
      console.error(error);
      throw Error;
    }
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className="flex w-full gap-3 mb-6">
        <Label className="w-full">
          <Input
            placeholder={`Comment to ${animeId}`}
            className=""
            {...register("comment", { required: "Comment is required!" })}
          />
          {errors.comment && <span>{errors.comment.message}</span>}
        </Label>
        <Button
          disabled={isLoading}
          type="submit"
          className="max-w-[13rem] rounded-none w-full"
        >
          Comment
        </Button>
      </form>
    </FormProvider>
  );
};
export default CommentForm;
