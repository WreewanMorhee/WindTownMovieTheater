import { json, LoaderFunctionArgs } from "@remix-run/node";
import {
  useLoaderData,
  useParams,
} from "@remix-run/react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { search_by_keyword } from "~/api/search-by-keyword";
import GeneralErrorBoundary from "~/components/GeneralErrorLayout";
import { general_meta } from "~/components/GeneralMeta";
import VideoCard from "~/components/VideoCard";
import { api_key } from "~/config/api";
import { useTea } from "~/drinktea/tea";
import { useRecordScrollPosition } from "~/hooks/useRecordScrollPosition";
import { cate_keyword_meta } from "~/meta/cate-keyword-meta";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  console.time('keyword')

  const { cate = "", keyword = '' } = params;

  const data = await search_by_keyword(
    `https://api.themoviedb.org/3/search/${
      cate.split("-")[1]
    }?api_key=${api_key}&query=${keyword}`
  );

  const url = new URL(request.url);
  const origin = url.origin;

  const meta = cate_keyword_meta({
    params: { cate, keyword },
    data: { data, origin },
  });

  console.timeEnd('keyword')
  return json({ data, origin, meta });
  
};

export default function Index() {
  const { data } = useLoaderData<typeof loader>();
  const { results: videos } = data;
  const { cate, keyword } = useParams();
  const data_key = `${cate}-${keyword}`;

  const { ref, inView } = useInView();
  const [page, set_page] = useTea.search_list_page_data[data_key](data.page);
  const [data_by_key, set_list_by_key] = useTea.search_list_data[data_key]([]);
  const list = data_by_key || [];
  const still_has_next = page < data.total_pages;

  const get_next_page = async () => {
    const r = await search_by_keyword(
      `https://api.themoviedb.org/3/search/${
        cate?.split("-")[1]
      }?api_key=${api_key}&query=${keyword}&page=${page + 1}`
    );

    set_page(r.page);
    set_list_by_key((prev) => [...(prev || []), ...r.results]);
  };
  useEffect(() => {
    if (inView && still_has_next) {
      get_next_page();
    }
  }, [inView]);

  const scrollRef = useRecordScrollPosition();

  return (
    <>
      <div
        ref={scrollRef}
        id="list-container"
        key={`${cate}-${keyword}`}
        className="container mx-auto fone:overflow-scroll fone:h-[calc(100svh-130px)] desk:h-auto p-[--page-margin] pt-[--to-top] pb-[120px]"
      >
        <div className="grid grid-cols-1 fone:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[--general-gap]">
          {[...videos, ...list].map((video) => (
            <VideoCard
              media_type={cate?.split("-")[1]}
              key={video?.id}
              {...video}
            />
          ))}
        </div>

        {still_has_next ? (
          <div
            ref={ref}
            className="mt-[24px] flex items-center justify-center w-full text-white"
          >
            <div className="animate-[loading2_0.8s_linear_normal_infinite]  w-[80px] h-[80px] bg-center bg-no-repeat bg-cover bg-[url(/assets/reel.webp)]"></div>
          </div>
        ) : (
          <div className="mt-[24px] flex items-center justify-center w-full text-white">
            {!!videos.length ? (
              <div className="text-center flex items-center justify-center flex-col fone:text-[20px] desk:text-[24px] tracking-[1px]">
                <div className="w-[160px] h-[160px] bg-cetner bg-no-repeat bg-contain bg-[url(/assets/loaded.webp)]" />
                試試其他關鍵字搜尋 <br /> 探索更多影片吧！
              </div>
            ) : (
              <div className="flex items-center justify-center flex-col fone:text-[20px] desk:text-[24px] tracking-[1px]">
                <div className="w-[320px] h-[320px] bg-cetner bg-no-repeat bg-contain bg-[url(/assets/empty.webp)]" />
                找不到東西呢 ... 😭😭
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export const ErrorBoundary = GeneralErrorBoundary

export const meta = general_meta

