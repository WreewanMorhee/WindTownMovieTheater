import { json } from "@remix-run/react";
import { get_credit } from "~/api/get-credit";
import { get_images } from "~/api/get-images";
import { get_keyword_data } from "~/api/get-keyword-data";
import { get_movie_info } from "~/api/get-movie-info";
import { get_recommendations } from "~/api/get-recommendations";
import { get_watch_provider } from "~/api/get-watch-provider";


export const get_detail = async (id: number, type: string) => {

    const [movie, credits, keywordsData, watchProviders, recommendations, images] =
      await Promise.all([
        get_movie_info(type, id),
        get_credit(type, id),
        get_keyword_data(type, id),
        get_watch_provider(type, id),
        get_recommendations(type, id),
        get_images(type, id)
      ]);

    // const movie = await get_movie_info(type, id)
    // const credits = await  get_credit(type, id)
    // const keywordsData = await get_keyword_data(type, id)
    // const watchProviders = await get_watch_provider(type, id)
    // const recommendations = await get_recommendations(type, id)
    // const images = await get_images(type, id)



  
    return json({
      movie,
      cast: credits.cast,
      director: credits?.crew.filter(({job}: {job: string}) => job === "Director"),
      keywords: keywordsData.keywords || keywordsData.results || [],
      watchProviders: watchProviders.results,
      recommendations: recommendations.results,
      backdrops: images.backdrops,
      posters: images.posters
    });
}