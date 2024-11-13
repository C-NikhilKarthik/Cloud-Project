"use client";

import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap } from "lucide-react";
import Link from "next/link";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter(); // Get the router instance

  // Function to check if JWT token exists and decode it
  const checkTokenAndRedirect = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (token) {
      try {
        const decoded = jwt.decode(token);
        if (decoded) {
          // If the token is valid, redirect to the dashboard
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  };

  // Call checkTokenAndRedirect when the component mounts
  useEffect(() => {
    checkTokenAndRedirect();
  }, []);

  const googleAuth = () => {
    window.open(
      `${process.env.NEXT_PUBLIC_APP_URL}/auth/google/callback`,
      "_self"
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <GraduationCap className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Sign in to your LearnHub account</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  required
                />
              </div>
              <Button className="w-full" type="submit">
                Sign In
              </Button>
            </div>
          </form>

          <div className="mt-4 text-center text-sm">
            <button
              className="bg-slate-100 hover:bg-white w-full flex justify-center text-black font-semibold py-2 px-4 rounded-lg transition-colors duration-200 items-center gap-2"
              onClick={googleAuth}
            >
              <FcGoogle />
              Sign in with Google
            </button>
            <span className="text-gray-600">Don&apos;t have an account? </span>
            <Link
              href="/auth/register"
              className="text-primary hover:underline"
            >
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
