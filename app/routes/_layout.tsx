import { LoaderFunction } from "@remix-run/node";
import {
  json,
  Outlet,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import { get_my_to_see_list } from "~/api/get-my-to-see-list";
import GeneralErrorBoundary from "~/components/GeneralErrorLayout";
import Header from "~/components/Header";
import ListSkeleton from "~/components/ListSkeleton";
import MemberSkeleton from "~/components/MemberSkeleton";
import GetGoogleLoginRelatedData from "~/LogicComp/GetGoogleLoginRelatedData";
import { getUserAvatar, getUserId, getUserName } from "~/tool/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const [avatar_src, user_id, user_name] = await Promise.all([
    getUserAvatar(request),
    getUserId(request),
    getUserName(request),
  ]);
  const to_see_list = await get_my_to_see_list(user_id);

  return json({ avatar_src, user_id, user_name, to_see_list });
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

      {list_skeleton && <ListSkeleton />}

      {member_skeleton && <MemberSkeleton />}

      <Outlet />
    </>
  );
}

export const ErrorBoundary = GeneralErrorBoundary;
