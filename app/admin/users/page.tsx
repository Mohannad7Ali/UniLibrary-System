// app/admin/users/page.tsx
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { desc } from "drizzle-orm";

export default async function AllUsersPage() {
  const allUsers = await db.select().from(users).orderBy(desc(users.createdAt));

  return (
    <div className="bg-white p-7 rounded-2xl shadow-sm">
      <h2 className="text-2xl font-bold mb-10">All Users</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>University ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.universityId}</TableCell>
              <TableCell>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    user.status === "ARRPOVED"
                      ? "bg-green-100 text-green-700"
                      : user.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {user.status}
                </span>
              </TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
