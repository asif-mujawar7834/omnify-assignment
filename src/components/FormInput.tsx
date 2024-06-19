import { ReactNode } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

interface FormInputProps {
  control: any;
  error?: string;
  placeholder: string;
  label?: string;
  name: string;
  type: string;
  disabled?: boolean;
  required?: boolean;
  icon?: ReactNode;
}

export default function FormInput({
  control,
  error,
  placeholder,
  label,
  name,
  type,
  disabled,
  required = false,
  icon,
}: FormInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-black font-bold">
            {label}
            {required && label && <span className="ml-2 text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              className={`py-1 ${icon ? "pl-8 pr-3" : "px-3"} ${
                error ? "outline outline-1 outline-red-500" : ""
              } bg-[#F8FAFC]`}
              disabled={disabled}
              icon={icon}
            />
          </FormControl>
          {error && <FormMessage className="text-xs">{error}</FormMessage>}
        </FormItem>
      )}
    />
  );
}
