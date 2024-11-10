import { lazy, Suspense } from "react";
import CommentSkeleton from "./CommentSkeleton";
import styles from "~/css/show.module.css";
import BasicSkeleton from "./BasicSkeleton";

const LazyCommentList = lazy(() => import("./CommentsList"));
const LazyLeaveComment = lazy(() => import("./LeaveComment"));

const CommentContainer = ({
  set_show,
}: {
  set_show: (value: boolean) => void;
}) => {
  const clickToHide = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget.nextElementSibling as HTMLElement;
    target.classList.remove(styles["show"]);
    void target.offsetWidth;
    target.classList.add(styles["hide"]);
    target.classList.add("hide");

    const target2 = e.currentTarget.previousElementSibling as HTMLElement;
    target2.classList.remove(styles["show2"]);
    void target2.offsetWidth;
    target2.classList.add(styles["hide2"]);
  };

  return (
    <div className={"fixed z-10 inset-0 "}>
      <div
        className={
          "absolute inset-0 bg-[#000000] opacity-[.8] " + styles["show2"]
        }
      />
      <div
        onClick={clickToHide}
        className="shadow-[2px_2px_30px_10px_rgba(255,255,255,0.1)] cursor-pointer absolute fone:bottom-[80px] desk:bottom-unset fone:top-unset desk:top-[24px] fone:right-[16px] desk:right-[calc(33vw+24px)] w-[45px] h-[45px] bg-center bg-no-repeat bg-[length:50%_50%] bg-[--bg] rounded-full bg-[url(/assets/cross.webp)] shadow-[0px_4px_10px_rgba(0,0,0,0.5)] z-[10]"
      />
      <div
        onAnimationEnd={(e) => {
          if (e.currentTarget.classList.contains("hide")) {
            set_show(false);
          } else {
            e.currentTarget.classList.remove(styles["show"])
          }
        }}
        className={
          "pt-[24px] pb-[80px] px-[--page-margin] overflow-scroll absolute top-0 right-0 bg-[--bg] h-full fone:w-[100vw] desk:w-[33vw] shadow-[0px_4px_10px_rgba(0,0,0,0.5)] " +
          styles["show"]
        }
      >
        <Suspense fallback={
          <>
           <BasicSkeleton className="rounded-[--rounded] w-full h-[42px]" />
           <CommentSkeleton className="mt-[calc(var(--to-top))]" />
          </>
          }>
           <LazyLeaveComment />
          <LazyCommentList />
        </Suspense>
      </div>
    </div>
  );
};

export default CommentContainer;
