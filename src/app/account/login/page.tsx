import React from "react";
import { LoginForm } from "@/components/login/LoginForm";
import bgImage from "../../../../public/assets/login-background.jpg";

const fields = [
  {
    label: "Email",
    name: "email",
    type: "text",
    required: true,
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    required: true,
  },
];

export default function LoginPage() {
  return (
    <div className="-z-20 flex min-h-screen items-center justify-center px-4">
      <div
        style={{
          backgroundImage: `url(${bgImage.src})`,
          backgroundSize: "cover",
          opacity: 0.3,
          filter: "brightness(0.4)",
        }}
        className="fixed top-0 left-0 w-full h-full -z-10"
      />
      <LoginForm header="Login" inputFields={fields} />
    </div>
  );
}
