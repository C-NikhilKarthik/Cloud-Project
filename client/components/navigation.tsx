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
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { useEffect, useState } from "react";
import axios from "axios";

export function Navigation() {
  const router = useRouter(); // Get the router instance

  const handleLogout = async () => {
    localStorage.clear();
    setUser(null);
    router.push("/");
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("jwt"); // Retrieve token from localStorage

        // Axios request
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_APP_URL}/auth/details`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in Authorization header
            },
          }
        );

        // Fetch request
        let d = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/auth/details`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in Authorization header
          },
        });
        d = await d.json();

        console.log(d);

        if (response.data.status === "success" && response.data.data) {
          setUser(response.data.data);
        }
      } catch (error) {
        console.log(error); // Log any errors
      }
    };

    fetchCourses();
  }, []);

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
              <Link href="/dashboard" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {user ? (
          <div className="ml-auto flex items-center gap-4">
            <Image
              className="w-10 h-10 rounded-full"
              alt="profile"
              src={user?.avatar}
              sizes="100%"
              height={0}
              width={0}
            />
            <div className="">
              <div className="leading-[1]">{user?.name}</div>
              <div className="text-xs text-slate-700">{user?.email}</div>
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
