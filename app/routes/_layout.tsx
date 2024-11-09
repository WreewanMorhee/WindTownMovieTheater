import { LoaderFunction } from "@remix-run/node";
import { isRouteErrorResponse, json, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { get_my_to_see_list } from "~/api/get-my-to-see-list";
import GeneralErrorBoundary from "~/components/GeneralErrorLayout";
import Header from "~/components/Header";
import GetGoogleLoginRelatedData from "~/LogicComp/GetGoogleLoginRelatedData";
import { getUserAvatar, getUserId, getUserName } from "~/tool/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const [avatar_src, user_id, user_name] = await Promise.all([getUserAvatar(request), getUserId(request), getUserName(request)])
  const to_see_list = await get_my_to_see_list(user_id);

  return json({ avatar_src, user_id, to_see_list, user_name });
};

export default function Index() {
  const data = useLoaderData<typeof loader>()
  const { avatar_src, user_id } = data

  return (
    <>
       <Header avatar_src={avatar_src} user_id={user_id} />
       <GetGoogleLoginRelatedData {...data} />
       <Outlet  />
    </>
  );
}

export const ErrorBoundary = GeneralErrorBoundary
