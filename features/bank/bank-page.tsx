"use client";
import { FormWrapper } from "@/components/wrapper/form-wrapper";

import { useEffect } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { BankFormData, bankSchema, defaultBankForm } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  createBank,
  GetBankDataType,
  updateBank,
} from "@/app/action/bank-data-actions";
import BankForm from "./bank-form";
import { InitialStateFormType } from "../initial-state/schema";
import { CurrencyData } from "@/type/currency-data";
import { ParamsValue } from "@/type/params-value";
import { de } from "zod/v4/locales";
import { bankCategories } from "./constants";

export default function BankPage({
  bankData,
  paramsValue,
  currencyData,
  initialState,
}: {
  bankData: GetBankDataType | null;
  paramsValue: ParamsValue;
  currencyData: CurrencyData;
  initialState: InitialStateFormType;
}) {
  const { month, year, currency } = paramsValue;

  const currencyRates = {
    USD: currencyData.USD.find((_item, index) => index === Number(month) - 1),
    EUR: currencyData.EUR.find((_item, index) => index === Number(month) - 1),
    MDL: currencyData.MDL.find((_item, index) => index === Number(month) - 1),
  };
  const form = useForm<BankFormData>({
    resolver: zodResolver(bankSchema),
    defaultValues: defaultBankForm,
  });

  const error = form.formState.errors;

  console.log("error", error);

  console.log("value ", form.getValues());

  const bankValues = useWatch({
    control: form.control,
    name: "bank",
  });

  const totals = Object.values(bankValues).reduce(
    (acc, item) =>
      acc + Number(item.value) * Number(currencyRates[item.currency]),
    0,
  );

  const onSubmit: SubmitHandler<BankFormData> = async (data) => {
    const formatData = {
      month: month,
      year: year,
      dataBank: {
        bank: data.bank,
        totals: totals.toFixed(0).toString(),
      },
    };

    console.log("formatData", formatData);

    await createBank(formatData);
    if (bankData?.id) {
      // await updateBank(bankData.id as string, formatData);
      toast.success("Bank успешно обновлён!");

      return;
    } else {
      toast.success("Bank успешно создан!");

      return;
    }
  };

  useEffect(() => {
    if (!bankData) {
      form.reset(defaultBankForm);
      return;
    }

    const normalizedBank = Object.fromEntries(
      bankCategories.map((c) => {
        const dbItem = bankData.bank?.[c.name];

        return [
          c.name,
          {
            value: dbItem?.value ?? "",
            currency: c.currency, // 👈 ВСЕГДА берём из categories
          },
        ];
      }),
    );

    form.reset({
      ...defaultBankForm,
      ...bankData,
      bank: normalizedBank,
    });
  }, [bankData, form]);

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      formId="bank-form"
      className="flex flex-col items-center justify-center"
    >
      <BankForm
        initialState={initialState}
        totals={totals}
        selectedCurrency={Number(currencyRates[currency])}
        currency={currency}
        year={year}
      />
    </FormWrapper>
  );
}
