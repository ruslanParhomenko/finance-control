import NumericInput from "@/components/input/numeric-input";
import { bankCategories } from "./constants";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { GetBankDataType } from "@/app/action/bank-data-actions";

import { GetInitialStateType } from "@/app/action/initial-state-actions";

export default function BankForm({
  bankData,
  totals,
  selectedCurrency,
  currency,
  mode = "view",
}: {
  bankData: GetBankDataType | undefined;
  totals: number;
  selectedCurrency: number;
  currency: string;
  mode?: "view" | "edit";
}) {
  return (
    <Table className="mt-2 w-full">
      <TableBody>
        {bankCategories.map((bank, index) => {
          const value = bankData?.dataBank?.bank?.[bank.name]?.value || "0";
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
                {mode === "edit" && (
                  <NumericInput
                    fieldName={`bank[${bank.name}].value`}
                    className={cn(
                      "text-md h-6 w-26 border-red-600 text-xs font-bold text-red-600 md:w-60",
                    )}
                  />
                )}
                {mode === "view" && (
                  <div className="flex h-6 w-26 items-center justify-center text-xs md:w-60">
                    {value}
                  </div>
                )}
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
