import Link from "next/link";
import apuLogo from "../../../public/assets/APU_Colour_Logo.png";
import Image from "next/image";
import { isLoggedIn } from "@/lib/account-utils";
import { logout } from "@/actions/account";

export default async function Header() {
  const loggedIn = await isLoggedIn();

  console.log("Logged in: " + loggedIn);

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

        {!loggedIn ? (
          <Link
            href="/account/login"
            className="text-md uppercase font-bold px-3 py-1.5 tracking-tight rounded-full bg-purple-50 hover:bg-purple-200 transition duration-200"
          >
            Login
          </Link>
        ) : (
          <form action={logout}>
            <button
              type="submit"
              className="text-md uppercase font-bold px-3 py-1.5 tracking-tight rounded-full bg-purple-50 hover:bg-purple-200 transition duration-200"
            >
              Logout
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
