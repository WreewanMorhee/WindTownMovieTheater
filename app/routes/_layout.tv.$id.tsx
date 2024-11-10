import {
  useLoaderData,
} from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
import DetailPage from "~/components/DetailPage";
import { get_detail } from "~/tool/get-detail";
import { detail_meta } from "~/meta/detail-meta";
import GeneralErrorBoundary from "~/components/GeneralErrorLayout";


export const loader: LoaderFunction = async ({ request, params }) => {
  if (!params.id || isNaN(Number(params.id))) {
    throw new Response("Not Found", { status: 404 });
  }

  const url = new URL(request.url);
  const origin = url.origin;

  const data = await get_detail(Number(params.id), "tv").then((r) => r.json());

  if (data.movie.status_code === 34) {
    throw new Response("Not Found", { status: 404 });
  }

  const meta = detail_meta("tv")({...data, origin})

  return { ...data, origin, meta };
};

export const meta = ({ data }: { data?: { meta?: string[] } }) => {
  return data?.meta ?? [];
};

export default function MovieDetail() {
  const data = useLoaderData<typeof loader>();

  return <DetailPage {...data} />;
}

export const ErrorBoundary = GeneralErrorBoundary;
