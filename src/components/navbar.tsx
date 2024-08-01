import { cn } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import MaxWidthWrapper from "./max-width-wrapper";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

async function Navbar() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  return (
    <nav className="sticky inset-x-0 top-0 z-[80] h-14 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href={"/"} className="z-40 flex font-semibold">
            cobra<span className="text-green-600">case</span>
          </Link>

          <div className="flex h-full items-center space-x-4">
            {user ? (
              <>
                <Button asChild variant={"ghost"} size={"sm"}>
                  <Link href={"/api/auth/logout"} className={cn()}>
                    Sign out
                  </Link>
                </Button>

                {isAdmin && (
                  <Button asChild variant={"ghost"} size={"sm"}>
                    <Link href={"/dashboard"} className={cn()}>
                      Dashboard
                    </Link>
                  </Button>
                )}

                <Button
                  asChild
                  variant={"default"}
                  size={"sm"}
                  className="hidden items-center gap-1 sm:flex"
                >
                  <Link href={"/configure/upload"} className={cn()}>
                    Create case <ArrowRight className="ml-1.5 size-5" />
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant={"ghost"} size={"sm"}>
                  <Link href={"/api/auth/register"} className={cn()}>
                    Sign up
                  </Link>
                </Button>

                <Button asChild variant={"ghost"} size={"sm"}>
                  <Link href={"/api/auth/login"} className={cn()}>
                    Login
                  </Link>
                </Button>

                <Separator
                  orientation="vertical"
                  className="hidden h-8 w-px bg-zinc-200 sm:block"
                />

                <Button
                  asChild
                  variant={"default"}
                  size={"sm"}
                  className="hidden items-center gap-1 sm:flex"
                >
                  <Link href={"/configure/upload"} className={cn()}>
                    Create case <ArrowRight className="ml-1.5 size-5" />
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
export default Navbar;
