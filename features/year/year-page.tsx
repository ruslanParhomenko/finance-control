import { GetExpenseDataType } from "@/app/action/month-data-actions";
import { Table } from "@/components/ui/table";
import YearHeaderTable from "./year-header-table";
import YearBodyTable from "./year-body-table";

export default function YearPage({
  data,
  year,
}: {
  data: GetExpenseDataType[];
  year: string;
}) {
  return (
    <Table>
      <YearHeaderTable year={year} />
      <YearBodyTable data={data} />
    </Table>
  );
}
