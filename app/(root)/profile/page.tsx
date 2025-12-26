import { auth, signOut } from "@/auth";
import Booklist from "@/components/BookList";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";

import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  const myBooks = await db
    .select({
      id: books.id,
      title: books.title,
      author: books.author,
      genre: books.genre,
      rating: books.rating,
      totalCopies: books.totalCopies,
      availableCopies: books.availableCopies,
      description: books.description,
      coverColor: books.coverColor,
      coverUrl: books.coverUrl,
      videoUrl: books.videoUrl,
      summary: books.summary,
      createdAt: books.createdAt,
    })
    .from(borrowRecords)
    .innerJoin(books, eq(borrowRecords.bookId, books.id))
    .where(eq(borrowRecords.userId, session.user.id));
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
        books={myBooks}
        containerClassName="mt-28"
      />
    </div>
  );
}
