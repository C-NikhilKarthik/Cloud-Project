"use client";

import { Navigation } from "@/components/navigation";
import { DashboardHeader } from "@/components/dashboard/header";
import { CourseList } from "@/components/dashboard/course-list";
import { useState, useEffect } from "react";
import axios from "axios";
import { Course, ApiResponse } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { CourseDialog } from "@/components/dashboard/course-dialog";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true); // to track loading state
  const { toast } = useToast();

  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    // console.log(urlParams);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("jwt", token);
      router.replace("/dashboard"); // Clear query parameters from the URL
    } else {
      router.push("/login"); // Redirect to login if token is missing
    }
  }, []);

  // Fetch courses on page load
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true); // Show loading state before fetching

      try {
        const token = localStorage.getItem("jwt"); // Retrieve token from localStorage

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/courses`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Set token in Authorization header
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.status === "success" && data.data) {
            setCourses(data.data);
          }
        } else {
          console.error(
            "Failed to fetch courses:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error while fetching courses:", error);
      } finally {
        setLoading(false); // Hide loading state
      }
    };

    fetchCourses();
  }, []);

  // Add or update a course
  const handleSaveCourse = async (course: Course) => {
    const isEdit = course._id !== undefined; // Check if it's an existing course
    const method = isEdit ? "patch" : "post"; // Use 'patch' for update and 'post' for add
    const url = isEdit
      ? `${process.env.NEXT_PUBLIC_APP_URL}/course/${course._id}`
      : `${process.env.NEXT_PUBLIC_APP_URL}/course`;

    try {
      const token = localStorage.getItem("jwt"); // Retrieve token from localStorage

      const response = await axios[method]<ApiResponse<Course>>(url, course, {
        headers: {
          Authorization: `Bearer ${token}`, // Set token in Authorization header
        },
      });

      if (response.data.status === "success" && response.data.data) {
        if (isEdit) {
          setCourses((prev) =>
            prev.map((c) => (c._id === course._id ? { ...c, ...course } : c))
          );
        } else {
          setCourses((prev) => [...prev, response.data.data]);
        }

        toast({
          title: "Success",
          description: `Course ${isEdit ? "updated" : "created"} successfully`,
        });
        setIsCreateDialogOpen(false); // Close dialog after saving
        setEditingCourse(null); // Close the edit dialog
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEdit ? "update" : "create"} course`,
        variant: "destructive",
      });
    }
  };

  // Delete a course
  const handleDeleteCourse = async (id: string) => {
    try {
      const token = localStorage.getItem("jwt"); // Retrieve token from localStorage

      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_APP_URL}/course/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set token in Authorization header
          },
        }
      );

      if (response.status === 200) {
        setCourses((prev) => prev.filter((course) => course._id !== id));
        toast({
          title: "Success",
          description: "Course deleted successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete course",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <DashboardHeader onCreateClick={() => setIsCreateDialogOpen(true)} />
        <CourseList
          courses={courses}
          onEdit={(course) => setEditingCourse(course)}
          onDelete={handleDeleteCourse}
          loading={loading}
        />
        <CourseDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          course={null}
          onSave={handleSaveCourse} // Use the same function for adding a new course
        />
        {editingCourse && (
          <CourseDialog
            open={!!editingCourse}
            onOpenChange={() => setEditingCourse(null)}
            course={editingCourse}
            onSave={handleSaveCourse} // Use the same function for updating an existing course
          />
        )}
      </main>
    </div>
  );
}
