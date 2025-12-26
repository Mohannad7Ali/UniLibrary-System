// app/admin/books/page.tsx
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Image } from "@imagekit/next";

export default async function AllBooksPage() {
  const allBooks = await db.select().from(books).orderBy(desc(books.createdAt));

  return (
    <div className="bg-white p-7 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-bold italic">All Books</h2>
        <Button className="bg-primary-admin text-white" asChild>
          <Link href="/admin/books/new">+ Add New Book</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Book</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>Copies (Avail/Total)</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allBooks.map((book) => (
            <TableRow key={book.id}>
              <TableCell className="flex items-center gap-3">
                <div className="relative w-10 h-14 overflow-hidden rounded">
                  <Image
                    src={book.coverUrl}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="font-semibold">{book.title}</span>
              </TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell className="capitalize">{book.genre}</TableCell>
              <TableCell>
                <span
                  className={
                    book.availableCopies > 0 ? "text-green-600" : "text-red-600"
                  }
                >
                  {book.availableCopies}
                </span>{" "}
                / {book.totalCopies}
              </TableCell>
              <TableCell>
                {new Date(book.createdAt!).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
