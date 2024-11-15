import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Users, BookOpen } from "lucide-react";
import { Course, UserType } from "@/lib/types";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export const AllCourses = ({
  courses,
  user,
}: {
  courses: Course[];
  user: UserType | null;
}) => {
  const { toast } = useToast();

  const register = async (id: string) => {
    try {
      const token = localStorage.getItem("jwt");

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_URL}/course/${id}/register`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Course registered successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register course",
        variant: "destructive",
      });
    }
  };

  const getEnrollStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800";
      case "ongoing":
        return "bg-blue-100 text-blue-800";
      case "closed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="">
      <div className="text-2xl font-semibold my-6">All Courses</div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {courses?.map((course, index) => (
          <Card
            key={index}
            className="flex flex-col justify-between border border-gray-200 shadow-sm hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold">
                  {course.title}
                </CardTitle>
                <Badge
                  variant="secondary"
                  className={getEnrollStatusColor(course.enrollStatus)}
                >
                  {course.enrollStatus}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600 font-medium">
                  {course.instructorName || "Unknown Instructor"}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Users className="h-3 w-3 text-gray-500" />
                <span className="text-xs text-gray-600">
                  {course.studentIds?.length || 0} students
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <BookOpen className="h-3 w-3 text-gray-500" />
                <span className="text-xs text-gray-600">
                  {course.type || "Theory"}
                </span>
              </div>
            </CardContent>

            {user?.role === "student" && (
              <CardFooter className="flex items-center justify-between space-x-2 mt-4">
                {!course.studentIds.includes(user.id) ? (
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={() => register(course._id!)}
                  >
                    Register
                  </Button>
                ) : (
                  <Badge variant="default" className="w-full text-center">
                    Registered
                  </Badge>
                )}
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
