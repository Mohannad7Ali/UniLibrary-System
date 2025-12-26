"use server";

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { revalidatePath } from "next/cache";

export const createBook = async (params: BookParams) => {
  try {
    const newBook = await db
      .insert(books)
      .values({
        ...params,
        availableCopies: params.totalCopies,
      })
      .returning();
    revalidatePath("/admin/books");
    revalidatePath("/");
    return {
      success: true,
      // data: JSON.parse(JSON.stringify(newBook[0])),
      data: newBook[0],
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "An error occurred while creating the book",
    };
  }
};
