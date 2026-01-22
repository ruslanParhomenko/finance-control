"use client";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function FormWrapper({
  formId,
  form,
  children,
  onSubmit,
  className,
  disabled,
  withSubmit = true,
  withBackButton = false,
  ...props
}: {
  formId: string;
  form: UseFormReturn<any>;
  children: React.ReactNode;
  onSubmit?: SubmitHandler<any>;
  className?: string;
  disabled?: boolean;
  withSubmit?: boolean;
  withBackButton?: boolean;
  [key: string]: any;
}) {
  const router = useRouter();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit || (() => {}))}
        className={cn("flex flex-col", className)}
        {...props}
      >
        {children}
        {withSubmit && (
          <div className="bg-background sticky bottom-0 m-4 flex items-center justify-end gap-4">
            {withBackButton && (
              <Button
                type="button"
                variant={"destructive"}
                className="h-8 w-22"
                onClick={() => router.back()}
              >
                back
              </Button>
            )}
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
