import { useMatches } from "@remix-run/react";
import { lazy, Suspense, useState } from "react";
import { createPortal } from "react-dom";
import GeneralErrorBoundary from "~/components/GeneralErrorLayout";
import VideoCard from "~/components/VideoCard";
import { useTea } from "~/drinktea/tea";
import { useScrollHideHeader } from "~/hooks/useScrollHideHeader";
import { ToSeeData } from "~/interface/to-see-data";

const LazyGodHand = lazy(() => import("~/components/GodHand"));

const resort_by_key = (list: ToSeeData[], key: string): ToSeeData[] => {
  if (!key) return list;

  switch (key) {
    case "date-old":
      return list.sort(
        ({ collect_date: a = 0 }, { collect_date: b = 0 }) => a - b
      );
    case "date-new":
      return list.sort(
        ({ collect_date: a = 0 }, { collect_date: b = 0 }) => b - a
      );
    case "score-high":
      return list.sort(({ vote_average: a }, { vote_average: b }) => b - a);
    case "score-low":
      return list.sort(({ vote_average: a }, { vote_average: b }) => a - b);
    case "release-old":
      return list.sort(({ release_date: a1 }, { release_date: b1 }) => {
        const a = new Date(a1).valueOf();
        const b = new Date(b1).valueOf();

        return a - b;
      });
    case "release-new":
      return list.sort(({ release_date: a1 }, { release_date: b1 }) => {
        const a = new Date(a1).valueOf();
        const b = new Date(b1).valueOf();

        return b - a;
      });
  }

  return list;
};

const toggle_filter = (should_filter: boolean) => {
  const memberContent = document.querySelector(
    ".member-content"
  ) as HTMLElement | null;
  const header = document.querySelector("header") as HTMLElement | null;

  if (should_filter) {
    if (memberContent) memberContent.style.filter = "blur(15px)";
    if (header) header.style.filter = "blur(15px)";
  } else {
    if (memberContent) memberContent.style.filter = "";
    if (header) header.style.filter = "";
  }
};

interface LayoutData {
  to_see_list: ToSeeData[]; // Adjust this type to match the actual type of `to_see_list`
}

export default function Index() {
  const matches = useMatches();
  const layoutMatch = matches.find((match) => match.id === "routes/_layout") as
    | { data: LayoutData }
    | undefined;
  const to_see_list = layoutMatch?.data?.to_see_list || [];

  const [my_to_see_list] = useTea.my_to_see_list();

  const [turn_on_slot, set_turn_on_slot] = useState(false);
  const [filter_key, set_filter_key] = useTea.filter_key();

  const list_used = my_to_see_list || Object.values(to_see_list);

  const { scroll_down } = useScrollHideHeader();

  if (!list_used.length) {
    return (
      <div className="h-full tracking-[1px] text-white fone:text-[20px] desk:text-[24px] flex flex-col items-center justify-center gap-y-[32px]">
        <div className="w-[240px] h-[240px]">
          <img
            className="rounded-[--rounded]"
            width="240"
            height="240"
            src="/assets/go-to-collect.webp"
            alt="empty box"
          />
        </div>
        趕緊存放一些待看清單吧！
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          transitionTimingFunction: "ease",
        }}
        className={
          "px-[--comp-padding] duration-[450ms] transition-[transform] fone:z-[3] fone:fixed fone:top-[220px] fone:flex desk:block pt-[--to-top] bg-[--deep-blue] w-full z-[2] sticky top-[0px] relative inline-block" +
          (scroll_down ? " translate-y-[calc(var(--header-height)*-1)] " : "")
        }
      >
        <select
          value={filter_key}
          onChange={(e) => {
            set_filter_key(e.target.value);
          }}
          style={{
            textAlignLast: "center",
          }}
          className="cursor-pointer fone:mx-auto bg-[--deep-blue] text-white text-[18px] border border-white text-center py-[--comp-little-padding] rounded-[--rounded] w-[320px] appearance-none focus:ring-0 focus:outline-none"
        >
          <option value="date-old">依照收藏日期: 由遠到近</option>
          <option value="date-new">依照收藏日期: 由近到遠</option>
          <option value="score-high">依照評分: 由高到低</option>
          <option value="score-low">依照評分: 由低到高</option>
          <option value="release-old">依照首映日期: 由遠到近</option>
          <option value="release-new">依照首映日期: 由近到遠</option>
        </select>
      </div>

      <div
        key={list_used.length}
        className="fone:pt-[155px] mt-[24px] relative grid grid-cols-1 fone:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[--general-gap] pb-[10%] px-[--page-margin]"
      >
        {resort_by_key(list_used, filter_key).map((video: ToSeeData) => (
          <VideoCard key={video.id} {...video} />
        ))}

        <div
          onClick={() => {
            toggle_filter(true);
            set_turn_on_slot(true);
          }}
          className="cursor-pointer rounded-full right-[30px] bottom-[30px] fixed bg-gray-700 w-[60px] h-[60px] bg-center bg-[length:60%_60%] bg-no-repeat bg-[url(/assets/hand.webp)]"
        />

        {!!turn_on_slot &&
          createPortal(
            <>
              <div className="overflow-scroll fone:flex-col-reverse desk:flex-row fone:justify-start  desk:justify-center desk:gap-x-[160px] pb-[10vh] flex items-center z-[10] fixed w-[100vw] h-[100vh] top-0 left-0 bg-black bg-opacity-50">
                <Suspense
                  fallback={
                    <span className="my-auto text-[24px] text-[#ffffff] ">
                      上帝之手...熱機中！
                    </span>
                  }
                >
                  <LazyGodHand
                    set_turn_on_slot={set_turn_on_slot}
                    toggle_filter={toggle_filter}
                  />
                </Suspense>
              </div>
            </>,
            document.body
          )}
      </div>

      <div className="text-center fone:desk:mb-[30%] desk:mb-[10%] w-full text-[#ffffff] flex items-center justify-center flex-col fone:text-[20px] desk:text-[24px] tracking-[1px]">
        <div className="w-[160px] h-[160px] bg-cetner bg-no-repeat bg-contain bg-[url(/assets/loaded.webp)]" />
        繼續收藏更多影片吧！
      </div>
    </>
  );
}

export const ErrorBoundary = GeneralErrorBoundary;
