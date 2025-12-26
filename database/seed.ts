import { config as dotenvConfig } from "dotenv";
dotenvConfig({ path: ".env.local" });

import dummyBooks from "../dummyBooks.json";
import ImageKit from "imagekit";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { books } from "./schema";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

const sql = neon(process.env.NEON_DATABASE_URL!);
export const db = drizzle(sql);

async function uploadToImageKit(url: string, name: string, folder: string) {
  try {
    const res = await imagekit.upload({
      file: url,
      fileName: name,
      folder: folder,
    });

    console.log(`${name} uploaded successfully`);
    return res.filePath;
  } catch (error) {
    console.error(`Error in uploading ${name}:`, error);
    return null; // لتجنب توقف الحلقة تماماً
  }
}

async function seed() {
  console.log("Seeding Data .......");
  try {
    for (const book of dummyBooks) {
      console.log("uploading assets to imagekit :", book.title, ".......");

      const coverUrl = await uploadToImageKit(
        book.coverUrl,
        `${book.title}.jpg`,
        "books/covers"
      );

      const videoUrl = await uploadToImageKit(
        book.videoUrl,
        `${book.title}.mp4`,
        "books/videos"
      );

      if (coverUrl && videoUrl) {
        console.log(`Inserting ${book.title} in database ....`);
        await db.insert(books).values({
          ...book,
          coverUrl,
          videoUrl,
        });
        console.log(`${book.title} data seeded successfully!`);
      }
    }
    console.log("Data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

seed();
