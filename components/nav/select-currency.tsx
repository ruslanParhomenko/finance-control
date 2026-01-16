import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CURRENCY } from "@/utils/get-month-days";

export default function SelectCurrency({
  currency,
  setCurrency,
  isLoading,
}: {
  currency: string;
  setCurrency: (value: string) => void;
  isLoading?: boolean;
}) {
  const classNameSelect = `md:w-24  w-14 h-7! border-0 md:border p-1 rounded-md  md:text-md text-xs  [&>svg]:hidden justify-center`;
  return (
    <div className="flex justify-center items-center md:gap-4 gap-3 order-2">
      <Select
        value={currency}
        onValueChange={(value) => setCurrency(value)}
        disabled={isLoading}
      >
        <SelectTrigger className={classNameSelect}>
          <SelectValue placeholder="currency" />
        </SelectTrigger>
        <SelectContent>
          {CURRENCY.map((currency) => (
            <SelectItem key={currency} value={currency}>
              {currency}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
