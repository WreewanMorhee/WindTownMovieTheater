import { LoaderFunctionArgs } from "@remix-run/node";
import {
  Outlet,
  redirect,
} from "@remix-run/react";
import GeneralErrorBoundary from "~/components/GeneralErrorLayout";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { cate = "", keyword } = params;

  if (!["search-movie", "search-tv"].includes(cate)) {
    throw new Response("Not Found", { status: 404 });
  }

  if (!keyword) {
    return redirect('/')
  }

  return {};
};

export default function Index() {

  return <Outlet />;
}

export const ErrorBoundary = GeneralErrorBoundary

