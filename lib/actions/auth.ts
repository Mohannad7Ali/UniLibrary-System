"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";
import { headers } from "next/headers";
import { ratelimit } from "../rateLimit";
import { redirect } from "next/navigation";
// import { triggerSignupWorkflow } from "../workflow";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;
  // Add rate limit
  const userIP = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(userIP);
  if (!success) {
    return redirect("/too-fast");
  }
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      return { success: false, error: "singin error" };
    }
    return { success: true };
  } catch (error) {
    console.log(error, "signIn error");
    return { success: false, error: "signIn error" };
  }
};

export const signUp = async (params: AuthCredentials) => {
  const { fullName, email, password, universityId, universityCard } = params;
  // Add rate limit
  const userIP = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(userIP);
  if (!success) {
    return redirect("/too-fast");
  }
  // check if user already exist
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (existingUser.length > 0) {
    return { success: false, error: "User already exists" };
  }
  const duplicatedUid = await db
    .select()
    .from(users)
    .where(eq(users.universityId, universityId))
    .limit(1);
  if (duplicatedUid.length > 0) {
    return { success: false, error: "duplicated university id " };
  }
  const duplicatedEmail = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (duplicatedEmail.length > 0) {
    return {
      success: false,
      error: "duplicated email maybe you already have account try signin ",
    };
  }
  const hashedpassword = await hash(password, 10);
  try {
    await db.insert(users).values({
      fullName,
      email,
      password: hashedpassword,
      universityId,
      universityCard,
    });
    await signInWithCredentials({ email, password });
    // await triggerSignupWorkflow(email);

    return { success: true };
  } catch (error) {
    console.log(error, "signup error");
    return { success: false, error: "signup error" };
  }
};
