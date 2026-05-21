import NumericInput from "@/components/input/numeric-input";
import { bankCategories } from "./constants";
import { InitialStateFormType } from "../initial-state/schema";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { GetBankDataType } from "@/app/action/bank-data-actions";

export default function BankForm({
  bankData,
  initialState,
  totals,
  selectedCurrency,
  currency,
  isEdit = false,
}: {
  bankData: GetBankDataType | undefined;
  initialState: InitialStateFormType;
  totals: number;
  selectedCurrency: number;
  currency: string;
  isEdit?: boolean;
}) {
  return (
    <div className="w-full px-2 md:w-1/3">
      <Table className="w-full">
        <TableBody>
          <TableRow>
            <TableCell className="w-4" />
            <TableCell className="w-22" />
            <TableCell className="w-26">
              <div className="flex items-center justify-center">
                {initialState.initialState}
              </div>
            </TableCell>
            <TableCell className="w-12 px-4">{initialState.currency}</TableCell>
          </TableRow>
          {bankCategories.map((bank, index) => {
            const value = bankData?.dataBank?.bank[bank.name].value || "0";
            return (
              <TableRow
                key={bank.name + index}
                className="[&>td]:py-1 [&>td]:md:py-2"
              >
                <TableCell className="w-4 border-r">{index + 1}</TableCell>
                <TableCell className="w-22 px-4">
                  {bank.label.toLowerCase()}
                </TableCell>
                <TableCell>
                  {isEdit && (
                    <NumericInput
                      fieldName={`bank[${bank.name}].value`}
                      className={cn(
                        "text-md h-8 w-26 border-red-600 font-bold text-red-600",
                      )}
                      disabled={!isEdit}
                    />
                  )}
                  {!isEdit && (
                    <div className="flex h-8 w-26 items-center justify-center">
                      {value}
                    </div>
                  )}
                </TableCell>
                <TableCell className="w-12 px-4">{bank.currency}</TableCell>
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
    </div>
  );
}
