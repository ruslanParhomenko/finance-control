import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Options } from "@/type/options";

export default function TabsOptions({
  value,
  setValue,
  isPending,
  options,
}: {
  value: string;
  setValue: (value: string) => void;
  isPending: boolean;
  options: Options;
}) {
  return (
    <Tabs value={value} onValueChange={setValue}>
      <TabsList className="flex h-8 md:gap-2">
        {options.map((item, idx) => (
          <TabsTrigger
            key={`${item.value}-${idx}`}
            value={item.value}
            disabled={isPending}
            className={cn(
              "hover:text-bl w-14 cursor-pointer md:w-24",
              isPending && "opacity-50",
            )}
          >
            <span className="md:text-md text-bl block w-full truncate text-xs">
              {item.label}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
