import Image from "next/image";
import { Button } from "./ui/button";
import BookCover from "./BookCover";

export default function BookOverview({ book }: { book: Book }) {
  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1>{book.title}</h1>
        <div className="book-info flex gap-4">
          <p>
            By{" "}
            <span className="font-semibold text-light-200">{book.author}</span>
          </p>
          <p>
            Category{" "}
            <span className="font-semibold text-light-200">{book.genre}</span>
          </p>
          <div className="flex gap-1">
            <Image src="/icons/star.svg" alt="star" width={22} height={22} />
            <p>{book.rating}</p>
          </div>
        </div>
        <div className="book-copies flex gap-2">
          <p>
            total Books:{" "}
            <span className="font-semibold text-light-200">
              {book.totalCopies}
            </span>
          </p>
          <p>
            Available Books:{" "}
            <span className="font-semibold text-light-200">
              {" "}
              {book.availableCopies}
            </span>
          </p>
        </div>
        <p className="book-description">{book.description}</p>
        <Button className="book-overview_btn">
          <Image src="/icons/book.svg" alt="book" width={20} height={20} />
          <p className="font-bebas-neue text-xl text-dark-100 ">Borrow</p>
        </Button>
      </div>
      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            coverUrl={book.coverUrl}
            coverColor={book.coverColor}
          />
          <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
            <BookCover
              variant="wide"
              coverUrl={book.coverUrl}
              coverColor={book.coverColor}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
