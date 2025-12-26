import { db } from "@/database/drizzle";
import { books, users, borrowRecords } from "@/database/schema";
import { count, eq, desc } from "drizzle-orm";
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
import { Book, Users, ClipboardList, AlertCircle } from "lucide-react";

export default async function AdminDashboard() {
  // 1. جلب الإحصائيات (Stats)
  const [totalBooks] = await db.select({ value: count() }).from(books);
  const [totalUsers] = await db.select({ value: count() }).from(users);
  const [activeBorrows] = await db
    .select({ value: count() })
    .from(borrowRecords)
    .where(eq(borrowRecords.status, "BORROWED"));
  const [pendingUsers] = await db
    .select({ value: count() })
    .from(users)
    .where(eq(users.status, "PENDING"));

  // 2. جلب أحدث سجلات الاستعارة
  const recentActivity = await db
    .select({
      id: borrowRecords.id,
      userName: users.fullName,
      bookTitle: books.title,
      status: borrowRecords.status,
      date: borrowRecords.createdAt,
    })
    .from(borrowRecords)
    .innerJoin(users, eq(borrowRecords.userId, users.id))
    .innerJoin(books, eq(borrowRecords.bookId, books.id))
    .orderBy(desc(borrowRecords.createdAt))
    .limit(5);

  return (
    <div className="space-y-10">
      {/* القسم الأول: إحصائيات سريعة */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Books"
          value={totalBooks.value}
          icon={<Book className="text-blue-600" />}
          color="bg-blue-50"
        />
        <StatCard
          title="Total Users"
          value={totalUsers.value}
          icon={<Users className="text-purple-600" />}
          color="bg-purple-50"
        />
        <StatCard
          title="Active Borrows"
          value={activeBorrows.value}
          icon={<ClipboardList className="text-orange-600" />}
          color="bg-orange-50"
        />
        <StatCard
          title="Pending Approvals"
          value={pendingUsers.value}
          icon={<AlertCircle className="text-red-600" />}
          color="bg-red-50"
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* القسم الثاني: أحدث النشاطات */}
        <section className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-light-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold italic">Recent Activity</h3>
            <Button variant="outline" asChild>
              <Link href="/admin/borrow-requests">View All</Link>
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Book</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivity.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.userName}</TableCell>
                  <TableCell className="text-light-500">
                    {log.bookTitle}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-bold ${
                        log.status === "BORROWED"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {log.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        {/* القسم الثالث: إجراءات سريعة */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-light-300">
          <h3 className="text-xl font-bold mb-6 italic">Quick Actions</h3>
          <div className="flex flex-col gap-4">
            <Button
              className="w-full justify-start gap-2 bg-primary-admin"
              asChild
            >
              <Link href="/admin/books/new">Add a New Book</Link>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 border-primary-admin text-primary-admin"
              asChild
            >
              <Link href="/admin/users">Review Pending Users</Link>
            </Button>
            <div className="mt-4 p-4 bg-light-200 rounded-xl">
              <p className="text-sm text-light-500">
                💡 نصيحة: تأكد من مراجعة طلبات الاستعارة المتأخرة يومياً للحفاظ
                على مخزون الكتب.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// مكون فرعي للبطاقات (Sub-component)
function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-light-300 flex items-center justify-between">
      <div>
        <p className="text-light-500 text-sm font-medium">{title}</p>
        <h4 className="text-3xl font-bold mt-1">{value}</h4>
      </div>
      <div className={`p-4 rounded-xl ${color}`}>{icon}</div>
    </div>
  );
}
