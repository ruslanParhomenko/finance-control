"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LogOutButton from "../button/logout-button";

import SelectOptions from "../select/select-options";
import { CURRENCY, MONTHS, YEAR } from "@/utils/get-month-days";
import { cn } from "@/lib/utils";
import TabsOptions from "../tabs/tabs-options";
import { NAV_ITEMS, WITH_MONTH } from "./constants";
import ThemesButton from "../button/themes-button";
import { useEdit } from "@/providers/edit-provider";
import EditButton from "../button/edit-button";
import SaveButton from "../button/save-button";
import { useSwipeable } from "react-swipeable";

export default function NavMenuHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const patchName = pathname?.split("/").pop();

  const { isEdit, setIsEdit } = useEdit();

  const STORAGE_KEY = `nav-tab-${patchName}`;
  const navItems = NAV_ITEMS;

  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || navItems[0] || "";

  const formId = activeTab;

  const [isPending, startTransition] = useTransition();

  const [month, setMonth] = useState((new Date().getMonth() + 1).toString());
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [currency, setCurrency] = useState("EUR");

  useEffect(() => {
    if (!patchName) return;

    const stored = localStorage.getItem(STORAGE_KEY);
    const params = new URLSearchParams(searchParams.toString());
    if (stored) {
      params.set("tab", stored);
    } else {
      localStorage.setItem(STORAGE_KEY, activeTab);
      params.set("tab", activeTab);
    }
    window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
  }, [STORAGE_KEY, patchName]);

  useEffect(() => {
    if (!patchName) return;

    const url = `/${patchName}?month=${month}&year=${year}&currency=${currency}&tab=${activeTab}`;

    startTransition(() => {
      router.replace(url);
    });
  }, [month, year, currency, router, patchName, startTransition, activeTab]);

  const handleTabChange = (value: string) => {
    localStorage.setItem(STORAGE_KEY, value);

    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);

    window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
  };

  const handlers = useSwipeable({
    delta: 2000,
    swipeDuration: 900,
    preventScrollOnSwipe: true,
    onSwipedUp: () => {
      if (!activeTab) return;
      const currentIndex = NAV_ITEMS.indexOf(activeTab ?? "");
      const nextIndex = (currentIndex + 1) % NAV_ITEMS.length;
      const nextTab = NAV_ITEMS[nextIndex];
      handleTabChange(nextTab);
    },
    onSwipedDown: () => {
      if (!activeTab) return;
      const currentIndex = NAV_ITEMS.indexOf(activeTab ?? "");
      const prevIndex =
        (currentIndex - 1 + NAV_ITEMS.length) % NAV_ITEMS.length;
      const prevTab = NAV_ITEMS[prevIndex];
      handleTabChange(prevTab);
    },
  });

  const selectClassName = "w-12 h-7! px-1 md:w-18 rounded-md text-xs bg-border";
  const iconCn = "bg-border rounded-md border px-3 py-1 cursor-pointer";
  return (
    <div {...handlers} className="flex h-screen flex-col justify-between">
      <div className="bg-background sticky top-1 z-20 my-1 flex justify-between px-4 md:gap-4">
        <div className="order-1 flex gap-4 md:order-0">
          {WITH_MONTH.includes(activeTab) && (
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

      <div className="flex-1">{children}</div>

      <div className="bg-background sticky bottom-4 z-20 flex items-center justify-between gap-2 px-4 pb-1 md:my-1 md:justify-start md:gap-4">
        {navItems.length > 0 && (
          <TabsOptions
            value={activeTab}
            setValue={handleTabChange}
            isPending={isPending}
            options={navItems}
          />
        )}
        {isEdit && (
          <SaveButton
            formId={formId}
            isEdit={isEdit}
            disabled={isPending || !isEdit}
            className={iconCn}
          />
        )}
        <EditButton isEdit={isEdit} setIsEdit={setIsEdit} className={iconCn} />
      </div>
    </div>
  );
}
