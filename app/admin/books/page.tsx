import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <section className="w-full p-7 rounded-2xl bg-white">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Books</h2>
        <Button
          className="bg-primary-admin text-white transition-transform duration-200 hover:scale-105 hover:bg-primary-admin/90"
          asChild
        >
          <Link href={"/admin/books/new"}>Create a New Book</Link>
        </Button>
      </div>
      <div className="mt-7 w-full overflow-hidden">
        <p>table</p>
      </div>
    </section>
  );
}
