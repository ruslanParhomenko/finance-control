"use client";
import NumericInput from "@/components/input/numeric-input";
import { bankCategories } from "./constants";
import { Label } from "@/components/ui/label";
import { PenBox } from "lucide-react";
import { useRouter } from "next/navigation";
import { InitialStateFormType } from "../initial-state/schema";

export default function BankForm({
  initialState,
  totals,
  selectedCurrency,
}: {
  initialState: InitialStateFormType;
  totals: number;
  selectedCurrency: string;
}) {
  const router = useRouter();

  return (
    <div className="flex w-screen flex-col justify-start gap-4 px-2 pt-4">
      <div className="mb-4 flex justify-between px-4">
        <Label className="text-blue-700">initial balance :</Label>
        <Label className="text-blue-700">
          {initialState.initialState} {initialState.currency}
        </Label>
        <PenBox
          className="h-4 w-4 text-blue-700"
          onClick={() => router.push("/initial-state")}
        />
      </div>
      {bankCategories.map((bank, index) => (
        <div
          key={bank.name + index}
          className="flex flex-row justify-between px-2"
        >
          <Label className="w-30 px-2">{bank.label}</Label>
          <NumericInput
            fieldName={`bank[${bank.name}].value`}
            className="bg-background text-md h-6 w-30 rounded-none border-0 border-b px-2 font-bold text-green-700 shadow-none"
          />
          <Label className="w-10 px-2">{bank.currency}</Label>
        </div>
      ))}
      <div className="mt-4 flex justify-center gap-6 px-2 text-blue-700">
        <Label>totals:</Label>
        <Label>
          {(Number(totals.toFixed(0)) / Number(selectedCurrency)).toFixed(0)}
        </Label>
      </div>
    </div>
  );
}
