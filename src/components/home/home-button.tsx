import React, { ForwardRefExoticComponent } from "react";
import Link from "next/link";
import { LucideProps, User } from "lucide-react";

interface HomeButtonProps {
  title: string;
  description: string;
  href: string;
  icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
  iconColor?: string;
}

export default function HomeButton({
  title,
  description,
  href,
  icon: Icon,
  iconColor,
}: HomeButtonProps) {
  Icon = Icon || User;
  return (
    <div className="relative min-w-screen border border-purple-700 bg-white rounded-xl transition-all duration-200 hover:shadow-md hover:border-purple-900 before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-50 before:to-purple-100 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-200 before:pointer-events-none before:rounded-xl overflow-hidden">
      <Link href={href} className="block px-8 py-4 h-32 relative z-10">
        <div className="flex md:gap-8 gap-4 h-full">
          <div className="flex-shrink-0 flex items-center justify-center w-16 h-full">
            {Icon && <Icon className="w-16 h-16" color={iconColor} />}
          </div>

          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <h1 className="md:text-3xl text-2xl font-bold mt-3">{title}</h1>
            <p className="text-gray-500 md:text-base text-sm truncate">
              {description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
