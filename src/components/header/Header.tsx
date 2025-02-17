import Link from "next/link";
import apuLogo from "../../../public/assets/APU_Colour_Logo.png";
import Image from "next/image";
import { isLoggedIn } from "@/lib/account-utils";
import { logout } from "@/actions/account";
import Avatar from "@/components/Avatar";

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

        <div className="flex gap-3 items-center">
          {loggedIn && <Avatar className={"mx-10"} />}
          {!loggedIn ? (
            <Link
              href="/account/login"
              className="text-md uppercase font-bold px-4 py-2 tracking-tight rounded-md bg-purple-100 hover:bg-purple-500 hover:text-white transition duration-200"
            >
              Login
            </Link>
          ) : (
            <form action={logout}>
              <button
                type="submit"
                className="text-md uppercase font-bold px-4 py-2 tracking-tight rounded-md bg-purple-100 hover:bg-purple-500 hover:text-white transition duration-200"
              >
                Logout
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
