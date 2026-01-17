import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MONTHS, YEAR } from "@/utils/get-month-days";

export default function SelectByMonthYear({
  month,
  setMonth,
  year,
  setYear,
  isLoading,
}: {
  month: string;
  setMonth: (value: string) => void;
  year: string;
  setYear: (value: string) => void;
  isLoading?: boolean;
}) {
  const classNameSelect = `md:w-24  w-14 h-7! border-0 md:border p-1 rounded-md  md:text-md text-xs  [&>svg]:hidden justify-center`;
  return (
    <div className="flex justify-center items-center md:gap-4 gap-3">
      <Select
        defaultValue={year}
        onValueChange={(value) => setYear(value)}
        disabled={isLoading}
      >
        <SelectTrigger className={classNameSelect}>
          <SelectValue placeholder="year" />
        </SelectTrigger>
        <SelectContent>
          {YEAR.map((year) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={month}
        onValueChange={(value) => setMonth(value)}
        disabled={isLoading}
      >
        <SelectTrigger className={classNameSelect}>
          <SelectValue placeholder="month" />
        </SelectTrigger>
        <SelectContent>
          {MONTHS.map((month) => (
            <SelectItem key={month} value={month}>
              {MONTHS.indexOf(month) + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
