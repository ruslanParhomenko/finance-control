import { cn } from "@/lib/utils";
import { LogOut, PenBox } from "lucide-react";

export default function EditButton({
  className,
  disabled = false,
  isEdit,
  setIsEdit,
  size = 18,
}: {
  className?: string;
  disabled?: boolean;
  isEdit: boolean;
  setIsEdit: (isEdit: boolean) => void;
  size?: number;
}) {
  return (
    <button
      type="button"
      onClick={() => setIsEdit(!isEdit)}
      className={cn(
        className,
        "cursor-pointer px-1.5 py-1 hover:opacity-40",
        disabled && "opacity-50",
      )}
      disabled={disabled}
    >
      {isEdit ? (
        <LogOut size={size} className="text-red-600" strokeWidth={1.5} />
      ) : (
        <PenBox size={size} className="text-blue-600" strokeWidth={1.5} />
      )}
    </button>
  );
}
