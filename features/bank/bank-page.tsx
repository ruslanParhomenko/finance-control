"use client";
import { FormWrapper } from "@/components/wrapper/form-wrapper";

import { useEffect } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { BankFormData, bankSchema, defaultBankForm } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createBank, GetBankDataType } from "@/app/action/bank-data-actions";
import BankForm from "./bank-form";
import { InitialStateFormType } from "../initial-state/schema";
import { CurrencyData } from "@/type/currency-data";
import { ParamsValue } from "@/type/params-value";

import { bankCategories } from "./constants";
import { useEdit } from "@/providers/edit-provider";

export default function BankPage({
  bankByYear,
  paramsValue,
  currencyData,
  initialState,
}: {
  bankByYear: GetBankDataType[] | null;
  paramsValue: ParamsValue;
  currencyData: CurrencyData;
  initialState: InitialStateFormType;
}) {
  const { month, year, currency } = paramsValue;

  const { isEdit, setIsEdit } = useEdit();

  const bankData = bankByYear?.find((item) => item.id === month);

  const currencyRates = {
    USD: currencyData.USD.find((_item, index) => index === Number(month) - 1),
    EUR: currencyData.EUR.find((_item, index) => index === Number(month) - 1),
    MDL: currencyData.MDL.find((_item, index) => index === Number(month) - 1),
  };
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
      month: month,
      year: year,
      dataBank: {
        bank: data.bank,
        totals: totals.toFixed(0).toString(),
      },
    };

    const docId = await createBank(formatData);
    if (!docId) {
      toast.success("Ошибка сохранения!");
    }
    if (bankData?.id) {
      toast.success("Bank успешно обновлён!");
    } else {
      toast.success("Bank успешно создан!");
    }

    setIsEdit(false);
  };

  useEffect(() => {
    if (!bankData) {
      form.reset(defaultBankForm);
      return;
    }

    const normalizedBank = Object.fromEntries(
      bankCategories.map((c) => {
        const dbItem = bankData?.dataBank?.bank?.[c.name];

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
      ...bankData,
      bank: normalizedBank,
    });
  }, [bankData, form]);

  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      <BankForm
        bankData={bankData}
        initialState={initialState}
        totals={totals}
        selectedCurrency={Number(currencyRates[currency])}
        currency={currency}
        isEdit={isEdit}
      />
    </FormWrapper>
  );
}
