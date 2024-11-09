import {
  isRouteErrorResponse,
  redirect,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { LoaderFunction, MetaFunction, json } from "@remix-run/node";
import DetailPage from "~/components/DetailPage";
import { get_detail } from "~/tool/get-detail";
import { detail_meta } from "~/meta/detail-meta";
import GeneralErrorBoundary from "~/components/GeneralErrorLayout";
import { general_meta } from "~/components/GeneralMeta";

export const loader: LoaderFunction = async ({ request, params }) => {
  console.time('ididid')

  if (!params.id || isNaN(Number(params.id))) {
    throw new Response("Not Found", { status: 404 });
  }

  const url = new URL(request.url);
  const origin = url.origin;

  const data = await get_detail(Number(params.id), "movie").then(r => r.json());

  const meta = detail_meta("movie")({...data, origin})

  console.timeEnd('ididid')

  return {...data, origin, meta}
  
};

export const meta = general_meta


export default function MovieDetail() {
  const data = useLoaderData<typeof loader>();


  return <DetailPage {...data} />;
}

export const ErrorBoundary = GeneralErrorBoundary
