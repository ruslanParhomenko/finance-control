"use client";
import ChartButton from "@/components/button/chart-button";
import { useEdit } from "@/providers/edit-provider";
import { usePathname, useSearchParams } from "next/navigation";
import { NAV_BY_PATCH } from "../constants";
import { useTransition } from "react";
import TabsOptions from "@/components/tabs/tabs-options";
import SaveButton from "@/components/button/save-button";
import EditButton from "@/components/button/edit-button";
import ExitButton from "@/components/button/exit-button";

export default function FooterBar() {
  const pathname = usePathname();
  const mainRoute = pathname?.split("/").pop();

  const { isEdit, setIsEdit } = useEdit();

  const navItems =
    NAV_BY_PATCH[mainRoute as keyof typeof NAV_BY_PATCH]?.tabs || [];

  const actionItems =
    NAV_BY_PATCH[mainRoute as keyof typeof NAV_BY_PATCH]?.action || [];
  const has = (key: string) => actionItems.includes(key);

  const searchParams = useSearchParams();
  const activeTab =
    searchParams.get("tab") || navItems[navItems.length - 1] || "";

  const formId = activeTab;

  const [isPending, startTransition] = useTransition();

  const iconCn = "px-2.5 py-1 cursor-pointer text-blue-600";

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);

    startTransition(() => {
      window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
    });
  };

  const getChartUrl = (pathName: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const now = new Date();

    params.set("month", String(now.getMonth() + 1));
    params.set("year", String(now.getFullYear()));

    params.set("tab", "month");

    return `/${pathName}?${params.toString()}`;
  };

  return (
    <div className="bg-background sticky bottom-3 z-20 flex items-center justify-between gap-2 px-4 pb-1 md:my-1 md:justify-start md:gap-4">
      {has("chart") && (
        <ChartButton className={iconCn} url={getChartUrl("chart")} />
      )}
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
        <EditButton isEdit={isEdit} setIsEdit={setIsEdit} className={iconCn} />
      )}
      {has("exit") && (
        <ExitButton
          className={iconCn}
          disabled={isPending}
          url={getChartUrl("home")}
        />
      )}
    </div>
  );
}
