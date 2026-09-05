"use client";
import NumericInput from "@/components/input/numeric-input";
import { FormWrapper } from "@/components/wrapper/form-wrapper";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";

import { CurrencyRatesByMonth } from "@/type/currency-data";
import { ParamsValue } from "@/type/params-value";
import useFormInitialBalance from "../hooks/use-form-initial-balance";
import { GetInitialStateType } from "../model/type";

export function InitialBalanceEdit({
  initialState,
  paramsValue,
  currencyData,
}: {
  initialState: GetInitialStateType | null;
  paramsValue: ParamsValue;
  currencyData: CurrencyRatesByMonth;
}) {
  const { year } = paramsValue;

  const { form, onSubmit } = useFormInitialBalance({
    currencyData,
    year,
  });

  useEffect(() => {
    if (!initialState) return;
    form.reset({
      initialState: initialState?.initialState?.MDL?.toString() || "0",
    });
  }, [initialState]);

  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-8">
      <Label>initial balance</Label>
      <FormWrapper form={form} onSubmit={onSubmit}>
        <div className="flex items-center justify-center gap-6">
          <Label className="flex w-30 items-center justify-center">
            MDL _{currencyData.MDL?.toFixed(2) || 0} :
          </Label>

          <NumericInput
            fieldName="initialState"
            className="h-7 w-30 border-red-600 text-xs font-semibold text-red-600"
          />
        </div>
      </FormWrapper>
      <div className="flex items-center justify-center gap-6">
        <Label className="flex w-30 items-center justify-center">
          EUR _{currencyData.EUR?.toFixed(2) || 0} :
        </Label>
        <Label className="flex w-30 items-center justify-center">
          {initialState?.initialState?.EUR?.toFixed(0) || 0}
        </Label>
      </div>
      <div className="flex items-center justify-center gap-6">
        <Label className="flex w-30 items-center justify-center">
          USD _{currencyData.USD?.toFixed(2) || 0} :
        </Label>
        <Label className="flex w-30 items-center justify-center">
          {initialState?.initialState?.USD?.toFixed(0) || 0}
        </Label>
      </div>
    </div>
  );
}
