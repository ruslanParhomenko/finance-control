"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import LogOutButton from "../button/logout-button";
import { useHashParam } from "@/hooks/use-hash";
import TabsNav from "./tabs-nav";
import SelectOptions from "../select/select-options";
import { CURRENCY, MONTHS, YEAR } from "@/utils/get-month-days";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "month", value: "month" },
  { label: "year", value: "year" },
  { label: "bank", value: "bank" },
];

export default function NavMenuHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [_value, setHash] = useHashParam("tab");

  const patchName = usePathname()?.split("/").pop();
  const STORAGE_KEY = `nav-tab-${patchName}`;
  const defaultTab = localStorage.getItem(STORAGE_KEY) || navItems[0].value;

  const [isPending, startTransition] = useTransition();

  const [month, setMonth] = useState((new Date().getMonth() + 1).toString());
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [currency, setCurrency] = useState("MDL");

  useEffect(() => {
    const url = `/${patchName}?month=${month}&year=${year}&currency=${currency}`;

    startTransition(() => {
      router.replace(url);
    });
  }, [month, year, currency, router, patchName, startTransition]);

  useEffect(() => {
    setHash(defaultTab);
  }, [defaultTab, navItems, setHash]);

  const handleTabChange = (value: string) => {
    localStorage.setItem(STORAGE_KEY, value);
    setHash(value);
  };

  const selectClassName = "w-16 h-7! px-1 rounded-md text-xs";

  return (
    <div className="flex h-screen flex-col justify-between">
      <div className="bg-background sticky top-1 z-20 my-1 flex justify-between px-2 md:justify-start md:gap-4">
        <LogOutButton />
        <div className="flex gap-4">
          <SelectOptions
            options={MONTHS.map((month, index) => ({
              value: month,
              label: String(index + 1),
            }))}
            value={month}
            onChange={setMonth}
            className={selectClassName}
          />
          <SelectOptions
            options={YEAR.map((year) => ({ value: year, label: year }))}
            value={year}
            onChange={setYear}
            className={selectClassName}
          />
        </div>
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
      <div className="bg-background sticky bottom-1 z-20 flex items-center justify-between gap-2 px-2 md:my-1 md:justify-start md:gap-4">
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
          form={defaultTab}
          type="submit"
          className="flex h-8 w-16 items-center justify-center rounded-md border-0 bg-gray-800"
        >
          <span className="text-xs text-white">save</span>
        </button>
        {navItems.length > 0 && (
          <TabsNav
            value={defaultTab}
            setValue={handleTabChange}
            isPending={isPending}
            options={navItems}
          />
        )}
      </div>
    </div>
  );
}
