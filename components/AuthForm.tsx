"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormReturn,
  Resolver,
  Path, // استيراد الـ Resolver مهم جداً هنا
} from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import ImageUpload from "./auth/ImageUpload";

// 1. استخدام z.Schema<T> هو الخيار الأكثر أماناً وتوافقاً مع Generics
interface AuthFormProps<T extends FieldValues> {
  type: "signin" | "signup";
  schema: z.Schema<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }> | null;
}

function AuthForm<T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: AuthFormProps<T>) {
  // 2. الحل السحري: استخدام 'as unknown as Resolver<T>'
  // هذا يخبر TypeScript: "أنا أعرف أن هذا الـ Resolver متوافق مع T، لا داعي للتدقيق الداخلي"
  // وبما أننا استخدمنا unknown أولاً، فلن يشتكي الـ Linter من وجود any.
  const form: UseFormReturn<T> = useForm<T>({
    resolver: zodResolver(schema) as unknown as Resolver<T>,
    defaultValues: defaultValues as DefaultValues<T>,
  });
  const isSignIn = type === "signin";
  const handleSubmit: SubmitHandler<T> = async (data) => {
    await onSubmit(data);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn
          ? "Welcome back to UniLibrary"
          : "Create your library account"}
      </h1>
      <p className="text-light-100">
        {isSignIn
          ? "Access the vast collection of resources, and stay updated"
          : "Please complete all fields and upload a valid university ID to gain access to the library"}
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {Object.keys(defaultValues).map((field) => {
            return (
              <FormField
                key={field}
                control={form.control}
                name={field as Path<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                    </FormLabel>
                    <FormControl>
                      {field.name === "universityCard" ? (
                        <ImageUpload />
                      ) : (
                        <Input
                          required
                          type={
                            FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                          }
                          {...field}
                          className="form-input bg-gray-700"
                        />
                      )}
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}

          <Button type="submit">{isSignIn ? "Sign In" : "Sign Up"}</Button>
        </form>
      </Form>
      <p className="text-center text-base font-medium">
        {isSignIn ? "New to UniLibrary? " : "Already have an account? "}

        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-bold text-primary"
        >
          {isSignIn ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </div>
  );
}
export default AuthForm;
