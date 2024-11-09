import NodeCache from "node-cache";
import { cached_time } from "./config/cache-time";


export const app_cache = new NodeCache({
    stdTTL: cached_time,
    checkperiod: cached_time,
});