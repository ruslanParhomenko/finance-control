"use client";

import { useEffect, useLayoutEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import SelectTabsByPatch from "./select-patch";
import SelectByMonthYear from "./select-month-year";
import LogOutButton from "../button/logout-button";

const navItems = [
  { title: "month", href: "month" },
  { title: "year", href: "year" },
];

export type PageNavType = {
  title: string;
  href: string;
};

export default function NavMenuHeader() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [patch, setPatch] = useState("month");
  const [month, setMonth] = useState((new Date().getMonth() + 1).toString());
  const [year, setYear] = useState(new Date().getFullYear().toString());

  useLayoutEffect(() => {
    const url = `/${patch}?month=${month}&year=${year}`;

    startTransition(() => {
      router.push(url);
    });
  }, [patch, month, year, router]);

  return (
    <div className="mb-1 md:mb-3 sticky top-0 bg-background z-10 flex justify-between md:justify-start md:gap-4 gap-1.5">
      <LogOutButton />
      {navItems.length > 0 && (
        <SelectTabsByPatch
          patch={patch}
          setPatch={setPatch}
          isPending={isPending}
          navItems={navItems}
        />
      )}

      <SelectByMonthYear
        month={month}
        year={year}
        setMonth={setMonth}
        setYear={setYear}
        isLoading={isPending}
      />
    </div>
  );
}
