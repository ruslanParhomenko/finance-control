"use client";
import NumericInput from "@/components/input/numeric-input";
import { bankCategories } from "./constants";
import { Label } from "@/components/ui/label";
import { PenBox } from "lucide-react";
import { useRouter } from "next/navigation";
import { InitialStateFormType } from "../initial-state/schema";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function BankForm({
  initialState,
  totals,
  selectedCurrency,
  currency,
  year,
}: {
  initialState: InitialStateFormType;
  totals: number;
  selectedCurrency: string;
  currency: string;
  year: string;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-start gap-4 px-2 pt-4 text-xs">
      <div className="mb-4 flex justify-between px-4">
        <Label className="text-blue-700">initial balance :</Label>
        <Label className="text-blue-700">
          {initialState.initialState} {initialState.currency}
        </Label>
        <PenBox
          className="h-4 w-4 text-blue-700"
          onClick={() => router.push("/initial-state?year=" + year)}
        />
      </div>
      <Table>
        <TableBody>
          {bankCategories.map((bank, index) => (
            <TableRow key={bank.name + index}>
              <TableCell className="w-28 font-semibold">
                {bank.label.toLowerCase()}
              </TableCell>
              <TableCell className="w-20 text-center text-xs">
                <NumericInput
                  fieldName={`bank[${bank.name}].value`}
                  className="bg-background text-md h-6 w-full rounded-none border-0 px-2 font-bold text-green-700 shadow-none"
                />
              </TableCell>
              <TableCell className="w-10 text-xs">{bank.currency}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell className="w-28" />
            <TableCell className="text-center font-bold">
              {(Number(totals.toFixed(0)) / Number(selectedCurrency)).toFixed(
                0,
              )}
            </TableCell>
            <TableCell className="w-10">{currency}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
