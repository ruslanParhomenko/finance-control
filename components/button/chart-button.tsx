"use client";
import { cn } from "@/lib/utils";
import { ParamsValue } from "@/type/params-value";
import { ChartBarIcon, LogOut, PenBox, Table2Icon } from "lucide-react";

export default function ViewModeButton({
  className,
  disabled = false,
  viewMode,
  setViewMode,
  size = 18,
}: {
  className?: string;
  disabled?: boolean;
  viewMode: ParamsValue["viewMode"];
  setViewMode: (value: ParamsValue["viewMode"]) => void;
  size?: number;
}) {
  return (
    <button
      type="button"
      onClick={() => setViewMode(viewMode === "table" ? "chart" : "table")}
      className={cn(
        className,
        "cursor-pointer px-1.5 py-1 hover:opacity-40",
        disabled && "opacity-50",
      )}
      disabled={disabled}
    >
      {viewMode === "chart" ? (
        <Table2Icon size={size} className="text-red-600" strokeWidth={1.5} />
      ) : (
        <ChartBarIcon size={size} className="text-blue-600" strokeWidth={1.5} />
      )}
    </button>
  );
}
