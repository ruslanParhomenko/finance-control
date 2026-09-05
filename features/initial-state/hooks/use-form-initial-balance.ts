"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { InitialStateFormType, initialStateSchema } from "../model/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CurrencyRatesByMonth } from "@/type/currency-data";
import { toast } from "sonner";
import { useSetViewMode } from "@/hooks/use-set-view-mode";
import { createInitialState } from "../actions/create-init-bal";

export default function useFormInitialBalance({
  currencyData,
  year,
}: {
  currencyData: CurrencyRatesByMonth;
  year: string;
}) {
  const setViewMode = useSetViewMode();

  const form = useForm<InitialStateFormType>({
    resolver: zodResolver(initialStateSchema),
    defaultValues: {
      initialState: "0",
    },
  });

  const onSubmit: SubmitHandler<InitialStateFormType> = async (data) => {
    const value = Number(data.initialState);
    const formatData = {
      balanceByCurrency: {
        MDL: Math.round(value),
        EUR: Math.round(value / (currencyData.EUR || 1)),
        USD: Math.round(value / (currencyData.USD || 1)),
      },
      currencyRates: {
        MDL: 1,
        EUR: currencyData.EUR,
        USD: currencyData.USD,
      },
    };

    await createInitialState(formatData, year);

    setViewMode();

    toast.success("initialState успешно обновлён!");
  };

  return {
    form,
    onSubmit,
  };
}
