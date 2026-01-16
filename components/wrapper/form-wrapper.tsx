import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export function FormWrapper({
  formId,
  form,
  children,
  onSubmit,
  className,
  disabled,
  ...props
}: {
  formId: string;
  form: UseFormReturn<any>;
  children: React.ReactNode;
  onSubmit?: SubmitHandler<any>;
  className?: string;
  disabled?: boolean;
  [key: string]: any;
}) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit || (() => {}))}
        className={cn("flex flex-col", className)}
        {...props}
      >
        {children}
        <div className="flex justify-end items-center sticky bottom-0 bg-background mt-4">
          <Button
            disabled={disabled}
            id={formId}
            type="submit"
            className="w-24 h-8"
          >
            save
          </Button>
        </div>
      </form>
    </Form>
  );
}
