"use client";
import NumericInput from "@/components/input/numeric-input";
import { FormWrapper } from "@/components/wrapper/form-wrapper";
import { InitialStateFormType, initialStateSchema } from "./schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import {
  createInitialState,
  GetInitialStateType,
} from "@/app/action/initial-state-actions";
import { toast } from "sonner";
import { useEffect } from "react";

import { useEdit } from "@/providers/edit-provider";
import { CurrencyData } from "@/type/currency-data";

export default function InitialForm({
  initialState,
  year,
  currencyData,
}: {
  initialState: GetInitialStateType | null;
  year: string;
  currencyData: CurrencyData;
}) {
  const { isEdit, setIsEdit } = useEdit();

  console.log("initialState", initialState);

  const form = useForm<InitialStateFormType>({
    resolver: zodResolver(initialStateSchema),
    defaultValues: {
      initialState: initialState?.initialState?.MDL?.toString() || "0",
    },
  });

  console.log("currencyData", currencyData);
  const onSubmit: SubmitHandler<InitialStateFormType> = async (data) => {
    const formatData = {
      MDL: Number(data) / (currencyData.MDL[0] || 1),
      EUR: Number(data) / (currencyData.EUR[0] || 1),
      USD: Number(data) / (currencyData.USD[0] || 1),
    };
    await createInitialState(formatData, year);
    toast.success("initialState успешно обновлён!");
    setIsEdit(false);
  };

  useEffect(() => {
    if (!initialState) return;
    form.reset({
      initialState: initialState?.initialState?.MDL?.toString() || "0",
    });
  }, [initialState]);

  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-8">
      <FormWrapper form={form} onSubmit={onSubmit}>
        <div className="flex items-center justify-center gap-6">
          <Label className="flex w-30 items-center justify-center">
            initial balance :
          </Label>
          {!isEdit && (
            <Label className="flex w-30 items-center justify-center">
              {initialState?.initialState?.MDL?.toFixed(0) || 0}
            </Label>
          )}
          {isEdit && (
            <NumericInput
              fieldName="initialState"
              className="h-7 w-30 border-red-600 text-xs font-semibold text-red-600"
            />
          )}
        </div>
      </FormWrapper>
      <div className="flex items-center justify-center gap-6">
        <Label className="flex w-30 items-center justify-center">EUR :</Label>
        <Label className="flex w-30 items-center justify-center">
          {initialState?.initialState?.EUR?.toFixed(0) || 0}
        </Label>
      </div>
      <div className="flex items-center justify-center gap-6">
        <Label className="flex w-30 items-center justify-center">USD :</Label>
        <Label className="flex w-30 items-center justify-center">
          {initialState?.initialState?.USD?.toFixed(0) || 0}
        </Label>
      </div>
    </div>
  );
}
