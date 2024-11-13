"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import { Course, ApiResponse } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface CourseContextType {
  courses: Course[];
  loading: boolean;
  fetchCourses: () => Promise<void>;
  addCourse: (course: Omit<Course, "_id">) => Promise<void>;
  updateCourse: (id: string, course: Course) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchCourses = async () => {
    const cookies = parseCookies();
    const token = cookies?.token;

    setLoading(true); // Set loading state before fetching
    try {
      const response = await axios.get<ApiResponse<Course[]>>(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/courses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success" && response.data.data) {
        setCourses(response.data.data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch courses",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(); // Fetch courses when component mounts
  }, []);

  const addCourse = async (course: Omit<Course, "_id">) => {
    const cookies = parseCookies();
    const token = cookies?.token;

    try {
      const response = await axios.post<ApiResponse<Course>>(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/courses`,
        course,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success" && response.data.data) {
        setCourses((prev) => [...prev, response.data.data]);
        toast({
          title: "Success",
          description: "Course created successfully",
        });

        // Fetch the updated list of courses
        await fetchCourses();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create course",
        variant: "destructive",
      });
    }
  };

  const updateCourse = async (id: string, updatedCourse: Course) => {
    const cookies = parseCookies();
    const token = cookies?.token;

    try {
      const response = await axios.patch<ApiResponse<Course>>(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${id}`,
        updatedCourse,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        setCourses((prev) =>
          prev.map((course) =>
            course._id === id ? { ...course, ...updatedCourse } : course
          )
        );
        toast({
          title: "Success",
          description: "Course updated successfully",
        });

        // Fetch the updated list of courses
        await fetchCourses();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update course",
        variant: "destructive",
      });
    }
  };

  const deleteCourse = async (id: string) => {
    const cookies = parseCookies();
    const token = cookies?.token;

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/courses/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setCourses((prev) => prev.filter((course) => course._id !== id));
        toast({
          title: "Success",
          description: "Course deleted successfully",
        });

        // Fetch the updated list of courses
        await fetchCourses();
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
    <CourseContext.Provider
      value={{
        courses,
        loading,
        fetchCourses, // Make fetchCourses available to other components
        addCourse,
        updateCourse,
        deleteCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error("useCourses must be used within a CourseProvider");
  }
  return context;
}
