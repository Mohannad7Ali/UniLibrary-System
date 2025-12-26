"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn, Resolver } from "react-hook-form";
import * as z from "zod";
// import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import Link from "next/link";

// import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { bookSchema } from "@/lib/validations";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";
import ColorPicker from "../ColorPicker";
import { createBook } from "@/lib/actions/admin/book";
import { toast } from "sonner";
import { useState } from "react";
import { LoaderPinwheel } from "lucide-react";

//------------------------------------------------------------------------------------

interface BookFormProps extends Partial<Book> {
  type?: "create" | "update";
}

function BookForm({ type, ...book }: BookFormProps) {
  const form: UseFormReturn<z.infer<typeof bookSchema>> = useForm<
    z.infer<typeof bookSchema>
  >({
    resolver: zodResolver(bookSchema) as Resolver<z.infer<typeof bookSchema>>,
    defaultValues: {
      title: "",
      description: "",
      author: "",
      genre: "",
      coverUrl: "",
      videoUrl: "",
      coverColor: "",
      rating: 1,
      totalCopies: 1,
      summary: "",
    },
  });
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  // const isUpdate = type === "update";
  const handleSubmit = async (values: z.infer<typeof bookSchema>) => {
    setIsCreating(true);
    const result = await createBook(values);
    if (result.success) {
      toast.success(`Book created successfully`);
      setIsCreating(false);

      router.push(`/admin/books/${result.data.id}`);
    } else {
      setIsCreating(false);
      toast.error(result.error as string);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name={"title"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Title
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  required
                  placeholder="Book Title"
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"author"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Author
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  required
                  placeholder="Author"
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"genre"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Genre
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  required
                  placeholder="Book Genre"
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"rating"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                rating
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  required
                  placeholder="Book rating"
                  className="book-form_input"
                  type="number"
                  min={1}
                  max={5}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"totalCopies"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Total Copies
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  required
                  placeholder="Total Copies"
                  className="book-form_input"
                  type="number"
                  min={1}
                  max={10000}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"coverUrl"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Image
              </FormLabel>
              <FormControl>
                <FileUpload
                  type="image"
                  accept="image/*"
                  placeholder="Upload a book cover"
                  variant="light"
                  folder="books/covers"
                  onUpload={(url) => field.onChange(url)}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"coverColor"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Primary Color
              </FormLabel>
              <FormControl>
                <ColorPicker onPickerChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"description"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Book Description"
                  rows={10}
                  {...field}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"videoUrl"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Trailer
              </FormLabel>
              <FormControl>
                <FileUpload
                  type="video"
                  accept="video/*"
                  placeholder="Upload a book trailer"
                  variant="light"
                  folder="books/videos"
                  onUpload={(url) => field.onChange(url)}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"summary"}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book summary
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Book summary"
                  rows={5}
                  {...field}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="book-form_btn text-white"
          disabled={isCreating}
        >
          {isCreating ? (
            <div className="flex items-center gap-4">
              <LoaderPinwheel className="size-4 animate-spin" />
              Creating Book ...
            </div>
          ) : (
            "Add Book to Library"
          )}
        </Button>
      </form>
    </Form>
  );
}
export default BookForm;
