"use client";
import LogOutButton from "@/components/button/logout-button";
import ThemesButton from "@/components/button/themes-button";
import SelectOptions from "@/components/select/select-options";

import { CURRENCY, MONTHS, YEAR } from "@/utils/get-month-days";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function HeaderBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const monthUrl = searchParams.get("month");
  const yearUrl = searchParams.get("year");
  const currencyUrl = searchParams.get("currency");

  const selectClassName =
    "w-12 h-6! px-1 md:w-18 rounded-md text-xs font-bold tracking-wider text-green-900 border-b shadow-none";

  const [isPending, startTransition] = useTransition();

  const handleMonthChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("month", value);

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  const handleYearChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("year", value);

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  const handleCurrencyChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("currency", value);

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };
  return (
    <div className="bg-background sticky top-0 z-20 my-1 flex justify-between px-4 md:gap-4">
      <div className="order-1 flex gap-4 md:order-0">
        <SelectOptions
          options={MONTHS.map((month, index) => ({
            value: month,
            label: String(index + 1),
          }))}
          value={monthUrl!}
          onChange={handleMonthChange}
          className={selectClassName}
          isLoading={isPending}
        />

        <SelectOptions
          options={YEAR.map((year) => ({ value: year, label: year }))}
          value={yearUrl!}
          onChange={handleYearChange}
          className={selectClassName}
          isLoading={isPending}
        />
        <SelectOptions
          options={CURRENCY.map((currency) => ({
            value: currency,
            label: currency,
          }))}
          value={currencyUrl!}
          onChange={handleCurrencyChange}
          className={selectClassName}
          isLoading={isPending}
        />
      </div>
      <div className="flex gap-6">
        <ThemesButton />
        <LogOutButton />
      </div>
    </div>
  );
}
