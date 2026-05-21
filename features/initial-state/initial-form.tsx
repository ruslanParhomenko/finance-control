"use client";
import NumericInput from "@/components/input/numeric-input";
import { FormWrapper } from "@/components/wrapper/form-wrapper";
import { InitialStateFormType, initialStateSchema } from "./schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { createInitialState } from "@/app/action/initial-state-actions";
import { toast } from "sonner";
import { useEffect } from "react";

import { useEdit } from "@/providers/edit-provider";

export default function InitialForm({
  initialState,
  year,
}: {
  initialState: InitialStateFormType;
  year: string;
}) {
  const { isEdit, setIsEdit } = useEdit();

  const form = useForm<InitialStateFormType>({
    resolver: zodResolver(initialStateSchema),
    defaultValues: { initialState: "0", currency: "EUR" },
  });

  const onSubmit: SubmitHandler<InitialStateFormType> = async (data) => {
    const formatData = {
      initialState: data.initialState,
      currency: "EUR",
    };
    await createInitialState(formatData, year);
    toast.success("initialState успешно обновлён!");
    setIsEdit(false);
  };

  useEffect(() => {
    if (!initialState) return;
    form.reset(initialState);
  }, [initialState]);

  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      <div className="flex h-dvh items-center justify-center gap-6">
        <Label>initial balance :</Label>
        {!isEdit && (
          <Label className="flex w-30 items-center justify-center">
            {initialState?.initialState}
          </Label>
        )}
        {isEdit && (
          <NumericInput
            fieldName="initialState"
            className="h-7 w-30 border-red-600 text-xs font-semibold text-red-600"
          />
        )}
        <Label>EUR</Label>
      </div>
    </FormWrapper>
  );
}
