import { getCurrencyData } from "@/app/action/get-currency";
import {
  InitialBalanceEdit,
  InitialBalanceView,
} from "@/features/initial-state";
import { getInitialState } from "@/features/initial-state/actions/get-init-bal";
import { ParamsValue } from "@/type/params-value";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const paramsValue = (await searchParams) as ParamsValue;
  const { month, year, currency, mode } = paramsValue;

  if (!month || !year || !currency || !mode) return null;

  const initialState = await getInitialState(year);

  if (mode === "edit") {
    const currencyData = await getCurrencyData(Number(year));
    const currencyRatesFirstMonth = {
      MDL: 1,
      EUR: currencyData.EUR[0],
      USD: currencyData.USD[0],
    };

    return (
      <InitialBalanceEdit
        paramsValue={paramsValue}
        initialState={initialState}
        currencyData={currencyRatesFirstMonth}
      />
    );
  }

  return <InitialBalanceView initialBalance={initialState} />;
}
