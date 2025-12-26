import { auth } from "@/auth";
import BookOverview from "@/components/BookOverview";
import BookVideo from "@/components/BookVideo";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function BookDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const bookId = (await params).id;
  const [book] = await db
    .select()
    .from(books)
    .where(eq(books.id, bookId))
    .limit(1);
  if (!book) {
    notFound();
  }
  return (
    <>
      <BookOverview book={book} userId={session.user?.id as string} />
      <div className="book-details">
        <div className="flex-[1.5]">
          <section className="flex flex-col gap-7">
            <h3>Tariler</h3>
            <BookVideo videoUrl={book.videoUrl} />
          </section>
          <section className="mt-10 flex flex-col gap-7">
            <h3>Summary</h3>
            <div className="space-y-5 text-xl text-light-100">
              {book.summary.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </section>
        </div>
        {/**similar books */}
      </div>
    </>
  );
}
