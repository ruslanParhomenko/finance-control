import { NextRequest } from "next/server";

const HOME_DEFAULTS = {
  currency: "EUR",
};

export function getHomeUrl(
  request: NextRequest,
  pathname?: string,
  defaultTab = "month",
) {
  const url = new URL(pathname || "/home", request.url);

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
    "tab",
    request.nextUrl.searchParams.get("tab") ?? defaultTab,
  );

  return url;
}
