import { LoaderFunction } from "@remix-run/node";
import {
  isRouteErrorResponse,
  json,
  Outlet,
  useLoaderData,
  useLocation,
  useRouteError,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import { get_my_to_see_list } from "~/api/get-my-to-see-list";
import BasicSkeleton from "~/components/BasicSkeleton";
import GeneralErrorBoundary from "~/components/GeneralErrorLayout";
import Header from "~/components/Header";
import GetGoogleLoginRelatedData from "~/LogicComp/GetGoogleLoginRelatedData";
import { getUserAvatar, getUserId, getUserName } from "~/tool/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const [avatar_src, user_id, user_name] = await Promise.all([
    getUserAvatar(request),
    getUserId(request),
    getUserName(request),
  ]);
  const to_see_list = await get_my_to_see_list(user_id);

  return json({ avatar_src, user_id, to_see_list, user_name });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const { avatar_src, user_id } = data;

  const [list_skeleton, set_list_skeleton] = useState(false);
  const [member_skeleton, set_member_skeleton] = useState(false);

  const { pathname } = useLocation();
  useEffect(() => {
    set_list_skeleton(false);
    set_member_skeleton(false);
  }, [pathname]);

  return (
    <>
      <Header
        avatar_src={avatar_src}
        user_id={user_id}
        set_list_skeleton={set_list_skeleton}
        set_member_skeleton={set_member_skeleton}
      />
      <GetGoogleLoginRelatedData {...data} />

      {list_skeleton && (
        <div className="z-[4] bg-[--deep-blue]  left-[0px] right-[0px] fixed w-full">
          <div className=" w-full h-[calc(100svh-var(--header-height))] container mx-auto fone:overflow-scroll p-[--page-margin] pt-[--to-top]">
            <div className="mx-auto items-start content-start  bottom-[0px] left-[0px] grid grid-cols-1 fone:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-[--general-gap] ">
              <BasicSkeleton className="video-card relative shadow-md rounded-[--rounded] overflow-hidden pb-[150%]" />
              <BasicSkeleton className="video-card relative shadow-md rounded-[--rounded] overflow-hidden pb-[150%]" />
              <BasicSkeleton className="video-card relative shadow-md rounded-[--rounded] overflow-hidden pb-[150%]" />
              <BasicSkeleton className="video-card relative shadow-md rounded-[--rounded] overflow-hidden pb-[150%]" />
              <BasicSkeleton className="video-card relative shadow-md rounded-[--rounded] overflow-hidden pb-[150%]" />
            </div>
          </div>
        </div>
      )}

      {member_skeleton && (
        <div
          className={
            "fone:h-[calc(100svh-var(--header-height))]  member-content transition-[filter]  desk:h-[calc(100vh-75px)] flex bg-[--big] overflow-hidden fone:pt-[16px] desk:pt-[0px] fone:flex-col desk:flex-row "
          }
        >
          <div
            className={
              "bg-[--deep-blue] fone:z-[3] fone:fixed fone:top-[--header-height] justify-center text-white fone:p-[16px] desk:p-5 flex items-center overflow-hidden gap-[--general-gap] fone:flex-row-reverse desk:flex-col fone:w-full desk:w-1/4 fone:min-h-[98px] "
            }
          >
            <BasicSkeleton className="text-[#ffffff] bg-[--bg]  w-[80%] p-[--comp-little-padding] rounded-[--rounded]">
              <span className="opacity-0">
                loading <br className="desk-none" /> (loading)
              </span>
            </BasicSkeleton>

            <BasicSkeleton className="desk:mb-[20vh] bg-gray-700 w-[80%] p-2 rounded-[--rounded]">
              <span className="opacity-0"> loading </span>
            </BasicSkeleton>
          </div>

          <div className="fone:hidden fone:w-[80%] desk:w-[1px] fone:min-h-[1px] desk:h-[50vh] bg-[--btn-bg] self-center"></div>

          <div
            className={
              "fone:h-[calc(100svh-var(--header-height))] fone:w-full desk:w-3/4  overflow-scroll "
            }
          >
            <div
              className={
                "px-[--comp-padding] fone:z-[3] fone:fixed fone:top-[220px] fone:flex desk:block pt-[--to-top] bg-[--deep-blue] w-full z-[2] sticky top-[0px] relative inline-block"
              }
            >
              <BasicSkeleton
                style={{
                  textAlignLast: "center",
                }}
                className="cursor-pointer fone:mx-auto bg-[--deep-blue] text-white text-[18px]  text-center py-[--comp-little-padding] rounded-[--rounded] w-[320px] appearance-none focus:ring-0 focus:outline-none"
              >
                <span className="opacity-0"> loading </span>
              </BasicSkeleton>
            </div>

            <div className="fone:pt-[155px] mt-[24px] relative grid grid-cols-1 fone:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[--general-gap] pb-[10%] px-[--page-margin]">
              <BasicSkeleton className="video-card relative shadow-md rounded-[--rounded] overflow-hidden pb-[150%]" />
              <BasicSkeleton className="video-card relative shadow-md rounded-[--rounded] overflow-hidden pb-[150%]" />
              <BasicSkeleton className="video-card relative shadow-md rounded-[--rounded] overflow-hidden pb-[150%]" />
              <BasicSkeleton className="video-card relative shadow-md rounded-[--rounded] overflow-hidden pb-[150%]" />
            </div>
          </div>
        </div>
      )}

      <Outlet />
    </>
  );
}

export const ErrorBoundary = GeneralErrorBoundary;
