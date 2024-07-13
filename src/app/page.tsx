"use client";
import { AuthProvider } from "@/Context/auth";
import Login from "../components/Login";
export default function Home() {
  return (
    <AuthProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Login></Login>
      </main>
    </AuthProvider>
  );
}
