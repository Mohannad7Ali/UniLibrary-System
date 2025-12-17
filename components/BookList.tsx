import BookCard from "./BookCard";

interface Props {
  title: string;
  books: Book[];
  containerClassName?: string;
}
export default function Booklist({ title, containerClassName, books }: Props) {
  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>
      <ul className="flex gap-16 flex-wrap">
        {books.map((book: Book) => {
          return <BookCard key={book.title} book={book} />;
        })}
      </ul>
    </section>
  );
}
