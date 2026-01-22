"use client";
import { FormWrapper } from "@/components/wrapper/form-wrapper";

import { useEffect, ViewTransition } from "react";
import { Resolver, SubmitHandler, useForm, useWatch } from "react-hook-form";
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

export default function BankPage({
  bankData,
  month,
  year,
  currencyRates,
  currency,
  initialState,
}: {
  bankData?: GetBankDataType;
  month: string;
  year: string;
  currencyRates: {
    USD: string;
    EUR: string;
    MDL: string;
  };
  currency: string;
  initialState: InitialStateFormType;
}) {
  const selectedCurrency = currencyRates[currency as "USD" | "EUR" | "MDL"];
  const form = useForm<BankFormData>({
    resolver: zodResolver(bankSchema) as Resolver<BankFormData>,
    defaultValues: bankSchema.parse(bankData || defaultBankForm),
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
      month,
      year,
      uniqueKey: `${year}-${month}`,
      totals: totals.toFixed(0).toString(),
    };

    if (bankData?.id) {
      await updateBank(bankData.id as string, formatData as BankFormData);
      toast.success("Bank успешно обновлён!");

      return;
    } else {
      await createBank(formatData as BankFormData);
      toast.success("Expense успешно создан!");

      return;
    }
  };

  useEffect(() => {
    if (!bankData) return;

    form.reset({
      ...bankData,
    });
  }, [bankData, month, year, form]);

  const formId = "bank-form";
  const isLoading = form.formState.isSubmitting;
  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      formId={formId}
      disabled={isLoading}
    >
      <ViewTransition>
        <BankForm
          initialState={initialState}
          totals={totals}
          selectedCurrency={selectedCurrency}
        />
      </ViewTransition>
    </FormWrapper>
  );
}
