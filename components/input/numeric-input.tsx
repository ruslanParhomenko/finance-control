"use client";

import { useFormContext, useController } from "react-hook-form";
import { Input } from "../ui/input";
import { FormItem, FormControl, FormMessage } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

type NumericInputProps = {
  fieldName: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
};

export default function NumericInput({
  fieldName,
  placeholder,
  className,
  disabled,
  onFocus,
  onBlur,
}: NumericInputProps) {
  const { control } = useFormContext();
  const { field } = useController({ name: fieldName, control });
  const [open, setOpen] = useState(false);

  const currentValue = control._getWatch(fieldName);

  useEffect(() => {
    if (open && currentValue !== field.value) {
      field.onChange(currentValue ?? "");
    }
  }, [currentValue, field, open]);

  const classNameButton = "h-12 text-xl bg-background";

  const appendDigit = (num: string | number) => {
    const val = control._getWatch(fieldName) ?? "";
    field.onChange(`${val}${num}`);
  };

  return (
    <FormItem>
      <Popover
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (v) {
            onFocus?.();
          } else {
            onBlur?.();
          }
        }}
      >
        <PopoverTrigger asChild>
          <FormControl>
            <Input
              value={currentValue ?? ""}
              placeholder={placeholder}
              disabled={disabled}
              onClick={() => setOpen(true)}
              onChange={(e) => field.onChange(e.target.value)}
              className={cn("cursor-pointer p-0 text-center", className)}
            />
          </FormControl>
        </PopoverTrigger>

        <PopoverContent className="bg-background grid w-52 grid-cols-3 gap-3 border-none p-2">
          {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
            <Button
              key={num}
              type="button"
              variant="outline"
              className={classNameButton}
              onClick={(e) => {
                e.preventDefault();
                appendDigit(num);
              }}
            >
              {num}
            </Button>
          ))}

          <Button
            type="button"
            variant="outline"
            className={classNameButton}
            onClick={(e) => {
              e.preventDefault();
              appendDigit(0);
            }}
          >
            0
          </Button>

          <Button
            type="button"
            variant="outline"
            className={classNameButton}
            onClick={(e) => {
              e.preventDefault();
              const val = control._getWatch(fieldName) ?? "";
              if (!val.includes(".")) field.onChange(val + ".");
            }}
          >
            .
          </Button>

          <Button
            type="button"
            variant="outline"
            className={classNameButton}
            onClick={(e) => {
              e.preventDefault();
              const val = control._getWatch(fieldName) ?? "";
              if (!val.startsWith("-")) field.onChange("-" + val);
            }}
          >
            -
          </Button>

          <Button
            type="button"
            variant="outline"
            className={cn(classNameButton, "text-red-700")}
            onClick={(e) => {
              e.preventDefault();
              const val = control._getWatch(fieldName) ?? "";
              field.onChange(val.slice(0, -1));
            }}
          >
            x
          </Button>

          <Button
            type="button"
            variant="outline"
            className={cn(classNameButton, "col-span-2 text-blue-700")}
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
            }}
          >
            ok
          </Button>
        </PopoverContent>
      </Popover>

      <FormMessage />
    </FormItem>
  );
}
