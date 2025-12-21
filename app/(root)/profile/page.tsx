import { signOut } from "@/auth";
import Booklist from "@/components/BookList";
import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constants";
import { redirect } from "next/navigation";

export default function Page() {
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signOut();
          redirect("/sign-in");
        }}
      >
        <Button type="submit">Logout</Button>
      </form>
      <Booklist
        title="My Borrowed Books"
        books={sampleBooks}
        containerClassName="mt-28"
      />
    </div>
  );
}
