"use client";
import AuthForm from "@/components/AuthForm";
import { signInSchema } from "@/lib/validations";

export default function SignIn() {
  return (
    <AuthForm
      type="signin"
      schema={signInSchema}
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={async () => {
        console.log("sing in ");
        return { success: true };
      }}
    />
  );
}
