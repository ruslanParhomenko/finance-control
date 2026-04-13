import NumericInput from "@/components/input/numeric-input";
import { bankCategories } from "./constants";
import { InitialStateFormType } from "../initial-state/schema";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { PenBox, PenOff } from "lucide-react";

export default function BankForm({
  initialState,
  totals,
  selectedCurrency,
  currency,
  year,
}: {
  initialState: InitialStateFormType;
  totals: number;
  selectedCurrency: number;
  currency: string;
  year: string;
}) {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="md:w-1/3">
      <Table className="w-full">
        <TableBody>
          <TableRow>
            <TableCell>
              {isEdit ? (
                <PenOff
                  className="h-4 w-4 cursor-pointer text-gray-400"
                  onClick={() => setIsEdit(false)}
                />
              ) : (
                <PenBox
                  className="h-4 w-4 cursor-pointer text-blue-700"
                  onClick={() => setIsEdit(true)}
                />
              )}
            </TableCell>
            <TableCell className="px-4">initial balance</TableCell>
            <TableCell className="w-26">{initialState.initialState}</TableCell>
            <TableCell className="px-4">{initialState.currency}</TableCell>
          </TableRow>
          {bankCategories.map((bank, index) => (
            <TableRow
              key={bank.name + index}
              className="[&>td]:py-1.25 [&>td]:md:py-2"
            >
              <TableCell className="w-10 border-r">{index + 1}</TableCell>
              <TableCell className="px-4">{bank.label.toLowerCase()}</TableCell>
              <TableCell>
                <NumericInput
                  fieldName={`bank[${bank.name}].value`}
                  className="text-md h-6 w-26 bg-blue-600 font-bold text-green-700 shadow-none"
                  disabled={!isEdit}
                />
              </TableCell>
              <TableCell className="px-4">{bank.currency}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={2} />

            <TableCell className="text-center font-bold">
              {(Number(totals.toFixed(0)) / Number(selectedCurrency)).toFixed(
                0,
              )}
            </TableCell>
            <TableCell className="px-4">{currency}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
