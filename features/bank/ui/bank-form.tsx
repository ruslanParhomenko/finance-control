import NumericInput from "@/components/input/numeric-input";
import { bankCategories } from "../model/constants";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
export default function BankForm({
  totals,
  selectedCurrency,
  currency,
}: {
  totals: number;
  selectedCurrency: number;
  currency: string;
}) {
  return (
    <Table className="mt-2 w-full">
      <TableBody>
        {bankCategories.map((bank, index) => {
          return (
            <TableRow
              key={bank.name + index}
              className="[&>td]:py-1 [&>td]:md:py-2"
            >
              <TableCell className="w-4 border-r">{index + 1}</TableCell>
              <TableCell className="w-22 px-4 text-xs">
                {bank.label.toLowerCase()}
              </TableCell>
              <TableCell className="text-center">
                <NumericInput
                  fieldName={`bank[${bank.name}].value`}
                  className={cn(
                    "text-md h-6 w-26 border-red-600 text-xs font-bold text-red-600 md:w-60",
                  )}
                />
              </TableCell>
              <TableCell className="w-12 px-4 text-xs">
                {bank.currency}
              </TableCell>
            </TableRow>
          );
        })}
        <TableRow>
          <TableCell colSpan={2} />

          <TableCell>
            <div className="flex w-26 items-center justify-center font-bold">
              {(Number(totals.toFixed(0)) / Number(selectedCurrency)).toFixed(
                0,
              )}
            </div>
          </TableCell>
          <TableCell className="w-12 px-4">{currency}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
