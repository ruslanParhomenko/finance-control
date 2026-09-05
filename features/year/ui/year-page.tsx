import { Table } from "@/components/ui/table";
import { ParamsValue } from "@/type/params-value";
import { MONTHS } from "@/utils/get-month-days";
import YearHeaderTable from "./year-header-table";
import YearFooterTable from "./year-footer-table";
import { GetExpenseDataType } from "@/features/month/actions/get-expense";
import YearBodyTable from "./year-body-table";
import { GetInitialStateType } from "@/features/initial-state/model/type";
import { GetBankDataType } from "@/features/bank/model/type";

export function YearPage({
  expenseData,
  paramsValue,
  initialState,
  bankData,
}: {
  expenseData: GetExpenseDataType[] | null;
  paramsValue: ParamsValue;
  initialState: GetInitialStateType | null;
  bankData: GetBankDataType[] | null;
}) {
  const { year, currency } = paramsValue;

  const sortedExpenseData = [...(expenseData ?? [])].sort(
    (a, b) => Number(a.id) - Number(b.id),
  );

  const lastItem = sortedExpenseData.at(-1)?.data;

  const currencyArray = MONTHS.reduce(
    (acc, month) => {
      const item = expenseData?.find(
        (item) => Number(item.id) === Number(month),
      )?.data;

      const rates = item?.currencyRates ?? lastItem?.currencyRates;

      acc.EUR.push(Number(rates?.EUR ?? 0));
      acc.USD.push(Number(rates?.USD ?? 0));
      acc.MDL.push(Number(rates?.MDL ?? 1));

      return acc;
    },
    { EUR: [], USD: [], MDL: [] } as {
      EUR: number[];
      USD: number[];
      MDL: number[];
    },
  );

  const remainingByMonth = MONTHS.map((_, monthIndex) => {
    const monthData = expenseData?.find(
      (item) => +item.id === monthIndex + 1,
    )?.data;
    const remaining =
      Number(monthData?.difference || 0) /
      Number(currencyArray?.[currency]?.[monthIndex]);
    return Number(remaining.toFixed(0));
  });

  if (!expenseData?.length)
    return (
      <div className="flex h-full items-center justify-center text-red-600">
        not data
      </div>
    );

  return (
    <Table className="table-fixed">
      <YearHeaderTable year={year} currencyArray={currencyArray?.[currency]} />
      <YearBodyTable
        data={expenseData}
        currency={currency}
        currencyArray={currencyArray?.[currency]}
      />
      <YearFooterTable
        initialState={initialState}
        currencyArray={currencyArray}
        currency={currency}
        bankData={bankData}
        remainingByMonth={remainingByMonth}
      />
    </Table>
  );
}
