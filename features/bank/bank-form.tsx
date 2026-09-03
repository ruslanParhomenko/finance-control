import NumericInput from "@/components/input/numeric-input";
import { bankCategories } from "./constants";
import { InitialStateFormType } from "../initial-state/schema";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { GetBankDataType } from "@/app/action/bank-data-actions";
import { PenBox } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { GetInitialStateType } from "@/app/action/initial-state-actions";

export default function BankForm({
  bankData,
  initialState,
  totals,
  selectedCurrency,
  currency,
  isEdit = false,
}: {
  bankData: GetBankDataType | undefined;
  initialState: GetInitialStateType | null;
  totals: number;
  selectedCurrency: number;
  currency: string;
  isEdit?: boolean;
}) {
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const patchName = pathname?.split("/").pop();

  const STORAGE_KEY = `nav-tab-${patchName}`;

  const handleTabChange = (value: string) => {
    localStorage.setItem(STORAGE_KEY, value);

    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);

    window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
  };
  return (
    <Table className="w-full">
      <TableBody>
        <TableRow>
          <TableCell className="w-4">
            {isEdit && (
              <PenBox
                size={16}
                className="text-bl"
                strokeWidth={1.5}
                onClick={() => {
                  if (isEdit) {
                    handleTabChange("initial-state");
                  }
                }}
              />
            )}
          </TableCell>
          <TableCell className="w-22" />
          <TableCell className="w-26 md:w-60">
            <div className="flex items-center justify-center">
              {initialState?.initialState?.MDL?.toFixed(0) || 0}
            </div>
          </TableCell>
          <TableCell className="w-12 px-4">MDL</TableCell>
        </TableRow>
        {bankCategories.map((bank, index) => {
          const value = bankData?.dataBank?.bank?.[bank.name]?.value || "0";
          return (
            <TableRow
              key={bank.name + index}
              className="[&>td]:py-1 [&>td]:md:py-2"
            >
              <TableCell className="w-4 border-r">{index + 1}</TableCell>
              <TableCell className="w-22 px-4">
                {bank.label.toLowerCase()}
              </TableCell>
              <TableCell className="text-center">
                {isEdit && (
                  <NumericInput
                    fieldName={`bank[${bank.name}].value`}
                    className={cn(
                      "text-md h-7 w-26 border-red-600 font-bold text-red-600 md:w-60",
                    )}
                    disabled={!isEdit}
                  />
                )}
                {!isEdit && (
                  <div className="flex h-7 w-26 items-center justify-center md:w-60">
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
  );
}
