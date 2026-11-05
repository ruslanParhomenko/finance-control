import { NextRequest } from "next/server";

const HOME_DEFAULTS = {
  currency: "EUR",
};

export function getHomeUrl(request: NextRequest, pathname?: string) {
  const url = new URL(pathname || "/month", request.url);

  console.log("pathname", pathname);

  const now = new Date();

  const month = String(now.getMonth() + 1);
  const year = String(now.getFullYear());
  const currency = HOME_DEFAULTS.currency;
  const mode = "view";

  url.searchParams.set("month", month);
  url.searchParams.set("year", year);
  url.searchParams.set("currency", currency);
  url.searchParams.set("mode", mode);
  url.searchParams.set("viewMode", "table");

  return url;
}
