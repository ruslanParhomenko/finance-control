import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export default function TabsOptions({
  value,
  setValue,
  isPending,
  options,
  className,
}: {
  value: string;
  setValue: (value: string) => void;
  isPending: boolean;
  options: string[];
  className?: string;
}) {
  return (
    <Tabs value={value} onValueChange={setValue}>
      <TabsList className={cn("flex h-8 bg-transparent md:gap-2", className)}>
        {options.map((item, idx) => {
          const isSelected = item === value;
          return (
            <TabsTrigger
              key={`${item}-${idx}`}
              value={item}
              disabled={isPending}
              className={cn(
                "w-16 cursor-pointer hover:text-red-600 md:w-24",
                isPending && "opacity-50",
                isSelected && "font-bold text-red-600!",
              )}
            >
              <span className="md:text-md block w-full truncate text-xs tracking-wider">
                {item}
              </span>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
