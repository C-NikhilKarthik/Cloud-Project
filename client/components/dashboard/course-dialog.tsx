"use client";

import { useState, useEffect } from "react";
import { Course } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (course: Course) => void;
  course: Course | null;
}

export const CourseDialog: React.FC<CourseDialogProps> = ({
  open,
  onOpenChange,
  onSave,
  course,
}) => {
  // Single state object to manage all fields
  const [formData, setFormData] = useState({
    title: course?.title || "",
    details: course?.details || "",
    semester: course?.semester || 0,
    enrollStatus: course?.enrollStatus || "",
    type: course?.type || "",
  });

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title,
        details: course.details,
        semester: course.semester,
        enrollStatus: course.enrollStatus,
        type: course.type,
      });
    }
  }, [course]);

  const handleChange = (field: string, value: string | number) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSave = () => {
    const { title, details, semester, enrollStatus, type } = formData;
    if (title && details && semester && enrollStatus && type) {
      onSave({
        ...course,
        ...formData,
      });
    }
  };

  return (
    open && (
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-xl font-bold mb-6 text-gray-800">
            {course ? "Edit Course" : "Add New Course"}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Course Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter course title"
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Semester
              </label>
              <input
                type="number"
                value={formData.semester}
                onChange={(e) =>
                  handleChange("semester", Number(e.target.value))
                }
                placeholder="Semester"
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Course Details
              </label>
              <textarea
                value={formData.details}
                onChange={(e) => handleChange("details", e.target.value)}
                placeholder="Enter course details"
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Enrollment Status
              </label>
              <Select
                value={formData.enrollStatus}
                onValueChange={(value) => handleChange("enrollStatus", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-1">
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Course Type
              </label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="elective">Elective</SelectItem>
                  <SelectItem value="theory">Theory</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => onOpenChange(false)}
              className="mr-4 text-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="text-blue-600 font-semibold"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
};
