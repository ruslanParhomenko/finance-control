"use client";
import NumericInput from "@/components/input/numeric-input";
import { FormWrapper } from "@/components/wrapper/form-wrapper";
import { InitialStateFormType, initialStateSchema } from "./schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { createInitialState } from "@/app/action/initial-state-actions";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { PenBox, PenOff } from "lucide-react";

export default function InitialForm({
  initialState,
  year,
}: {
  initialState: InitialStateFormType;
  year: string;
}) {
  const [isEdit, setIsEdit] = useState(false);

  const form = useForm<InitialStateFormType>({
    resolver: zodResolver(initialStateSchema),
    defaultValues: { initialState: "0", currency: "EUR" },
  });

  const onSubmit: SubmitHandler<InitialStateFormType> = async (data) => {
    await createInitialState(data, year);
    toast.success("initialState успешно обновлён!");
  };

  useEffect(() => {
    if (!initialState) return;
    form.reset(initialState);
  }, [initialState]);

  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      <div className="flex h-[30vh] items-center justify-center gap-6">
        {isEdit ? (
          <PenOff
            className="h-4 w-4 cursor-pointer text-gray-400"
            onClick={() => setIsEdit(false)}
          />
        ) : (
          <PenBox
            className="h-4 w-4 cursor-pointer text-blue-700"
            onClick={() => setIsEdit(true)}
          />
        )}
        <Label>initial balance :</Label>
        <NumericInput
          fieldName="initialState"
          className="h-7 w-30 text-xs font-semibold"
          disabled={!isEdit}
        />
        <input
          {...form.register("currency")}
          readOnly
          className="h-7 w-20 text-center text-xs font-semibold"
        />
      </div>
    </FormWrapper>
  );
}
