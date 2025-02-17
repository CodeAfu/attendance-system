"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { login } from "@/actions/account";
import { Label } from "@/components/ui/label";
import { LoginFields } from "@/lib/types";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface FormStructure {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}

interface FormProps {
  inputFields: FormStructure[];
  header?: string;
}

export function LoginForm({ inputFields, header }: FormProps) {
  const normalizedFields = inputFields.map((field) => ({
    ...field,
    required: field.required ?? true,
  }));

  const [state, loginAction, isPending] = useActionState(login, undefined);
  const pathname = usePathname();
  const [redirectTo, setRedirectTo] = useState(pathname);

  useEffect(() => {
    setRedirectTo(pathname);
  }, [pathname]);

  return (
    <Card className="w-full max-w-md p-3 shadow-sm rounded-lg">
      {header && (
        <CardHeader className="space-y-2">
          <CardTitle>{header}</CardTitle>
          <CardDescription>Sign in with email and password.</CardDescription>
        </CardHeader>
      )}
      <CardContent>
        <form action={loginAction} className="flex flex-col gap-6">
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <div className="space-y-6">
            {normalizedFields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name} className="font-semibold">
                  {field.label}
                </Label>
                <Input
                  {...field}
                  defaultValue={
                    state?.inputs?.[field.name as keyof LoginFields]
                  }
                  className={cn(
                    "bg-white focus-visible:ring-2 focus-visible:ring-purple-800 focus-visible:ring-offset-2",
                    state?.errors?.[field.name as keyof typeof state.errors] &&
                      "border-destructive"
                  )}
                  disabled={isPending}
                />
                {state?.errors?.[field.name as keyof typeof state.errors] && (
                  <p className="text-red-500 text-sm">
                    {state.errors[field.name as keyof typeof state.errors]?.[0]}
                  </p>
                )}
              </div>
            ))}

            <Button
              type="submit"
              className={`w-full ${isPending && "bg-gray-500 opacity-50"}`}
              disabled={isPending}
            >
              Login
            </Button>

            {state?.errors?.message && (
              <div className="border border-destructive/40 bg-destructive/10 rounded-lg p-2 space-y-1.5">
                <p className="text-red-500 text-xs font-semibold">Error:</p>
                {state.errors.message.map((msg, index) => (
                  <p key={index} className="text-red-500 text-sm">
                    - {msg}
                  </p>
                ))}
              </div>
            )}

            <div className="flex flex-col items-center gap-2 text-sm underline">
              <Link href="/account/register" className="text-center">
                Create a new account (Add this to admin panel)
              </Link>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
