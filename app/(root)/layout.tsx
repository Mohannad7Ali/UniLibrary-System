import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <main className="root-container">
      <div className=" max-w-7xl">
        <Header />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
}
