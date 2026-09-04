import { NextRequest } from "next/server";

const HOME_DEFAULTS = {
  currency: "EUR",
};

export function getHomeUrl(request: NextRequest, pathname?: string) {
  const url = new URL(pathname || "/month", request.url);

  const now = new Date();

  url.searchParams.set(
    "month",
    request.nextUrl.searchParams.get("month") ?? String(now.getMonth() + 1),
  );

  url.searchParams.set(
    "year",
    request.nextUrl.searchParams.get("year") ?? String(now.getFullYear()),
  );

  url.searchParams.set(
    "currency",
    request.nextUrl.searchParams.get("currency") ?? HOME_DEFAULTS.currency,
  );

  url.searchParams.set(
    "mode",
    request.nextUrl.searchParams.get("mode") ?? "view",
  );

  return url;
}
