import { getCurrencyData } from "@/app/action/get-currency";
import { getInitialState } from "@/app/action/initial-state-actions";
import InitialForm from "@/features/initial-state/initial-form";
import { ParamsValue } from "@/type/params-value";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const paramsValue = (await searchParams) as ParamsValue;
  const { month, year, currency, mode } = paramsValue;
  if (!month || !year || !currency || !mode) return;
  const [initialState, currencyData] = await Promise.all([
    getInitialState(year),
    getCurrencyData(Number(year)),
  ]);

  return (
    <InitialForm
      initialState={initialState}
      paramsValue={paramsValue}
      currencyData={currencyData}
    />
  );
}
