"use client";

import { useEffect, useLayoutEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import SelectTabsByPatch from "./select-patch";
import SelectByMonthYear from "./select-month-year";
import LogOutButton from "../button/logout-button";
import SelectCurrency from "./select-currency";

const navItems = [
  { title: "month", href: "month" },
  { title: "year", href: "year" },
  { title: "bank", href: "bank" },
];

export type PageNavType = {
  title: string;
  href: string;
};

export default function NavMenuHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [patch, setPatch] = useState("month");
  const [month, setMonth] = useState((new Date().getMonth() + 1).toString());
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [currency, setCurrency] = useState("MDL");

  useLayoutEffect(() => {
    const url = `/${patch}?month=${month}&year=${year}&currency=${currency}`;

    startTransition(() => {
      router.push(url);
    });
  }, [patch, month, year, currency, router]);

  return (
    <div className="flex h-screen flex-col justify-between">
      <div className="bg-background sticky top-0 z-20 my-1 flex justify-between gap-1.5 px-2 md:justify-start md:gap-4">
        <LogOutButton />
        <SelectByMonthYear
          month={month}
          year={year}
          setMonth={setMonth}
          setYear={setYear}
          isLoading={isPending}
        />
      </div>
      {children}
      <div className="bg-background sticky bottom-0 z-20 my-1 flex justify-between gap-1.5 px-2 md:justify-start md:gap-4">
        {navItems.length > 0 && (
          <SelectTabsByPatch
            patch={patch}
            setPatch={setPatch}
            isPending={isPending}
            navItems={navItems}
          />
        )}
        <SelectCurrency
          currency={currency}
          setCurrency={setCurrency}
          isLoading={isPending}
        />
      </div>
    </div>
  );
}
