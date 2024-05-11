import { useGetCommentsFromIdQuery } from "@/redux/auth";
import Comment from "../comments/comment";
import CommentForm from "../comments/comment-form";

interface Props {
  animeId?: string;
  title?: string;
}

const CommentSection = ({ animeId, title }: Props) => {
  const { data: comments } = useGetCommentsFromIdQuery({ id: animeId || "" });

  if (!animeId || !title) {
    return null;
  }
  return (
    <div className="w-full">
      <div className="flex w-full gap-x-3">
        <CommentForm title={title} animeId={animeId} />
      </div>
      <div className="flex-1">
        {comments?.slice(0, 5).map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
};
export default CommentSection;
