"use client";
import { adminSideBarLinks } from "@/constants";
import { cn, getIntials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ session }: { session: Session }) => {
  const pathName = usePathname();
  return (
    <div className="admin-sidebar border-gray-100 rounded-2xl">
      <div>
        <Link href={`/`}>
          <div className="logo">
            <Image
              src="/icons/admin/logo.svg"
              alt="logo"
              width={37}
              height={37}
            />
            <h1>UniLibrary</h1>
          </div>
        </Link>
        <div className="mt-10 flex flex-col gap-5">
          {adminSideBarLinks.map((link) => {
            const isSelected =
              link.route === pathName &&
              pathName.includes(link.route) &&
              link.route.length > 1;
            return (
              <Link href={link.route} key={link.route}>
                <div
                  className={cn(
                    "link transition-all duration-500",
                    isSelected && "bg-primary-admin shadow-sm scale-105"
                  )}
                  style={{
                    boxShadow: isSelected
                      ? "0 4px 20px 0 rgba(80, 72, 229, 0.15)"
                      : undefined,
                  }}
                >
                  <Image
                    src={link.img}
                    alt={link.text}
                    width={24}
                    height={24}
                    className={`${
                      isSelected ? "brightness-0 invert" : ""
                    } object-contain transition-all duration-300`}
                  />
                  <p className={cn(isSelected ? "text-white" : "text-dark")}>
                    {link.text}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-between py-2 rounded-4xl user ">
        <Link href="/profile">
          <Avatar className="w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-500 to-sky-400 shadow-lg flex items-center justify-center border-2 border-white hover:scale-105 transition-transform duration-200">
            <AvatarFallback className="w-full h-full flex items-center justify-center text-white font-bold text-xl tracking-wide bg-transparent">
              {getIntials(session?.user.name) || "X"}
            </AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex flex-col  ml-2 max-md:hidden">
          <p className="font-semibold text-dark-200">{session?.user?.name}</p>
          <p className="text-light-500 text-xs">{session?.user?.email}</p>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
