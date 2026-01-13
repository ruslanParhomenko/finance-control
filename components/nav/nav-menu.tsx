"use client";

import { useState, useTransition } from "react";
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

  const [patch, setPatch] = useState("");
  const [month, setMonth] = useState((new Date().getMonth() + 1).toString());
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const navigate = (nextPatch = patch, nextMonth = month, nextYear = year) => {
    const url = `/${nextPatch}?month=${nextMonth}&year=${nextYear}`;

    startTransition(() => {
      router.push(url);
    });
  };

  return (
    <div className="md:py-2 mt-1 mb-4 sticky top-0 z-9 flex justify-between md:justify-start md:gap-4 gap-1.5">
      <LogOutButton />
      {navItems.length > 0 && (
        <SelectTabsByPatch
          patch={patch}
          setPatch={(p) => {
            setPatch(p);
            navigate(p);
          }}
          isPending={isPending}
          navItems={navItems}
        />
      )}

      <SelectByMonthYear
        month={month}
        year={year}
        setMonth={(m) => {
          setMonth(m);
          navigate(patch, m, year);
        }}
        setYear={(y) => {
          setYear(y);
          navigate(patch, month, y);
        }}
        isLoading={isPending}
      />
    </div>
  );
}
