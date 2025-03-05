"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    login({ usr: email, pwd: password })
      .then((res) => {
        router.push('/dashboard')
      })
      .catch((error) => {
        setError(error.message || "Login failed");
      });
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <Card className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-center">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-4">Log in to your account</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /> {error && <p className="text-red-500 text-start">Username or Password is incorrect</p>}
          <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-gray-900"
            disabled={loading}
          >

            {loading ? "Logging in..." : "Log In"}
          </Button>
        </form>

        <p className="mt-4 text-center text-gray-500">
          Don&apos;t have an account? <Link href="/register" className="text-blue-500">Register</Link>
        </p>
      </Card>
    </div>
  );
}
