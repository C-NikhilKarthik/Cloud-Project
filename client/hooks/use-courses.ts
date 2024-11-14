"use client";

import axios from "axios";
import { Course, ApiResponse } from "@/lib/types";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { parseCookies } from "nookies";

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [change, setChanges] = useState(0);
  const { toast } = useToast();

  const fetchCourses = async () => {
    const cookies = parseCookies(); // Get cookies correctly
    const token = cookies?.token; // Adjust according to the token cookie name

    try {
      const response = await axios.get<ApiResponse<Course[]>>(
        `${process.env.NEXT_PUBLIC_APP_URL}/course`,
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
    fetchCourses();
  }, [change]);

  const addCourse = async (course: Omit<Course, "_id">) => {
    try {
      const response = await axios.post<ApiResponse<Course[]>>(
        `${process.env.NEXT_PUBLIC_APP_URL}/course`,
        course,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data.data);

      if (response.data.status === "success" && response.data.data) {
        setCourses([...courses, response.data.data]);
        console.log(courses);
        setChanges((prev) => prev + 1);
        toast({
          title: "Success",
          description: "Course created successfully",
        });
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
    try {
      const response = await axios.patch(`/course/${id}`, updatedCourse, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setCourses(
          courses.map((course) =>
            course._id === id ? { ...course, ...updatedCourse } : course
          )
        );
        toast({
          title: "Success",
          description: "Course updated successfully",
        });
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
    try {
      const response = await axios.delete<ApiResponse<Course[]>>(
        `${process.env.NEXT_PUBLIC_APP_URL}/course/${id}`
      );
      if (response.status === 200) {
        setCourses(courses.filter((course) => course._id !== id));
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

  return {
    courses,
    loading,
    addCourse,
    updateCourse,
    deleteCourse,
  };
}
