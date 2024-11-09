import Collect from "~/components/Collect";
import DonutChart from "~/components/Donut";
import { Link, useLocation } from "@remix-run/react";
import LazyBGImage from "./LazyBGImage";
import LazyImage from "./LazyImage";
import { useState } from "react";
import DetailPageSkeleton from "./DetailPageSkeleton";

const VideoCard = ({ ...video }) => {
  const { pathname } = useLocation();
  const is_in_member = pathname.includes("member");

  const [show_optimistic, set_show_optimistic] = useState(false)
  return (
    <>
    <div  className="video-card relative shadow-md rounded-[--rounded] overflow-hidden pb-[150%]">
      <Link
        onClick={() => set_show_optimistic(true)}
        className="absolute inset-0"
        to={`/${video.media_type}/${video.id}`}
      >
        {is_in_member ? (
          <LazyBGImage
            src={
              !!video.poster_path
                ? `https://image.tmdb.org/t/p/w300${video.poster_path}`
                : "/assets/no-poster.webp"
            }
            index={`${video.media_type}-${video.id}`}
            className="rounded-[--rounded]"
          />
        ) : (
          <LazyImage
            src={
              !!video.poster_path
                ? `https://image.tmdb.org/t/p/w300${video.poster_path}`
                : "/assets/no-poster.webp"
            }
            index={`${video.media_type}-${video.id}`}
            alt={video.title}
            className="w-full h-full object-cover"
          />
        )}

        <div className="absolute inset-x-0 bottom-0 gradient p-[--comp-padding]">
          <DonutChart value={Number(video.vote_average)} />
          <h2 className="mt-[6px] text-[100%] leading-[1.3] font-semibold text-white text-ell">
            {video.title || video.name}
          </h2>
          <p className="text-[80%] text-gray-600 text-white">
            發佈日期: {video.release_date || video.first_air_date}
          </p>
        </div>
      </Link>

      <Collect
        video_data={{
          adult: video.adult,
          id: video.id,
          title: video.title || video.original_name,
          overview: video.overview,
          popularity: video.popularity,
          release_date: video.release_date || video.first_air_date,
          vote_average: video.vote_average,
          vote_count: video.vote_count,
          poster_path: video.poster_path,
          media_type: video.media_type,
        }}
      />
    </div>


    {show_optimistic && (
      <DetailPageSkeleton />
    )}
    </>
  );
};

export default VideoCard;
