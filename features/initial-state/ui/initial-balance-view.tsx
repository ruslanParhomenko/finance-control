import { Label } from "@/components/ui/label";
import { GetInitialStateType } from "../model/type";

export function InitialBalanceView({
  initialBalance,
}: {
  initialBalance: GetInitialStateType | null;
}) {
  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-8">
      <Label>initial balance</Label>
      <div className="flex items-center justify-center gap-4">
        <Label className="flex w-30 items-center justify-center">
          MDL _{initialBalance?.currencyRates?.MDL?.toFixed(2) || 0} :
        </Label>

        <Label className="flex w-30 items-center justify-center">
          {initialBalance?.initialState?.MDL?.toFixed(0) || 0}
        </Label>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Label className="flex w-30 items-center justify-center">
          EUR _{initialBalance?.currencyRates?.EUR?.toFixed(2) || 0} :
        </Label>
        <Label className="flex w-30 items-center justify-center">
          {initialBalance?.initialState?.EUR?.toFixed(0) || 0}
        </Label>
      </div>
      <div className="flex items-center justify-center gap-4">
        <Label className="flex w-30 items-center justify-center">
          USD _{initialBalance?.currencyRates?.USD?.toFixed(2) || 0} :
        </Label>
        <Label className="flex w-30 items-center justify-center">
          {initialBalance?.initialState?.USD?.toFixed(0) || 0}
        </Label>
      </div>
    </div>
  );
}
