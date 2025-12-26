// app/admin/borrow-requests/page.tsx
import { db } from "@/database/drizzle";
import { borrowRecords, books, users } from "@/database/schema";
import { eq, desc } from "drizzle-orm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function BorrowRequestsPage() {
  // عمل Join لجلب بيانات المستخدم والكتاب مع كل سجل استعارة
  const requests = await db
    .select({
      id: borrowRecords.id,
      userName: users.fullName,
      bookTitle: books.title,
      borrowDate: borrowRecords.borrowDate,
      dueDate: borrowRecords.dueDate,
      status: borrowRecords.status,
    })
    .from(borrowRecords)
    .innerJoin(users, eq(borrowRecords.userId, users.id))
    .innerJoin(books, eq(borrowRecords.bookId, books.id))
    .orderBy(desc(borrowRecords.createdAt));

  return (
    <div className="bg-white p-7 rounded-2xl shadow-sm">
      <h2 className="text-2xl font-bold mb-10">Borrow Requests</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Book Title</TableHead>
            <TableHead>Borrow Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((req) => (
            <TableRow key={req.id}>
              <TableCell className="font-semibold">{req.userName}</TableCell>
              <TableCell>{req.bookTitle}</TableCell>
              <TableCell>
                {new Date(req.borrowDate).toLocaleDateString()}
              </TableCell>
              <TableCell>{req.dueDate}</TableCell>
              <TableCell>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    req.status === "BORROWED"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {req.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
