import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  helper?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({ label, htmlFor, required, helper, error, children, className }: FormFieldProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <Label htmlFor={htmlFor} className="font-body text-sm font-medium">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      {children}
      {error ? (
        <p className="flex items-center gap-1 font-body text-xs text-error" role="alert">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      ) : helper ? (
        <p className="font-body text-xs text-muted-foreground">{helper}</p>
      ) : null}
    </div>
  );
}
