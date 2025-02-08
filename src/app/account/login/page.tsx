import React from "react";
import { InputForm } from "@/components/Login/LoginForm";

const fields = [
  {
    label: "Username",
    name: "username",
    type: "text",
  },
  {
    label: "Password",
    name: "password",
    type: "password",
  },
];

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-10">
        <InputForm header="Login" fields={fields} />
      </div>
    </div>
  );
}
