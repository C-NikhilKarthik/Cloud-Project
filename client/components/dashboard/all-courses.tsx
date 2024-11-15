import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User, Users, BookOpen, GraduationCap } from "lucide-react";
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
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const register = async (id: string) => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_URL}/course/${id}/register`,
        { headers: { Authorization: `Bearer ${token}` } }
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

  const openDialog = (course: Course) => {
    setSelectedCourse(course);
    setDialogOpen(true);
  };

  return (
    <div className="">
      <div className="text-2xl font-semibold my-6">All Courses</div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {courses?.map((course, index) => (
          <Card
            key={index}
            className="flex flex-col justify-between border border-gray-200 shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => openDialog(course)}
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
          </Card>
        ))}
      </div>

      {/* Dialog for Course Details */}
      {selectedCourse && (
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="rounded-lg p-6 shadow-lg bg-white">
            <DialogHeader className="border-b pb-4">
              <div className="flex items-center space-x-3">
                <BookOpen className="h-6 w-6 text-blue-500" />
                <DialogTitle className="text-2xl font-semibold text-gray-800">
                  {selectedCourse.title}
                </DialogTitle>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {selectedCourse.type}
              </p>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Details Section */}
              <div className="flex items-start space-x-4">
                <div>
                  <User className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-800 font-medium">
                    <strong>Instructor:</strong> {selectedCourse.instructorName}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Semester: {selectedCourse.semester}
                  </p>
                </div>
              </div>

              {/* Enrollment Status */}
              <div className="flex items-start space-x-4">
                <div>
                  <GraduationCap className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <Badge
                    className={`px-3 py-1 rounded-full text-sm ${getEnrollStatusColor(
                      selectedCourse.enrollStatus
                    )}`}
                  >
                    {selectedCourse.enrollStatus}
                  </Badge>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>{selectedCourse.studentIds.length}</strong> students
                    registered
                  </p>
                </div>
              </div>

              {/* Course Description */}
              <div className="flex items-start space-x-4">
                <div>
                  <BookOpen className="h-6 w-6 text-gray-500" />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {selectedCourse.details}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            {user?.role === "student" && (
              <div className="mt-6">
                {!selectedCourse.studentIds.includes(user.id) &&
                selectedCourse.enrollStatus !== "closed" ? (
                  <Button
                    variant="default"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => register(selectedCourse._id!)}
                  >
                    Register for this course
                  </Button>
                ) : (
                  <Badge
                    variant="outline"
                    className="w-full justify-center py-2 bg-gray-100 text-gray-800"
                  >
                    Registered
                  </Badge>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AllCourses;
