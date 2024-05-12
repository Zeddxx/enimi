import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  isSpoiler: boolean;
  comment: string;
}

const MainComment = ({ comment, isSpoiler }: Props) => {
  const [isShowingSpoiler, setIsShowingSpoiler] =
    React.useState<boolean>(false);

  return (
    <>
      <p
        className={cn(
          isSpoiler && "blur-sm relative",
          isShowingSpoiler && "blur-none"
        )}
      >
        {comment}
      </p>
      {isSpoiler && (
        <span
          onClick={() => setIsShowingSpoiler(!isShowingSpoiler)}
          className="text-xs underline text-primary"
        >
          {isShowingSpoiler ? "hide" : "show"} spoiler
        </span>
      )}
    </>
  );
};
export default MainComment;
