import { TableFooter } from "@/components/ui/table";
import { Currency, CurrencyData } from "@/type/currency-data";
import RemainingRowFooter from "./remaining-row-footer";
import TotalsRowFooter from "./totals-row-footer";
import BankRowFooter from "./bank-row-footer";
import { GetInitialStateType } from "@/features/initial-state/model/type";
import { GetBankDataType } from "@/features/bank/model/type";

type Props = {
  initialState: GetInitialStateType | null;
  currencyArray: number[];
  currency: Currency;
  bankData: GetBankDataType[] | null;
  remainingByMonth: number[];
  currencyData: CurrencyData;
};

export default function YearFooterTable({
  initialState,
  currencyArray,
  currency,
  bankData,
  remainingByMonth,
  currencyData,
}: Props) {
  const initialStateInEur = initialState?.initialState?.EUR || 0;

  const initialStateByCurrency =
    Number(initialState?.initialState.MDL) / (currencyArray[0] || 1);

  const cumulativeDiff = remainingByMonth.reduce<number[]>(
    (acc, value, index) => {
      const previous = acc[index - 1] ?? 0;

      acc.push(previous + Number(value || 0));

      return acc;
    },
    [],
  );
  const getInitialStateForMonth = (index: number) => {
    if (currency === "MDL") {
      const monthRate = currencyData.EUR[index];

      return initialStateInEur * monthRate;
    }

    return initialStateByCurrency;
  };

  const totalByMonth = cumulativeDiff.map(
    (diffSum, index) => diffSum + getInitialStateForMonth(index),
  );

  return (
    <TableFooter className="bg-transparent">
      <RemainingRowFooter
        remainingByMonth={remainingByMonth}
        currency={currency}
      />
      <TotalsRowFooter totalsByMonth={totalByMonth} currency={currency} />
      <BankRowFooter
        totalByMonth={totalByMonth}
        currencyArray={currencyArray}
        bankData={bankData}
      />
    </TableFooter>
  );
}
