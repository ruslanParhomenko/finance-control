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

  const totalByYear = Object.values(totalByMonthMap).reduce(
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
            <TableCell className="bg-background sticky left-0 w-12 text-end text-blue-700">
              {totalByCategory}
            </TableCell>

            <TableCell className="bg-background sticky left-12 w-12 border-r font-medium">
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
                    "w-12 border-r text-center",
                    total === 0 && "text-muted-foreground",
                  )}
                >
                  {total}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}

      <TableRow>
        <TableCell className="bg-background sticky left-0 text-end text-blue-700">
          {totalByYear}
        </TableCell>

        <TableCell className="bg-background sticky left-12 w-12 border-r">
          total
        </TableCell>

        {MONTHS.map((month) => (
          <TableCell
            key={month}
            className={cn(
              "w-12 border-r text-center",
              totalByMonthMap[month] === 0 && "text-muted-foreground",
            )}
          >
            {totalByMonthMap[month]}
          </TableCell>
        ))}
      </TableRow>
    </TableBody>
  );
}
