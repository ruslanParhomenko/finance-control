"use client";

import { useEffect, useState, useTransition, ViewTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LogOutButton from "../button/logout-button";

import SelectOptions from "../select/select-options";
import { CURRENCY, MONTHS, YEAR } from "@/utils/get-month-days";
import { cn } from "@/lib/utils";
import TabsOptions from "../tabs/tabs-options";
import { NAV_BY_PATCH } from "./constants";
import ThemesButton from "../button/themes-button";
import { useEdit } from "@/providers/edit-provider";
import EditButton from "../button/edit-button";
import SaveButton from "../button/save-button";
import { useSwipeable } from "react-swipeable";
import ChartButton from "../button/chart-button";
import ExitButton from "../button/exit-button";

export default function NavMenuHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const mainRoute = pathname?.split("/").pop();

  const { isEdit, setIsEdit } = useEdit();

  const STORAGE_KEY = `nav-tab-${mainRoute}`;
  const navItems =
    NAV_BY_PATCH[mainRoute as keyof typeof NAV_BY_PATCH]?.tabs || [];

  const actionItems =
    NAV_BY_PATCH[mainRoute as keyof typeof NAV_BY_PATCH]?.action || [];
  const has = (key: string) => actionItems.includes(key);

  const selectMonthItems =
    NAV_BY_PATCH[mainRoute as keyof typeof NAV_BY_PATCH]?.selectMonth || [];
  const withMonth = (key: string) => selectMonthItems.includes(key);

  const searchParams = useSearchParams();
  const activeTab =
    searchParams.get("tab") || navItems[navItems.length - 1] || "";

  const formId = activeTab;

  const [isPending, startTransition] = useTransition();

  const [month, setMonth] = useState((new Date().getMonth() + 1).toString());
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [currency, setCurrency] = useState("EUR");

  useEffect(() => {
    if (!mainRoute) return;

    const stored = localStorage.getItem(STORAGE_KEY);
    const params = new URLSearchParams(searchParams.toString());
    if (stored) {
      params.set("tab", stored);
    } else {
      localStorage.setItem(STORAGE_KEY, activeTab);
      params.set("tab", activeTab);
    }
    window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
  }, [STORAGE_KEY, mainRoute]);

  useEffect(() => {
    if (!mainRoute) return;

    const url = `/${mainRoute}?month=${month}&year=${year}&currency=${currency}&tab=${activeTab}`;

    startTransition(() => {
      router.replace(url);
    });
  }, [month, year, currency, router, mainRoute, startTransition, activeTab]);

  const handleTabChange = (value: string) => {
    localStorage.setItem(STORAGE_KEY, value);

    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);

    startTransition(() => {
      window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
    });
  };

  const handlers = useSwipeable({
    delta: 300,
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    onSwipedUp: () => {
      if (!activeTab) return;
      const currentIndex = navItems.indexOf(activeTab ?? "");
      const nextIndex = (currentIndex + 1) % navItems.length;
      const nextTab = navItems[nextIndex];
      handleTabChange(nextTab);
    },
    onSwipedDown: () => {
      if (!activeTab) return;
      const currentIndex = navItems.indexOf(activeTab ?? "");
      const prevIndex = (currentIndex - 1 + navItems.length) % navItems.length;
      const prevTab = navItems[prevIndex];
      handleTabChange(prevTab);
    },
  });

  const selectClassName = "w-12 h-6! px-1 md:w-18 rounded-md text-xs bg-border";
  const iconCn = "bg-border rounded-md border px-3 py-1 cursor-pointer";
  return (
    <div className="flex h-dvh flex-col justify-between">
      <div className="bg-background sticky top-0 z-20 my-1 flex justify-between px-4 md:gap-4">
        <div className="order-1 flex gap-4 md:order-0">
          {withMonth(activeTab) && (
            <SelectOptions
              options={MONTHS.map((month, index) => ({
                value: month,
                label: String(index + 1),
              }))}
              value={month}
              onChange={setMonth}
              className={selectClassName}
            />
          )}

          <SelectOptions
            options={YEAR.map((year) => ({ value: year, label: year }))}
            value={year}
            onChange={setYear}
            className={selectClassName}
          />
          <SelectOptions
            options={CURRENCY.map((currency) => ({
              value: currency,
              label: currency,
            }))}
            value={currency}
            onChange={setCurrency}
            isLoading={isPending}
            className={cn(selectClassName, "font-bold text-green-900")}
          />
        </div>
        <div className="flex gap-6">
          <ThemesButton />
          <LogOutButton />
        </div>
      </div>

      <div
        {...handlers}
        className="flex-1 md:flex md:w-full md:items-center md:justify-center"
      >
        {children}
      </div>

      <div className="bg-background sticky bottom-3 z-20 flex items-center justify-between gap-2 px-4 pb-1 md:my-1 md:justify-start md:gap-4">
        {has("chart") && <ChartButton className={iconCn} url={"/chart"} />}
        {navItems.length > 0 && (
          <TabsOptions
            value={activeTab}
            setValue={handleTabChange}
            isPending={isPending}
            options={navItems}
          />
        )}
        {has("edit") && isEdit && (
          <SaveButton
            formId={formId}
            isEdit={isEdit}
            disabled={isPending || !isEdit}
            className={iconCn}
          />
        )}
        {has("edit") && (
          <EditButton
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            className={iconCn}
          />
        )}
        {has("exit") && (
          <ExitButton className={iconCn} disabled={isPending} url={"/home"} />
        )}
      </div>
    </div>
  );
}
