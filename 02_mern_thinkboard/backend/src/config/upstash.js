import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";
dotenv.config();

// i want to limit the number of requests to 10 per second
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "20 s"),
  analytics: true,
});

export default ratelimit;
