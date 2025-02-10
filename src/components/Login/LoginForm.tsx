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
import { useActionState } from "react";
import { login } from "@/app/account/actions";
import { Label } from "@/components/ui/label";
import { LoginFields } from "@/lib/types";

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

export function InputForm({ inputFields, header }: FormProps) {
  const normalizedFields = inputFields.map((field) => ({
    ...field,
    required: field.required ?? true,
  }));

  const [state, loginAction, isPending] = useActionState(login, undefined);

  return (
    <Card className="w-full max-w-md p-3 shadow-sm rounded-lg">
      {header && (
        <CardHeader className="space-y-2">
          <CardTitle>{header}</CardTitle>
          <CardDescription>Sign in with username and password.</CardDescription>
        </CardHeader>
      )}
      <CardContent>
        <form action={loginAction} className="flex flex-col gap-6">
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
                  className="bg-white"
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

            <div className="flex flex-col items-center gap-2 text-sm underline">
              <Link href="/account/register">
                Create a new account (should I even include this)
              </Link>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
