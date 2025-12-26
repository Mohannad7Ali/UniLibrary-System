"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache";
interface BorrowBookParams {
  bookId: string;
  userId: string;
}
export const borrowBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;
  try {
    const [book] = await db
      .select()
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);
    console.log("book from server action   ", book);
    if (!book || book.availableCopies <= 0) {
      return {
        success: false,
        error: "No available copies of this book",
      };
    }
    const dueDate = dayjs().add(7, "day").toDate().toDateString();
    const record = await db
      .insert(borrowRecords)
      .values({
        bookId,
        userId,
        dueDate,
        status: "BORROWED",
      })
      .returning();
    await db
      .update(books)
      .set({ availableCopies: book.availableCopies - 1 })
      .where(eq(books.id, bookId));
    revalidatePath("/admin/book-requests");
    return {
      success: true,
      data: record,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "An error occured while borrowing the book",
    };
  }
};
