import Link from "next/link";
import React from "react";
import apuLogo from "../../../public/assets/APU_Colour_Logo.png";
import Image from "next/image";

export default function header() {
  return (
    <div className="flex w-full bg-white items-center justify-center p-3">
      <div className="md:w-3/4 w-full flex items-center justify-between">
        <div>
          <Link
            href="/"
            className="md:text-xl text-md font-extrabold flex items-center gap-2"
          >
            <span className="mr-3 text-sm font-medium rounded-full">
              <Image src={apuLogo} alt="APU Logo" width={40} height={40} />
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
