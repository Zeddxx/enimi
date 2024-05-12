import { useAuth } from "@/context";
import { cn, formatDBDate } from "@/lib/utils";
import {
  useAddReplyMutation,
  useDeleteCommentMutation,
  useToggleLikeMutation,
} from "@/redux/auth";
import { IComment } from "@/types/comments.types";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import toast from "react-hot-toast";
import MainComment from "./main-comment";

interface Props {
  comment: IComment;
}

interface IReplyState {
  isReply: boolean;
  commentId: string;
}

const Comment = ({ comment }: Props) => {
  const [toggleLike] = useToggleLikeMutation();
  const { user } = useAuth();

  // react state to toggle the reply input.
  const [replyText, setReplyText] = React.useState<string>("");
  const [isReplyUtils, setIsReplyUtils] = React.useState<IReplyState>({
    commentId: "",
    isReply: false,
  });

  // rtk mutations
  const [reply, { isLoading }] = useAddReplyMutation();
  const [deleteComment] = useDeleteCommentMutation();

  // handle like toggle function.
  const handleToggleLike = (commentId: string) => {
    try {
      toggleLike({ commentId }).unwrap();
    } catch (error) {
      console.error(error);
      throw Error;
    }
  };

  // handle delete function
  const handleDelete = async (commentId: string) => {
    try {
      toast.promise(deleteComment({ id: commentId }).unwrap(), {
        loading: "Deleting comment...",
        error: "Error deleting comment...",
        success: "Comment deleted successfully!",
      });
    } catch (error) {
      console.error(error);
      throw Error;
    }
  };

  const handleReply = async (commentId: string) => {
    try {
      await reply({ commentId, reply: replyText }).unwrap();
      setReplyText("");
    } catch (error) {
      console.error(error);
      throw Error;
    }
  };
  return (
    <div className="w-full" key={comment._id}>
      <div className="flex justify-between py-2 w-full">
        <div className="flex gap-x-2 w-full">
          {/* comment author avatar */}
          <div className="user_avatar">
            <img
              src={comment.author.avatarUrl}
              alt="author avatar image"
              className="h-full -wfull object-cover"
            />
          </div>

          {/* main comment */}
          <div className="w-full">
            <div className="w-full">
              {/* comment author username */}
              <h5 className="leading-none text-lg">
                {comment.author.username}
              </h5>

              {/* formatted date */}
              <p className="text-xs text-muted-foreground">
                {formatDBDate(comment.createdAt)}
              </p>
            </div>

            {/* main comment content */}
            <MainComment comment={comment.comment} isSpoiler={comment.isSpoiler} />

            {/* social buttos. */}
            <div className="flex gap-x-2 mt-1 flex-col ">
              <span
                onClick={() =>
                  setIsReplyUtils({
                    isReply: !isReplyUtils.isReply,
                    commentId: comment._id,
                  })
                }
                className="text-sm text-muted-foreground"
              >
                show replies
              </span>

              {isReplyUtils.isReply && (
                <div className="flex w-full gap-2">
                  <Input
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="border-1 rounded-none focus-visible:ring-0 ring-0 focus-visible:ring-offset-0 border-b"
                    placeholder={`Reply to ${comment.author.username}`}
                  />
                  <Button
                    disabled={isLoading}
                    onClick={() => handleReply(comment._id)}
                  >
                    Reply
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex h-fit items-center gap-x-2">
          <div className="flex items-center justify-center">
            {comment.likes.some((id) => id === user?._id) ? (
              <span
                className="cursor-pointer"
                onClick={() => handleToggleLike(comment._id)}
              >
                <GoHeartFill className="fill-rose-500" />
              </span>
            ) : (
              <span
                className="cursor-pointer hover:text-rose-500 duration-200"
                onClick={() => handleToggleLike(comment._id)}
              >
                <GoHeart className="opacity-80 hover:opacity-100" />
              </span>
            )}
            <span className="text-xs text-center ml-2">
              {comment.likes.length}
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreHorizontal />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => handleDelete(comment._id)}
                asChild
                className={cn(
                  buttonVariants({
                    variant: "destructive",
                    className: "w-full hover:bg-destructive/70",
                  })
                )}
              >
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {comment.replies.map((reply) => (
        <div className="pl-12" key={reply._id}>
          <div className="flex justify-between py-2 w-full">
            <div className="flex gap-x-2 w-full">
              {/* comment author avatar */}
              <div className="user_avatar">
                <img
                  src={reply.author.avatarUrl}
                  alt="author avatar image"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* main comment */}
              <div className="w-full">
                <div className="w-full">
                  {/* comment author username */}
                  <h5 className="leading-none text-lg">
                    {reply.author.username}
                  </h5>

                  {/* formatted date */}
                  <p className="text-xs text-muted-foreground">
                    {formatDBDate(reply.createdAt)}
                  </p>
                </div>

                {/* main comment content */}
                <p className="">{reply.comment}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Comment;
