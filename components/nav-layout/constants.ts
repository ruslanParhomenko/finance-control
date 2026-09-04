import {
  BANK_MAIN_ROUTE,
  CHART_MAIN_ROUTE,
  HOME_MAIN_ROUTE,
  INIT_BALANCE_MAIN_ROUTE,
  MONTH_MAIN_ROUTE,
} from "@/constants/route-tag";

export const TABS_BY_ROUTE = {
  [HOME_MAIN_ROUTE]: ["bank", "year", "month"],
  [CHART_MAIN_ROUTE]: ["bank", "expenses", "month"],
};

export const ACTION_BY_ROUTE = {
  [HOME_MAIN_ROUTE]: ["edit", "chart"],
  [CHART_MAIN_ROUTE]: ["exit"],
};

export const NAV_BY_TAB = {
  [HOME_MAIN_ROUTE]: {
    tabs: TABS_BY_ROUTE[HOME_MAIN_ROUTE],
    action: ACTION_BY_ROUTE[HOME_MAIN_ROUTE],
    selectMonth: ["bank", "month"],
  },
  [CHART_MAIN_ROUTE]: {
    tabs: TABS_BY_ROUTE[CHART_MAIN_ROUTE],
    action: ACTION_BY_ROUTE[CHART_MAIN_ROUTE],
    selectMonth: ["bank"],
  },
};

export const NAV_BY_PATCH = ["init-bal", "bank", "year", "month", "chart"];

export const ACTION_BUTTONS_BY_PATCH = {
  [MONTH_MAIN_ROUTE]: ["edit"],
  [BANK_MAIN_ROUTE]: ["edit"],
  [INIT_BALANCE_MAIN_ROUTE]: ["edit"],
};
