"use client";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { Form } from "../ui/form";
import { cn } from "@/lib/utils";

export function FormWrapper({
  formId,
  form,
  children,
  onSubmit,
  className,
}: {
  formId: string;
  form: UseFormReturn<any>;
  children: React.ReactNode;
  onSubmit?: SubmitHandler<any>;
  className?: string;
}) {
  console.log("formId", formId);
  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit || (() => {}))}
        className={cn("flex flex-col", className)}
      >
        {children}
      </form>
    </Form>
  );
}
