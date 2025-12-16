import { ReactNode } from "react";
import Header from "@/components/layout/Header";
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
}
