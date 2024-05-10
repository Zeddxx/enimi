import { useGetCommentsFromIdQuery } from "@/redux/auth";
import Comment from "../comments/comment";
import CommentForm from "../comments/comment-form";

interface Props {
  animeId?: string;
}

const CommentSection = ({ animeId }: Props) => {
  const { data: comments } = useGetCommentsFromIdQuery({ id: animeId || "" });

  if (!animeId) {
    return null;
  }
  return (
    <div className="w-full">
      <div className="flex w-full gap-x-3">
        <CommentForm animeId={animeId} />
      </div>
      <div className="flex-1">
        {comments?.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
};
export default CommentSection;
