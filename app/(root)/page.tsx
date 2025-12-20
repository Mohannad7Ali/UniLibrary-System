import BookOverview from "@/components/BookOverview";
import Booklist from "@/components/BookList";
import { sampleBooks } from "@/constants";

export default async function Home() {
  return (
    <div>
      <BookOverview book={sampleBooks[0]} />
      <Booklist
        title="Latest Books"
        books={sampleBooks}
        containerClassName="mt-28"
      />
    </div>
  );
}
