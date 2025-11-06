import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "../../auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import GithubButton from "./ui/githubButton";
import LogoutButton from "./ui/logoutButton";
import CreateButton from "./ui/createButton";

const Navbar = async () => {
  const session = await auth()

  return (
    <header className="px-5 py-3  shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/blog-logo2.png" alt="logo" width={125} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                {/* <span className="max-sm:hidden">Create</span> */}
                <CreateButton/>
                {/* <BadgePlus className="size-6 " /> */}
              </Link>

              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  {/* <span className="max-sm:hidden">Logout</span> */}
                  {/* <LogOut className="size-6 sm:hidden text-red-500" /> */}
                  <LogoutButton/>
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn("github");
              }}
            >
              {/* <button type="submit">Login</button> */}
              <GithubButton/>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;