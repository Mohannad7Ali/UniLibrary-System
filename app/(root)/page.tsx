import BookOverview from "@/components/BookOverview";
import Booklist from "@/components/BookList";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";

export default async function Home() {
  const latestBook = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt))) as Book[];
  return (
    <div>
      <BookOverview book={latestBook[0]} />
      <Booklist
        title="Latest Books"
        books={latestBook}
        containerClassName="mt-28"
      />
    </div>
  );
}
