import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { loadUserDetails } from "@/app/data-fetch/account";
import { Separator } from "@/components/ui/separator";

interface AvatarProps {
  className?: string;
}

export default async function UserDetails({ className }: AvatarProps) {
  const result = await loadUserDetails();
  let email;
  let role;

  if ("email" in result && "role" in result) {
    email = result.email;
    role = result.role;
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <div className="flex items-center text-xs">
          <Avatar>
            <AvatarImage
              src={`https://eu.ui-avatars.com/api/?name=${role}`}
              alt="@shadcn"
            />
            <AvatarFallback>{role}</AvatarFallback>
          </Avatar>
          <Separator className="mx-2 h-10" orientation="vertical" />
        </div>
        <div className="flex flex-col items-start justify-start md:w-40 w-10">
          <div className="text-sm">{email}</div>
          <div className="text-xs text-gray-400">{role}</div>
        </div>
      </div>
    </div>
  );
}
