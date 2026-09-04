// "use client";

// import { useSearchParams } from "next/navigation";
// import ChartBank from "./chart-bank";
// import { ParamsValue } from "@/type/params-value";
// import { CurrencyData } from "@/type/currency-data";
// import { GetBankDataType } from "@/app/action/bank-data-actions";
// import ChartExpenses from "./chart-expenses";
// import ChartExpenseMonth from "./chart-expense-month";
// import { GetExpenseDataType } from "../month/actions/get-expense";

// export default function ChartPage({
//   paramsValue,
//   dataBank,
//   dataExpense,
//   currencyData,
// }: {
//   paramsValue: ParamsValue;

//   dataBank: GetBankDataType[] | null;
//   dataExpense: GetExpenseDataType[] | null;

//   currencyData: CurrencyData;
// }) {
//   const { currency } = paramsValue;
//   const searchParams = useSearchParams();
//   const tab = searchParams.get("tab");

//   return (
//     <>
//       {tab === "bank" && (
//         <ChartBank
//           dataBank={dataBank}
//           currencyData={currencyData}
//           paramsValue={paramsValue}
//         />
//       )}

//       {tab === "expenses" && (
//         <ChartExpenses data={dataExpense} currency={currency} />
//       )}
//       {tab === "month" && (
//         <ChartExpenseMonth data={dataExpense} currency={currency} />
//       )}
//     </>
//   );
// }
