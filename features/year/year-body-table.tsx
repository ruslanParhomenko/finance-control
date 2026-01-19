import { GetExpenseDataType } from "@/app/action/month-data-actions";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { expenseCategories } from "@/constants/expense";
import { cn } from "@/lib/utils";
import { MONTHS } from "@/utils/get-month-days";

export default function YearBodyTable({
  data,
}: {
  data: GetExpenseDataType[];
}) {
  const totalByMonthMap = MONTHS.reduce<Record<string, number>>(
    (acc, month) => {
      const dataByMonth = data.find((item) => item.month === month);

      const monthTotal = expenseCategories.reduce((catAcc, category) => {
        const values = dataByMonth?.rowExpenseData?.[category] ?? [];
        const categoryTotal = values.reduce((sum, val) => sum + Number(val), 0);
        return catAcc + categoryTotal;
      }, 0);

      acc[month] = monthTotal;
      return acc;
    },
    {},
  );

  const totalAddCashMap = MONTHS.reduce<Record<string, number>>(
    (acc, month) => {
      const dataByMonth = data.find((item) => item.month === month);

      const monthTotal = (
        dataByMonth?.rowExpenseData?.["add-cash"] ?? []
      ).reduce((sum, val) => {
        return sum + Number(val);
      }, 0);

      acc[month] = monthTotal ?? 0;
      return acc;
    },
    {},
  );

  const totalByYear = Object.values(totalByMonthMap).reduce(
    (acc, val) => acc + val,
    0,
  );

  const totalAddCash = Object.values(totalAddCashMap).reduce(
    (acc, val) => acc + val,
    0,
  );
  return (
    <TableBody>
      {expenseCategories.map((category) => {
        const totalByCategory = MONTHS.reduce((monthAcc, month) => {
          const dataByMonth = data.find((item) => item.month === month);
          const dataByCategory = dataByMonth?.rowExpenseData?.[category];

          const monthTotal =
            dataByCategory?.reduce((acc, val) => acc + Number(val), 0) ?? 0;

          return monthAcc + monthTotal;
        }, 0);

        return (
          <TableRow key={category}>
            <TableCell className="bg-background sticky left-0 w-12 p-0 px-1 text-end text-blue-700">
              {totalByCategory}
            </TableCell>

            <TableCell className="bg-background sticky left-12 w-12 border-r p-0 px-1 font-medium">
              {category}
            </TableCell>

            {MONTHS.map((month) => {
              const dataByMonth = data.find((item) => item.month === month);
              const dataByCategory = dataByMonth?.rowExpenseData?.[category];

              const total =
                dataByCategory?.reduce((acc, val) => acc + Number(val), 0) ?? 0;

              return (
                <TableCell
                  key={month}
                  className={cn(
                    "h-6.5 w-10 border-r p-0 py-1 text-center",
                    total === 0 && "text-muted-foreground",
                  )}
                >
                  {total === 0 ? "" : total}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}

      <TableRow>
        <TableCell className="bg-background sticky left-0 py-0.5 text-end text-blue-700">
          {totalByYear}
        </TableCell>

        <TableCell className="bg-background sticky left-12 w-10 border-r py-0.5"></TableCell>

        {MONTHS.map((month) => (
          <TableCell
            key={month}
            className={cn(
              "w-10 border-r py-0.5 text-center font-semibold text-blue-900",
            )}
          >
            {totalByMonthMap[month] === 0 ? "" : totalByMonthMap[month]}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell className="h-6.5">{totalAddCash}</TableCell>
        <TableCell className="h-6.5">add-cash</TableCell>

        {MONTHS.map((month) => {
          const dataByMonth = data.find((item) => item.month === month);

          console.log(dataByMonth);
          const dataByCategory = dataByMonth?.rowExpenseData?.["add-cash"];

          const total =
            dataByCategory?.reduce((acc, val) => acc + Number(val), 0) ?? 0;
          return (
            <TableCell key={month} className="w-12 border-r text-center">
              {total === 0 ? "" : total}
            </TableCell>
          );
        })}
      </TableRow>
    </TableBody>
  );
}
