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
};

export default function NumericInput({
  fieldName,
  placeholder,
  className,
  disabled,
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

  return (
    <FormItem>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Input
              value={currentValue ?? ""}
              placeholder={placeholder}
              disabled={disabled}
              onClick={() => setOpen(true)}
              onChange={(e) => field.onChange(e.target.value)}
              className={cn("cursor-pointer text-center p-0", className)}
            />
          </FormControl>
        </PopoverTrigger>

        <PopoverContent className="w-52 p-2 grid grid-cols-3 gap-3 border-none bg-background">
          {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
            <Button
              key={num}
              variant="outline"
              className={classNameButton}
              onClick={() => {
                const val = control._getWatch(fieldName) ?? "";
                field.onChange(val + num);
              }}
            >
              {num}
            </Button>
          ))}

          <Button
            variant="outline"
            className={classNameButton}
            onClick={() => {
              const val = control._getWatch(fieldName) ?? "";
              field.onChange(val + "0");
            }}
          >
            0
          </Button>

          <Button
            variant="outline"
            className={classNameButton}
            onClick={() => {
              const val = control._getWatch(fieldName) ?? "";
              if (!val.includes(".")) field.onChange(val + ".");
            }}
          >
            .
          </Button>

          <Button
            variant="outline"
            className={classNameButton}
            onClick={() => {
              const val = control._getWatch(fieldName) ?? "";
              if (!val.startsWith("-")) field.onChange("-" + val);
            }}
          >
            -
          </Button>

          <Button
            variant="outline"
            className={cn(classNameButton, "text-red-700")}
            onClick={() => {
              const val = control._getWatch(fieldName) ?? "";
              field.onChange(val.slice(0, -1));
            }}
          >
            x
          </Button>

          <Button
            variant="outline"
            className={cn(classNameButton, "text-blue-700 col-span-2")}
            onClick={() => setOpen(false)}
          >
            ok
          </Button>
        </PopoverContent>
      </Popover>

      <FormMessage />
    </FormItem>
  );
}
