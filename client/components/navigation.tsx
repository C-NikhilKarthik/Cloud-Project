"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { GraduationCap } from "lucide-react";
import Link from "next/link";
import jwt from "jsonwebtoken";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

function Decode(token: string | undefined) {
  if (!token) return null; // Return null if no token is provided

  try {
    // Decode the JWT token safely without verifying it (for client-side)
    const decoded = jwt.decode(token);

    // Ensure the decoded token is an object and has the expected properties
    if (decoded && typeof decoded === "object") {
      return decoded;
    }
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }

  return null; // Return null if the decoding fails
}

export function Navigation({ token }: { token?: string }) {
  const values = Decode(token);
  const router = useRouter(); // Get the router instance

  const handleLogout = () => {
    // Remove JWT token from cookies
    document.cookie = "jwt=; path=/; max-age=0"; // Clear the JWT cookie

    // Redirect to the homepage after logging out
    router.push("/"); // Redirect to the homepage
  };

  return (
    <div className="border-b bg-white">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-lg"
        >
          <GraduationCap className="h-6 w-6" />
          LearnHub
        </Link>
        <NavigationMenu className="mx-6">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/courses" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Courses
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/dashboard" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {values?.name ? (
          <div className="ml-auto flex items-center gap-4">
            <Image
              className="w-10 h-10 rounded-full"
              alt="profile"
              src={values?.avatar}
              sizes="100%"
              height={0}
              width={0}
            />
            <div className="">
              <div className="leading-[1]">{values?.name}</div>
              <div className="text-xs text-slate-700">{values?.email}</div>
            </div>
            <Button variant="ghost" onClick={handleLogout}>
              Logout
            </Button>{" "}
            {/* Logout button */}
          </div>
        ) : (
          <div className="ml-auto flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
