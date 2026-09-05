"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { BankFormData, bankSchema, defaultBankForm } from "../model/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBank } from "../actions/create-bank-data";
import { toast } from "sonner";
import { CurrencyRatesByMonth } from "@/type/currency-data";
import { ParamsValue } from "@/type/params-value";
import { useSetViewMode } from "@/hooks/use-set-view-mode";

export default function useFormBank({
  paramsValue,
  currencyRatesByMonth,
}: {
  paramsValue: ParamsValue;
  currencyRatesByMonth: CurrencyRatesByMonth;
}) {
  const setViewMode = useSetViewMode();

  const form = useForm<BankFormData>({
    resolver: zodResolver(bankSchema),
    defaultValues: defaultBankForm,
  });

  const onSubmit: SubmitHandler<BankFormData> = async (data) => {
    const { month, year } = paramsValue;
    const totals = Object.values(data.bank).reduce(
      (acc, item) =>
        acc + Number(item.value) * Number(currencyRatesByMonth[item.currency]),
      0,
    );
    const formatData = {
      month: month,
      year: year,
      dataBank: {
        bank: data.bank,
        totals: totals.toFixed(0).toString(),
      },
      dataCurrency: {
        USD: currencyRatesByMonth.USD,
        EUR: currencyRatesByMonth.EUR,
        MDL: currencyRatesByMonth.MDL,
      },
    };

    await createBank(formatData);

    setViewMode();

    toast.success("Bank успешно сохранён!");
  };
  return { form, onSubmit };
}
