import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsLine({
  options,
  value,
  onChange,
  className,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <Tabs defaultValue="overview" value={value} onValueChange={onChange}>
        <TabsList variant="line">
          {options.map((option, index) => (
            <TabsTrigger
              key={`${option}-${index}`}
              value={option}
              className="tracking-wide"
            >
              {option}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
