"use client";
import { Table } from "@/components/ui/table";
import { FormWrapper } from "@/components/wrapper/form-wrapper";

import { useEffect, ViewTransition } from "react";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { BankFormData, bankSchema, defaultBankForm } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  createBank,
  GetBankDataType,
  updateBank,
} from "@/app/action/bank-data-actions";
import BankForm from "./bank-form";

export default function BankPage({
  bankData,
  month,
  year,
  currencyRates,
  currency,
}: {
  bankData?: GetBankDataType;
  month: string;
  year: string;
  currencyRates: string;
  currency: string;
}) {
  const form = useForm<BankFormData>({
    resolver: zodResolver(bankSchema) as Resolver<BankFormData>,
    defaultValues: bankSchema.parse(bankData || defaultBankForm),
  });

  const onSubmit: SubmitHandler<BankFormData> = async (data) => {
    const formatData = { ...data, month, year, uniqueKey: `${year}-${month}` };

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
      withSubmit={false}
    >
      <ViewTransition>
        <BankForm />
      </ViewTransition>
    </FormWrapper>
  );
}
