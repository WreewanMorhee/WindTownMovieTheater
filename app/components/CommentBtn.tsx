import { useState } from "react";
import { createPortal } from "react-dom";
import CommentContainer from "./CommentContainer";

const CommentBtn = () => {
  const [show, set_show] = useState(false);

  return (
    <>
      <div
        onClick={() => {
          set_show(true);
        }}
        className="cursor-pointer relative rounded-full bg-[length:60%_60%] bg-[--bg] bg-center bg-no-repeat w-[50px] h-[50px] bg-[url(/assets/comment.webp)]"
      />

      {!!show &&
        createPortal(
          <CommentContainer set_show={set_show} />,
          document.body
        )}
    </>
  );
};

export default CommentBtn;
