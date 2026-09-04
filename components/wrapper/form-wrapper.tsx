"use client";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { Form } from "../ui/form";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";

export function FormWrapper({
  formId,
  form,
  children,
  onSubmit,
  className,
}: {
  formId?: string;
  form: UseFormReturn<any>;
  children: React.ReactNode;
  onSubmit?: SubmitHandler<any>;
  className?: string;
}) {
  const pathname = usePathname();
  const mainRoute = pathname?.split("/").pop();
  const id = formId || mainRoute;
  return (
    <Form {...form}>
      <form
        id={id}
        onSubmit={form.handleSubmit(onSubmit || (() => {}))}
        className={cn("flex flex-col", className)}
      >
        {children}
      </form>
    </Form>
  );
}
