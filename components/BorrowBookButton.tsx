"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { borrowBook } from "@/lib/actions/book";
import { Loader, LoaderPinwheel, LoaderPinwheelIcon } from "lucide-react";
interface Props {
  bookId: string;
  userId: string;
  borrowingEligibility: {
    isEligible: boolean;
    message: string;
    isBorrowed: boolean;
  };
}
const BorrowBookButton = ({ bookId, userId, borrowingEligibility }: Props) => {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState<boolean>(false);
  const handleBorrow = async () => {
    console.log(borrowingEligibility);
    if (!borrowingEligibility.isEligible) {
      toast("Error", { description: borrowingEligibility.message });
      return;
    }
    if (borrowingEligibility.isBorrowed) {
      toast("Error", { description: "Actually you borrowed this book" });
      return;
    }
    setBorrowing(true);
    try {
      const result = await borrowBook({ bookId, userId });
      if (result.success) {
        toast("success", { description: "Book Borrowed successfully" });
        router.push("/profile");
      } else {
        toast("Error", { description: "Borrowed Failed" });
      }
    } catch (error) {
      console.error(error);
      toast("Error", { description: "Borrowed Failed" });
    } finally {
      setBorrowing(false);
    }
  };
  return (
    <Button
      className="book-overview_btn"
      onClick={handleBorrow}
      disabled={borrowing}
    >
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />
      <div className="font-bebas-neue text-xl text-dark-100 ">
        {borrowing ? (
          <div className="flex items-center gap-4">
            <Loader className="size-4 animate-spin" />
            Borrowing...
          </div>
        ) : (
          "Borrow Book"
        )}
      </div>
    </Button>
  );
};

export default BorrowBookButton;
