import { cn } from "@/lib/utils";
import { SaveIcon } from "lucide-react";

export default function SaveButton({
  formId,
  className,
  isEdit,
  disabled = true,
  size = 18,
}: {
  formId: string | undefined;
  className?: string;
  isEdit: boolean;
  disabled?: boolean;
  size?: number;
}) {
  return (
    <button
      form={formId}
      type="submit"
      disabled={disabled}
      className={cn(
        className,
        "cursor-pointer px-1.5 py-1 hover:opacity-40",
        disabled && "opacity-50",
      )}
    >
      <SaveIcon
        size={size}
        className={cn(isEdit ? "text-green-600" : "opacity-50")}
        strokeWidth={1.5}
      />
    </button>
  );
}
