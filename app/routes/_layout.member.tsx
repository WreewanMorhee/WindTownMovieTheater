import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Outlet, redirect, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { createPortal } from "react-dom";
import GeneralErrorBoundary from "~/components/GeneralErrorLayout";
import { useTea } from "~/drinktea/tea";
import { useRecordScrollPositionAtToSeeList } from "~/hooks/useRecordScrollPositionAtToSeeList";
import { useScrollHideHeader } from "~/hooks/useScrollHideHeader";

export const meta: MetaFunction = () => [
  { title: "我的待看清單" },

  {
    name: "description",
    content: `我的待看清單, 無聊時隨時挑選自己想要的影集。`,
  },
];

export const loader: LoaderFunction = ({ params }) => {
  if (!params.tab) {
    return redirect("/member/to-see-list");
  }

  if (params.tab !== 'to-see-list') {
    throw new Response("Not Found", { status: 404 });
  }

  return {};
};

export default function Index() {
  const navigate = useNavigate();

  const [show_elf, set_show_elf] = useState(false);
  const clickToLogOut = async () => {
    set_show_elf(true);
    await fetch("/api-logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    window.location.href = "/";
  };

  const [my_to_see_list = []] = useTea.my_to_see_list();

  const scrollRecRef = useRecordScrollPositionAtToSeeList();
  const { scroll_down, scrollHeaderRef } = useScrollHideHeader();

  return (
    <>
      <div
        className={
          "fone:h-[calc(100svh-var(--header-height))]  member-content transition-[filter]  desk:h-[calc(100vh-75px)] flex bg-[--big] overflow-hidden fone:pt-[16px] desk:pt-[0px] fone:flex-col desk:flex-row " +
          ""
        }
      >
        <div
          style={{
            transitionTimingFunction: "ease",
          }}
          className={
            "duration-[450ms] transition-[transform] bg-[--deep-blue] fone:z-[3] fone:fixed fone:top-[--header-height] justify-center text-white fone:p-[16px] desk:p-5 flex items-center overflow-hidden gap-[--general-gap] fone:flex-row-reverse desk:flex-col fone:w-full desk:w-1/4 fone:min-h-[98px] " +
            (scroll_down ? " translate-y-[calc(var(--header-height)*-1)] " : "")
          }
        >
          {/* Buttons */}
          <button
            onClick={() => navigate(`/member/to-see-list`)}
            className="text-[#ffffff] bg-[--bg] border border-[--teal] w-[80%] p-[--comp-little-padding] rounded-[--rounded]"
          >
            待看清單 <br className="desk-none" /> ({my_to_see_list.length})
          </button>
          <button
            onClick={clickToLogOut}
            className="desk:mb-[20vh] bg-gray-700 w-[80%] p-2 rounded-[--rounded]"
          >
            登出
          </button>
        </div>

        <div className="fone:hidden fone:w-[80%] desk:w-[1px] fone:min-h-[1px] desk:h-[50vh] bg-[--btn-bg] self-center"></div>

        <div
          ref={(e: HTMLDivElement | null) => {
            scrollRecRef.current = e;
            scrollHeaderRef.current = e;
          }}
          className={
            "fone:h-[calc(100svh-var(--header-height))] transition-[--transition-time] transition-[transform] fone:w-full desk:w-3/4  overflow-scroll "
          }
        >
          <Outlet />
        </div>
      </div>

      {show_elf &&
        createPortal(
          <>
            <div
              style={{
                backdropFilter: "blur(10px)",
              }}
              className="text-[#ffffff] flex items-center justify-center z-[10] fixed w-[100vw] h-[100vh] top-0 left-0 bg-black bg-opacity-50"
            >
              小精靈正在為您登出中...
            </div>
          </>,
          document.body
        )}
    </>
  );
}

export const ErrorBoundary = GeneralErrorBoundary
