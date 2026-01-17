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
  withSubmit = true,
  ...props
}: {
  formId: string;
  form: UseFormReturn<any>;
  children: React.ReactNode;
  onSubmit?: SubmitHandler<any>;
  className?: string;
  disabled?: boolean;
  withSubmit?: boolean;
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
        {withSubmit && (
          <div className="bg-background sticky bottom-0 mt-4 flex items-center justify-end">
            <Button
              disabled={disabled}
              id={formId}
              type="submit"
              className="h-8 w-24"
            >
              save
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
