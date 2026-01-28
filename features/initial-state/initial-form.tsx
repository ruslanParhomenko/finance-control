"use client";
import NumericInput from "@/components/input/numeric-input";
import { FormWrapper } from "@/components/wrapper/form-wrapper";
import { InitialStateFormType, initialStateSchema } from "./schema";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { createInitialState } from "@/app/action/initial-state-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function InitialForm({
  initialState,
}: {
  initialState: InitialStateFormType;
}) {
  console.log(initialState);
  const router = useRouter();

  const form = useForm<InitialStateFormType>({
    resolver: zodResolver(initialStateSchema) as Resolver<InitialStateFormType>,
    defaultValues: initialStateSchema.parse({}),
  });

  const onSubmit: SubmitHandler<InitialStateFormType> = async (data) => {
    await createInitialState(data);
    toast.success("initialState успешно обновлён!");
    router.back();
  };

  useEffect(() => {
    if (!initialState) return;
    form.reset(initialState);
  }, [initialState]);

  const formId = "initial-form";
  const isLoading = form.formState.isSubmitting;
  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      formId={formId}
      disabled={isLoading}
      withBackButton={true}
    >
      <div className="flex h-[30vh] items-center justify-center gap-6">
        <Label>initial balance :</Label>
        <NumericInput
          fieldName="initialState"
          className="h-7 w-30 text-xs font-semibold"
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
