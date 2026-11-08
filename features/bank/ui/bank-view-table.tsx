import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { bankCategories } from "../model/constants";
import { GetBankDataType } from "../model/type";
import { Currency } from "@/type/currency-data";
import { Card } from "@/components/ui/card";

export function BankViewTable({
  bankData,
  currency,
}: {
  bankData: GetBankDataType | null;
  currency: string;
}) {
  const totals = bankData?.dataBank?.totals || "0";
  const selectedCurrency = bankData?.dataCurrency?.[currency as Currency] || 1;
  return (
    <Card className="m-3 p-3">
      <Table className="w-full md:w-100">
        <TableBody>
          {bankCategories.map((bank, index) => {
            const value = bankData?.dataBank?.bank?.[bank.name]?.value || "0";
            return (
              <TableRow
                key={bank.name + index}
                className="[&>td]:border-0 [&>td]:py-0"
              >
                <TableCell className="w-8 border-r text-right text-xs">
                  {index + 1}
                </TableCell>
                <TableCell className="w-30 px-4 text-center text-xs">
                  {bank.label.toLowerCase()}
                </TableCell>
                <TableCell className="w-30 text-center">
                  <div className="flex h-7.5 w-26 items-center justify-center text-xs md:h-10 md:w-60">
                    {value === "0" ? "." : value}
                  </div>
                </TableCell>
                <TableCell className="w-30 px-4 text-center text-xs">
                  {bank.currency}
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell colSpan={2} />

            <TableCell>
              <div className="flex w-26 items-center justify-center font-bold">
                {(Number(totals) / Number(selectedCurrency)).toFixed(0)}
              </div>
            </TableCell>
            <TableCell className="w-12 px-4">{currency}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
}
