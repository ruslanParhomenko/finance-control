import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { bankCategories } from "../model/constants";
import { GetBankDataType } from "../model/type";
import { Currency } from "@/type/currency-data";

export default function BankViewTable({
  bankData,
  currency,
}: {
  bankData: GetBankDataType | null;
  currency: string;
}) {
  const totals = bankData?.dataBank?.totals || "0";
  const selectedCurrency = bankData?.dataCurrency?.[currency as Currency] || 1;
  return (
    <Table className="w-full md:w-100">
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
                <div className="flex h-6 w-26 items-center justify-center text-xs md:w-60">
                  {value === "0" ? "." : value}
                </div>
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
              {(Number(totals) / Number(selectedCurrency)).toFixed(0)}
            </div>
          </TableCell>
          <TableCell className="w-12 px-4">{currency}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
