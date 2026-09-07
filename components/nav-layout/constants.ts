import {
  BANK_MAIN_ROUTE,
  CHART_MAIN_ROUTE,
  INIT_BALANCE_MAIN_ROUTE,
  MONTH_MAIN_ROUTE,
} from "@/constants/route-tag";

export const ACTION_BY_ROUTE = {
  [CHART_MAIN_ROUTE]: ["exit"],
};

export const NAV_BY_PATCH = ["init-bal", "bank", "year", "month"];

export const ACTION_BUTTONS_BY_PATCH = {
  [MONTH_MAIN_ROUTE]: ["edit"],
  [BANK_MAIN_ROUTE]: ["edit"],
  [INIT_BALANCE_MAIN_ROUTE]: ["edit"],
};
