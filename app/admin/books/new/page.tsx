import BookForm from "@/components/admin/forms/BookForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <section className="w-full py-7 px-14 rounded-2xl bg-indigo-50 border-gray-100">
      <Button
        className="bg-primary-admin text-white transition-transform duration-200 hover:scale-105 hover:bg-primary-admin/90"
        asChild
      >
        <Link href={"/admin/books"}>Go Back</Link>
      </Button>
      <section className="mt-5">
        <BookForm type="create" />
      </section>
    </section>
  );
}
