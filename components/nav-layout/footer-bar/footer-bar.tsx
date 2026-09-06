"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ACTION_BUTTONS_BY_PATCH, NAV_BY_PATCH } from "../constants";
import { useTransition } from "react";
import TabsOptions from "@/components/tabs/tabs-options";
import SaveButton from "@/components/button/save-button";
import EditButton from "@/components/button/edit-button";

type Mode = "edit" | "view";

export default function FooterBar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const mainRoute = pathname?.split("/").pop();
  const formId = mainRoute;

  const [isPending, startTransition] = useTransition();

  const actionItems =
    ACTION_BUTTONS_BY_PATCH[mainRoute as keyof typeof ACTION_BUTTONS_BY_PATCH];

  const has = (key: string) => actionItems?.includes(key);

  const rawMode = searchParams.get("mode");
  const mode: Mode = rawMode === "edit" ? "edit" : "view";
  const isEdit = mode === "edit";

  const setMode = (value: Mode) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("mode", value);

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("mode", "view");

    startTransition(() => {
      router.replace(`${value}?${params.toString()}`);
    });
  };

  return (
    <div className="bg-background sticky bottom-0 z-20 my-1 flex items-center justify-between px-4 md:justify-start md:gap-4">
      <div>
        <TabsOptions
          value={mainRoute || ""}
          setValue={handleTabChange}
          isPending={isPending}
          options={NAV_BY_PATCH}
        />
      </div>
      <div className="flex w-full items-center justify-end gap-6 md:justify-start">
        {has("edit") && isEdit && (
          <SaveButton
            formId={formId}
            isEdit={isEdit}
            disabled={isPending || !isEdit}
          />
        )}

        {has("edit") && (
          <EditButton
            isEdit={isEdit}
            setIsEdit={() => setMode(isEdit ? "view" : "edit")}
          />
        )}
      </div>
    </div>
  );
}
