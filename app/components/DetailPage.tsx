import { Link, useLocation, useParams } from "@remix-run/react";
import VideoCard from "~/components/VideoCard";
import { formmater_number } from "~/tool/formatter-number";
import DonutChart from "~/components/Donut";
import Collect from "~/components/Collect";
import LazyImage from "~/components/LazyImage";
import { CastMember } from "~/interface/cast";
import { Keyword } from "~/interface/keywords";
import { CountryWatchProviders, Provider } from "~/interface/provider";
import { Poster } from "~/interface/poster";
import { Backdrop } from "~/interface/backdrops";
import { Movie } from "~/interface/movie";
import { Recommendation } from "~/interface/reco";
import { CSSProperties } from "react";
import CommentBtn from "./CommentBtn";

interface CustomCSSProperties extends CSSProperties {
  [`--dbg`]: string;
  [`--mbg`]: string;
}

const DetailPage = ({
  movie,
  cast,
  keywords,
  watchProviders,
  recommendations,
  backdrops,
  posters,
}: {
  movie: Movie;
  cast: CastMember[];
  keywords: Keyword[];
  watchProviders: CountryWatchProviders;
  recommendations: Recommendation[];
  backdrops: Backdrop[];
  posters: Poster[];
}) => {
  const { pathname } = useLocation()
  const cate = pathname.split('/')[1] as 'movie' | 'tv';

  return (
    <div
      key={movie.id}
      className="relative w-screen bg-gray-900 text-gray-300 h-[calc(100svh-var(--header-height))] overflow-hidden"
    >
      <div
        style={
          {
            "--dbg": !!movie.backdrop_path
              ? `url(https://image.tmdb.org/t/p/w300${movie.backdrop_path})`
              : "url(/assets/no-poster.webp)",
            "--mbg": !!movie.poster_path
              ? `url(https://image.tmdb.org/t/p/w300${movie.poster_path})`
              : "url(/assets/no-poster.webp)",
            filter: "blur(10px)",
          } as CustomCSSProperties
        }
        className="absolute inset-0 bg-no-repeat bg-center bg-cover fone:bg-[image:var(--mbg)] desk:bg-[image:var(--dbg)]"
     />

      <div className="absolute inset-0 bg-[#000000] opacity-60"></div>

      <div className=" relative container mx-auto fone:overflow-scroll fone:px-[--page-margin] desk:px-[0px] fone:block desk:grid grid-cols-1 md:grid-cols-3 gap-24 h-full ">
        {/* Movie Poster */}
        <div className="flex items-start justify-end col-span-1 mt-[--to-top] fone:mx-auto desk:mx-unset fone:w-[300px] fone:h-[450px] desk:w-auto desk:h-auto">
          <img
            className="rounded-[--rounded] shadow-md"
            src={
              !!movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/assets/no-poster.webp"
            }
            width={300}
            height={400}
            alt={movie.title || movie.name}
          />


        </div>

        {/* Movie Details */}
        <div className="scrollbar-hide col-span-2 fone:h-auto desk:h-full fone:overflow-hidden desk:overflow-scroll pb-[32px] pt-[--to-top]">
          <h1 className="desk:text-[48px] fone:text-[32px] font-bold text-white">
            {movie.title || movie.name}
          </h1>
          <div className="flex mt-[16px]">
            <Collect
              video_data={{
                adult: movie.adult,
                id: movie.id,
                title: movie.original_title || movie.name || "",
                overview: movie.overview || "",
                popularity: movie.popularity,
                release_date: movie.release_date || movie.first_air_date || "",
                vote_average: movie.vote_average,
                vote_count: movie.vote_count,
                poster_path: movie.poster_path || "",
                media_type: cate,
              }}
              style={{
                top: 'unset',
                right: 'unset'
              }}
              className="w-[50px] h-[50px] relative ml-[0px] mr-[16px]"
            />

            <CommentBtn />
          </div>

          <p className="text-gray-300 mt-[24px] text-[24px]">
            <span className="font-semibold text-gray-200">發佈日期:</span>{" "}
            {movie.release_date || movie.first_air_date}
          </p>
          <div className="text-gray-300 mt-[24px] text-[24px] flex items-center w-full flex-row">
            <span className="font-semibold text-gray-200 mr-[8px]">評分: </span>
            <DonutChart value={Number(movie.vote_average)} />
          </div>
          <p className="text-gray-300 mt-[24px] text-[24px]">
            <span className="font-semibold text-gray-200">原始語言:</span>{" "}
            {movie.original_language.toUpperCase()}
          </p>
          <p className="text-gray-300 mt-[24px] text-[24px]">
            <span className="font-semibold text-gray-200">預算: </span>
            {!!movie.budget
              ? `$ ${formmater_number(movie.budget.toString())}`
              : "無相關資訊"}
          </p>
          <p className="text-gray-300 mt-[24px] text-[24px]">
            <span className="font-semibold text-gray-200">收益: </span>
            {!!movie.revenue
              ? `$ ${formmater_number(movie.revenue.toString())}`
              : "無相關資訊"}
          </p>
          <p className="text-gray-300 mt-[24px] text-[24px]">
            {movie.overview}
          </p>

          {/* Cast */}
          <h2 className="text-[32px] font-bold text-white mt-[40px]">卡司群</h2>
          <div className="flex overflow-x-scroll gap-[--general-gap] mt-[16px] scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-900">
            {cast.map((actor: CastMember) => (
              <div
                key={actor.id}
                className={
                  " flex flex-col items-center flex-none w-[104px] min-w-[104px]"
                }
              >
                <LazyImage
                  className="rounded-full w-full h-[156px] object-cover shadow-md"
                  src={
                    !!actor.profile_path
                      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                      : "/assets/avatar.webp"
                  }
                  index={`cast-${actor.id}`}
                  alt={actor.name}
                  width="104"
                  height="156"
                />
                <p className="text-center text-gray-200 mt-4">{actor.name}</p>
                <p className="text-center text-sm text-gray-300">
                  {actor.character}
                </p>
              </div>
            ))}
          </div>

          {/* Keywords */}
          <h2 className="text-[32px] font-bold text-white mt-[40px]">關鍵字</h2>
          <div className="flex flex-wrap mt-[16px] gap-[--general-gap]">
            {!!keywords.length
              ? keywords.map((keyword: Keyword) => (
                  <span
                    key={keyword.id}
                    className="bg-gray-700 text-gray-300 rounded-lg fone:text-[16px] desk:text-[24px] flex"
                  >
                    <Link
                      className="fone:px-[--comp-padding] desk:px-[24px] py-[8px]"
                      to={`/search-movie/${keyword.name}`}
                    >
                      {keyword.name}
                    </Link>
                  </span>
                ))
              : "暫無相關關鍵字"}
          </div>

          {/* Where to Watch */}
          <h2 className="text-[32px] font-bold text-white mt-[40px]">去哪看</h2>

          {/* Stream Section */}
          <h3 className="text-[24px] font-bold text-gray-200 mt-[24px]">
            訂閱收看平台
          </h3>
          {watchProviders.TW && watchProviders.TW.flatrate ? (
            <div className="flex flex-wrap  mt-[16px] gap-[8px]">
              {watchProviders.TW.flatrate.map((provider: Provider) => {
                // Redirect to the TMDb watch page for the movie
                const tmdbWatchLink = `https://www.themoviedb.org/movie/${movie.id}/watch?locale=us`;

                return (
                  <a
                    key={provider.provider_id}
                    href={tmdbWatchLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg mr-[24px] flex items-center"
                  >
                    <LazyImage
                      src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                      className="mr-[8px] rounded-[10px] w-[45px] h-[45px]"
                      index={provider.provider_name}
                      width="45"
                      height="45"
                    />
                    <span>{provider.provider_name}</span>
                  </a>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-300 text-[16px]">暫時無相關管道</p>
          )}

          {/* Rent Section */}
          <h3 className="text-[24px] font-bold text-gray-200 mt-[24px]">
            租借
          </h3>
          {watchProviders.TW && watchProviders.TW.rent ? (
            <div className="flex flex-wrap  mt-[16px] gap-[8px]">
              {watchProviders.TW.rent.map((provider: Provider) => {
                // Redirect to the TMDb watch page for the movie
                const tmdbWatchLink = `https://www.themoviedb.org/movie/${movie.id}/watch?locale=us`;

                return (
                  <a
                    key={provider.provider_id}
                    href={tmdbWatchLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg mr-[24px] flex items-center"
                  >
                    <LazyImage
                      src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                      className="mr-[8px]  rounded-[10px]  w-[45px] h-[45px]"
                      width="45"
                      height="45"
                      index={provider.provider_name}
                    />
                    <span>{provider.provider_name}</span>
                  </a>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-300">暫時無相關管道</p>
          )}

          {/* Buy Section */}
          <h3 className="text-[24px] font-bold text-gray-200 mt-[24px]">
            購買
          </h3>
          {watchProviders.TW && watchProviders.TW.buy ? (
            <div className="flex flex-wrap mt-[16px] gap-[8px]">
              {watchProviders.TW.buy.map((provider: Provider) => {
                // Redirect to the TMDb watch page for the movie
                const tmdbWatchLink = `https://www.themoviedb.org/movie/${movie.id}/watch?locale=us`;

                return (
                  <a
                    key={provider.provider_id}
                    href={tmdbWatchLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg mr-[24px] flex items-center"
                  >
                    <LazyImage
                      src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                      className="mr-[8px]  rounded-[10px]  w-[45px] h-[45px]"
                      width="45"
                      height="45"
                      index={provider.provider_name}
                    />
                    <span>{provider.provider_name}</span>
                  </a>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-300 mb-12">暫時無相關管道</p>
          )}

          {/* Related Posters */}
          <h2 className="text-[32px] font-bold text-white mt-[40px]">
            相關海報
          </h2>

          <div className="flex overflow-x-auto mt-[16px] gap-[--general-gap]">
            {!!posters.length
              ? posters.slice(0, 10).map((poster: Poster, index) => {
                  const img_url = `https://image.tmdb.org/t/p/w500${poster.file_path}`;

                  return (
                    <a
                      href={img_url}
                      target="_blank"
                      key={poster.file_path}
                      className="min-w-[240px] block"
                    >
                      <LazyImage
                        className="w-[240px] h-[360px] rounded-lg flex-none w-60" // Fixed width for consistent item size
                        src={img_url}
                        alt="Poster"
                        width="240"
                        height="360"
                        index={`${pathname.split('/').join('')}-poster-${index}`}
                      />
                    </a>
                  );
                })
              : "暫無相關海報"}
          </div>

          {/* Related Backdrops */}
          <h2 className="text-[32px] font-bold text-white mt-[40px]">
            相關劇照
          </h2>
          <div className="flex overflow-x-auto mt-[16px] gap-[--general-gap]">
            {!!backdrops.length
              ? backdrops.slice(0, 10).map((backdrop: Backdrop, index) => {
                  const img_url = `https://image.tmdb.org/t/p/w500${backdrop.file_path}`;

                  return (
                    <a
                      key={backdrop.file_path}
                      href={img_url}
                      target="_blank"
                      className="min-w-[240px] block"
                    >
                      <LazyImage
                        className="w-[240px] h-[135px] rounded-lg flex-none"
                        src={img_url}
                        alt="Backdrop"
                        width="240"
                        height="135"
                        index={`${pathname.split('/').join('')}-backdrop-${index}`}
                      />
                    </a>
                  );
                })
              : "暫無相關劇照"}
          </div>

          {/* Recommendations */}
          <h2 className="text-[32px] font-bold text-white mt-[40px]">
            相關電影
          </h2>
          <div className="mt-[16px] grid grid-cols-1 fone:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-[--general-gap]">
            {!!recommendations.length
              ? recommendations.map((rec: Recommendation) => (
                  <VideoCard key={rec.id} {...rec} />
                ))
              : "暫無相關影片"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
