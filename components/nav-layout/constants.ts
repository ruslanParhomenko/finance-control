import { CHART_MAIN_ROUTE, HOME_MAIN_ROUTE } from "@/constants/route-tag";

export const TABS_BY_ROUTE = {
  [HOME_MAIN_ROUTE]: ["bank", "year", "month"],
  [CHART_MAIN_ROUTE]: ["bank", "expenses", "month", "totals"],
};

export const ACTION_BY_ROUTE = {
  [HOME_MAIN_ROUTE]: ["edit", "chart"],
  [CHART_MAIN_ROUTE]: ["exit"],
};

export const NAV_BY_PATCH = {
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
