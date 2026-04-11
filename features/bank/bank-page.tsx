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

export default function BankPage({
  bankData,
  paramsValue,
  currencyRates,
  initialState,
  formId,
}: {
  bankData: GetBankDataType | null;
  paramsValue: ParamsValue;
  currencyRates: CurrencyData;
  initialState: InitialStateFormType;
  formId: string;
}) {
  const { month, year, currency } = paramsValue;

  const selectedCurrency = currencyRates[currency as "USD" | "EUR" | "MDL"];
  const form = useForm<BankFormData>({
    resolver: zodResolver(bankSchema),
    defaultValues: defaultBankForm,
  });

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
      ...data,
      month: month,
      year: year,
      uniqueKey: `${year}-${month}`,
      totals: totals.toFixed(0).toString(),
    };

    if (bankData?.id) {
      await updateBank(bankData.id as string, formatData);
      toast.success("Bank успешно обновлён!");

      return;
    } else {
      await createBank(formatData);
      toast.success("Expense успешно создан!");

      return;
    }
  };

  useEffect(() => {
    if (!bankData) return form.reset(defaultBankForm);

    form.reset({
      ...bankData,
    });
  }, [bankData, month, year, form]);

  const isLoading = form.formState.isSubmitting;
  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      formId={formId}
      disabled={isLoading}
      className="flex items-center justify-center"
      withSubmit={false}
    >
      <BankForm
        initialState={initialState}
        totals={totals}
        selectedCurrency={selectedCurrency}
        currency={currency}
        year={year}
      />
    </FormWrapper>
  );
}
