import Link from "next/link";
import React from "react";

export default function header() {
  return (
    <div className="flex w-full bg-white items-center justify-center p-3">
      <div className="md:w-3/4 w-full flex items-center justify-between">
        <div>
          <Link href="/" className="md:text-xl text-md font-extrabold">
            <span className="mr-3 text-sm font-medium bg-purple-300/50 p-2 rounded-full">
              ICON
            </span>
            <span>CT Portal</span>
          </Link>
        </div>
        <Link
          href="/account/login"
          className="text-md uppercase font-semibold tracking-wide"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
