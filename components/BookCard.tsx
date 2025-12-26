import Link from "next/link";
import BookCover from "./BookCover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
const isLoanedBook = false;
const BookCard = ({ book }: { book: Book }) => (
  <li className={cn(isLoanedBook && "xs:w-52 w-full")}>
    <Link
      href={`books/${book.id}`}
      className={cn(isLoanedBook && "w-full flex flex-col items-center")}
    >
      <BookCover
        coverColor={book.coverColor}
        coverUrl={book.coverUrl}
        variant="regular"
      />
      <div className={cn(!isLoanedBook && "xs:max-w-40 max-w-28")}>
        <p className="book-title">{book.title}</p>
        <p className="book-genre">{book.genre}</p>
      </div>

      {isLoanedBook && (
        <div className="mt-3 w-full flex flex-col gap-2">
          <div className="book-loaned">
            <Image
              src="/icons/calendar.svg"
              alt="calender"
              width={18}
              height={18}
              className="object-contain"
            />
            <p className="text-light-100">11 days left to return </p>
          </div>
          <Button className="book-btn">Download receipt</Button>
        </div>
      )}
    </Link>
  </li>
);
export default BookCard;
