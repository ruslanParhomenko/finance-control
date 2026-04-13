"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import LogOutButton from "../button/logout-button";
import { useHashParam } from "@/hooks/use-hash";

import SelectOptions from "../select/select-options";
import { CURRENCY, MONTHS, YEAR } from "@/utils/get-month-days";
import { cn } from "@/lib/utils";
import TabsOptions from "../tabs/tabs-options";
import { NAV_ITEMS, WITH_MONTH } from "./constants";
import ThemesButton from "../button/themes-button";

export default function NavMenuHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const patchName = pathname?.split("/").pop();

  const STORAGE_KEY = `nav-tab-${patchName}`;
  const navItems = NAV_ITEMS;

  const [_value, setHash] = useHashParam("tab");

  const [isPending, startTransition] = useTransition();

  const [tab, setTab] = useState(navItems[0].value);

  const [month, setMonth] = useState((new Date().getMonth() + 1).toString());
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [currency, setCurrency] = useState("MDL");

  useEffect(() => {
    if (!patchName) return;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setTab(stored);
      setHash(stored);
    } else {
      setHash(navItems[0].value);
    }
  }, [STORAGE_KEY, patchName, setHash]);

  useEffect(() => {
    if (!patchName) return;

    const url = `/${patchName}?month=${month}&year=${year}&currency=${currency}`;

    startTransition(() => {
      router.replace(url);
    });
  }, [month, year, currency, router, patchName, startTransition]);

  const handleTabChange = (value: string) => {
    setTab(value);
    localStorage.setItem(STORAGE_KEY, value);
    setHash(value);
  };

  const selectClassName = "w-12 h-6! px-1 md:w-18 rounded-md text-xs bg-border";

  return (
    <div className="flex h-screen flex-col justify-between">
      <div className="bg-background sticky top-1 z-20 my-1 flex justify-between px-4 md:gap-4">
        <div className="order-1 flex gap-4 md:order-0">
          {WITH_MONTH.includes(tab) && (
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
        </div>
        <div className="flex gap-6">
          <ThemesButton />
          <LogOutButton />
        </div>
      </div>

      <div className="flex-1">{children}</div>

      <div className="bg-background sticky bottom-2 z-20 flex items-center justify-between gap-2 px-4 pb-1 md:my-1 md:justify-start md:gap-4">
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

        <button
          form={tab}
          type="submit"
          className="flex h-7 w-14 items-center justify-center rounded-md bg-gray-800"
        >
          <span className="text-xs text-white">save</span>
        </button>

        {navItems.length > 0 && (
          <TabsOptions
            value={tab}
            setValue={handleTabChange}
            isPending={isPending}
            options={navItems}
          />
        )}
      </div>
    </div>
  );
}
