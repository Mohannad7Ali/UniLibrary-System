"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
export default function Header() {
  const pathName = usePathname();
  return (
    <header className="flex flex-row  items-center gap-20 my-10 text-white">
      <Link href="/">
        <div className="text-2xl font-bold flex items-center gap-3 cursor-pointer ">
          <Image src="/icons/logo.svg" alt="Logo" width={50} height={50} />
          UniLibrary
        </div>
      </Link>
      <ul className="flex items-center gap-8">
        <li>
          <Link
            href="/books"
            className={cn(
              "text-base capitalize cursor-pointer font-bold",
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
