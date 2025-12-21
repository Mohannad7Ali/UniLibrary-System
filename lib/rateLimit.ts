import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis";
import c from "@/lib/config";
import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
} from "next/server";
export const redis = new Redis({
  url: c.env.upstash.radisUrl,
  token: c.env.upstash.radisToken,
});
// Create a new ratelimiter, that allows 10 requests per 10 seconds
export const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(10, "1 m"),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
  prefix: "@upstash/ratelimit",
});
export default async function middleware(
  request: NextRequest,
  context: NextFetchEvent
): Promise<Response | undefined> {
  // Try to get the IP address from the x-forwarded-for header or fallback to localhost
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "127.0.0.1";

  const { success, pending, limit, remaining } = await ratelimit.limit(ip);
  // we use context.waitUntil since analytics: true.
  // see https://upstash.com/docs/oss/sdks/ts/ratelimit/gettingstarted#serverless-environments
  context.waitUntil(pending);

  const res = success
    ? NextResponse.next()
    : NextResponse.redirect(new URL("/api/blocked", request.url));

  res.headers.set("X-RateLimit-Success", success.toString());
  res.headers.set("X-RateLimit-Limit", limit.toString());
  res.headers.set("X-RateLimit-Remaining", remaining.toString());

  return res;
}

export const config = {
  matcher: "/api",
};
