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
      <TabsList className={cn("flex h-8 md:gap-2", className)}>
        {options.map((item, idx) => (
          <TabsTrigger
            key={`${item}-${idx}`}
            value={item}
            disabled={isPending}
            className={cn(
              "hover:text-bl w-16 cursor-pointer md:w-24",
              isPending && "opacity-50",
            )}
          >
            <span className="md:text-md text-bl block w-full truncate text-xs">
              {item.split("-")}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
