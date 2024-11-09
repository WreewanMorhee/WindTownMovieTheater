import { app_cache } from "~/cache";
import { api_key } from "~/config/api";
import { cached_time } from "~/config/cache-time";

export const get_videos = async ({ video_id }: { video_id: string }) => {
  let video_data;

  const cached_video_data = app_cache.get(`videos-${video_id}`);

  if (!!cached_video_data) {
    video_data = { ...cached_video_data };
  } else {
    video_data = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${video_id}&videoDuration=long&part=snippet,contentDetails,statistics&key=${api_key}`
    ).then((r) => r.json());
    app_cache.set(`videos-${video_id}`, video_data, cached_time);
  }

  return video_data;
};
