"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn, getIntials } from "@/lib/utils";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Session } from "next-auth";
export default function Header({ session }: { session: Session }) {
  const pathName = usePathname();

  return (
    <header className="flex flex-row  justify-between items-center my-10 text-white">
      <Link href="/">
        <div className="text-sm md:text-2xl font-bold flex items-center gap-3 cursor-pointer ">
          <Image src="/icons/logo.svg" alt="Logo" width={50} height={50} />
          UniLibrary
        </div>
      </Link>
      <ul className="flex items-center gap-2 flex-wrap md:gap-8 ">
        {session?.user && (
          <li>
            <Link href="/profile">
              <Avatar>
                <AvatarFallback className="text-gray-400 bg-indigo-900 font-bold text-center flex justify-center items-center">
                  {getIntials(session?.user.name) || "X"}
                </AvatarFallback>
              </Avatar>
            </Link>
          </li>
        )}
        <li>
          <Link
            href="/books"
            className={cn(
              "text-base capitalize cursor-pointer font-bold ",
              pathName === "/" ? "text-light-200" : "text-light-100"
            )}
          >
            Books
          </Link>
        </li>
        <li>
          <Link href="/borrowings">Borrowings</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
      </ul>
    </header>
  );
}
