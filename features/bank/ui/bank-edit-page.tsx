"use client";
import { FormWrapper } from "@/components/wrapper/form-wrapper";
import { useEffect } from "react";
import { useWatch } from "react-hook-form";
import BankForm from "./bank-form";
import { CurrencyRatesByMonth } from "@/type/currency-data";
import { ParamsValue } from "@/type/params-value";
import { bankCategories } from "../model/constants";
import { defaultBankForm } from "../model/schema";
import { GetBankDataType } from "../model/type";
import useFormBank from "../hooks/use-form-bank";

export function BankEditPage({
  bankByMonth,
  paramsValue,
  currencyRatesByMonth,
}: {
  bankByMonth: GetBankDataType | null;
  paramsValue: ParamsValue;
  currencyRatesByMonth: CurrencyRatesByMonth;
}) {
  const { currency } = paramsValue;

  const { form, onSubmit } = useFormBank({
    paramsValue,
    currencyRatesByMonth,
  });

  const bankValues = useWatch({
    control: form.control,
    name: "bank",
  });

  const totals = Object.values(bankValues).reduce(
    (acc, item) =>
      acc + Number(item.value) * Number(currencyRatesByMonth[item.currency]),
    0,
  );

  useEffect(() => {
    if (!bankByMonth) {
      form.reset(defaultBankForm);
      return;
    }

    const normalizedBank = Object.fromEntries(
      bankCategories.map((c) => {
        const dbItem = bankByMonth?.dataBank?.bank?.[c.name];

        return [
          c.name,
          {
            value: dbItem?.value ?? "",
            currency: c.currency,
          },
        ];
      }),
    );

    form.reset({
      ...defaultBankForm,
      ...bankByMonth,
      bank: normalizedBank,
    });
  }, [bankByMonth, form]);

  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      <BankForm
        totals={totals}
        selectedCurrency={Number(currencyRatesByMonth[currency])}
        currency={currency}
      />
    </FormWrapper>
  );
}
