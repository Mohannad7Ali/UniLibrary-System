import {
  integer,
  text,
  pgTable,
  uuid,
  varchar,
  pgEnum,
  date,
  timestamp,
} from "drizzle-orm/pg-core";
export const STATUS_ENUM = pgEnum("status", [
  "PENDING",
  "ARRPOVED",
  "REJECTED",
]);
export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);
export const BORROW_STATUS_ENUM = pgEnum("borrow_status", [
  "BORROWED",
  "RETURNED",
]);

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().unique().defaultRandom(),
  fullName: varchar("full_name", { length: 255 }).notNull(), // always use nake case (full_name) with databases
  email: text("email").notNull().unique(),
  universityId: integer("university_id").notNull().unique(),
  password: text("password").notNull(),
  universityCard: text("university_card").notNull(),
  status: STATUS_ENUM("status").default("PENDING"),
  role: ROLE_ENUM("role").default("USER"),
  lastActivityDate: date("last_activity_date").defaultNow(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
});
export const books = pgTable("books", {
  id: uuid("id").notNull().primaryKey().unique().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(), // always use nake case (full_name) with databases
  author: varchar("author", { length: 255 }).notNull(),
  rating: integer("rating").notNull(),
  genre: text("genre").notNull(),
  coverUrl: text("cover_url").notNull(),
  videoUrl: text("video_url").notNull(),
  description: text("description").notNull(),
  summary: text("summary").notNull(),
  coverColor: varchar("cover_color", { length: 7 }).notNull(), // always use nake case (full_name) with databases
  totalCopies: integer("total_copies").notNull().default(1),
  availableCopies: integer("available_copies").notNull().default(1),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
});
export const borrowRecords = pgTable("borrow_records", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  bookId: uuid("book_id")
    .references(() => books.id)
    .notNull(),
  borrowDate: timestamp("borrow_date", { withTimezone: true })
    .defaultNow()
    .notNull(),
  dueDate: date("due_date").notNull(),
  returnDate: date("return_date"),
  status: BORROW_STATUS_ENUM("status").default("BORROWED").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
