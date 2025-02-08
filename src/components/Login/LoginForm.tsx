"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/lib/validations";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useActionState } from "react";
import { login } from "@/app/account/actions";

interface FormStructure {
  label: string;
  name: string;
  type: string;
}

interface FormProps {
  fields: FormStructure[];
  header?: string;
}

export function InputForm({ fields, header }: FormProps) {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: fields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {} as Record<string, string>),
  });

  const [state, loginAction] = useActionState(login, undefined);

  function onSubmit(data: z.infer<typeof LoginSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      {header && (
        <h1 className="text-3xl font-bold mb-8 text-center select-none">
          {header}
        </h1>
      )}
      <form
        action={loginAction}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        {fields.map(({ label, name, type }) => (
          <FormField
            key={name}
            control={form.control}
            name={name as keyof z.infer<typeof LoginSchema>}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={
                      field.name.charAt(0).toUpperCase() + field.name.slice(1)
                    }
                    type={type}
                    className="bg-slate-50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" className="w-full mt-6">
          Submit
        </Button>
        <div className="flex flex-col items-center gap-2 text-sm underline">
          {/* <Link href="/account/forgot">Forgot password?</Link> */}
          <Link href="/account/register">Create a new account</Link>
        </div>
      </form>
    </Form>
  );
}
