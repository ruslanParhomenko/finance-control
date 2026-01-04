import { Table } from "@/components/ui/table";
import MonthHeaderTable from "./month-header-table";
import { getMonthDays } from "@/utils/get-month-days";
import { FormWrapper } from "@/components/wrapper/form-wrapper";
import { useForm } from "react-hook-form";

export default function MonthPage({
  month,
  year,
}: {
  month: string;
  year: string;
}) {
  const form = useForm();
  const monthDays = getMonthDays({ month, year });
  const onSubmit = () => {};
  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      className="flex flex-col h-[90vh] w-full"
    >
      <Table>
        <MonthHeaderTable month={month} monthDays={monthDays} />
      </Table>
    </FormWrapper>
  );
}
