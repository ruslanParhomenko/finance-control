import { GetExpenseDataType } from "@/app/action/month-data-actions";
import { Table } from "@/components/ui/table";
import YearHeaderTable from "./year-header-table";
import YearBodyTable from "./year-body-table";

export default function YearPage({
  data,
  year,
  currencyRates,
  currency,
}: {
  data: GetExpenseDataType[];
  year: string;
  currencyRates: number[];
  currency: string;
}) {
  return (
    <Table className="table-fixed">
      <YearHeaderTable year={year} currency={currency} />
      <YearBodyTable
        data={data}
        currencyRates={currencyRates}
        currency={currency}
      />
    </Table>
  );
}
