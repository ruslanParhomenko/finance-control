import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Options } from "@/type/options";
import { SelectViewport } from "@radix-ui/react-select";

type Mode = "default" | "grid";

export default function SelectOptions({
  options,
  value,
  onChange,
  isLoading = false,
  className,
  placeHolder,
  mode = "default",
}: {
  options: Options;
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
  className?: string;
  placeHolder?: string;
  mode?: Mode;
}) {
  const getGridCols = () => {
    if (options.length <= 4) return "grid grid-cols-2";
    if (options.length <= 9) return "grid grid-cols-3";

    return "grid grid-cols-4";
  };

  return (
    <Select
      value={value}
      onValueChange={(value) => onChange(value)}
      disabled={isLoading}
    >
      <SelectTrigger
        className={cn(
          "bg-background justify-center border-0 shadow-none [&>svg]:hidden",
          className,
        )}
      >
        <SelectValue placeholder={placeHolder ?? ""} />
      </SelectTrigger>
      <SelectContent className="overflow-visible p-0" position="popper">
        <SelectViewport className="overflow-visible">
          <div className={cn("", mode === "grid" && getGridCols())}>
            {options.map((item, idx) => (
              <SelectItem
                key={`${item.value}-${idx}`}
                value={item.value}
                className={cn(mode === "grid" && "justify-center text-center")}
              >
                {item.label}
              </SelectItem>
            ))}
          </div>
        </SelectViewport>
      </SelectContent>
    </Select>
  );
}
