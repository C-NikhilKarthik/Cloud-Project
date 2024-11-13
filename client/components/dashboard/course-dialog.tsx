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
  // Initialize state variables for each course field
  const [name, setName] = useState(course?.title || ""); // Use `title` instead of `name` to match the course property
  const [description, setDescription] = useState(course?.details || ""); // Use `details` instead of `description`
  const [semester, setSemester] = useState(course?.semester || 0); // Add semester field
  const [status, setStatus] = useState(course?.enrollStatus || ""); // Add status field

  // Update state when the course changes
  useEffect(() => {
    if (course) {
      setName(course.title);
      setDescription(course.details);
      setSemester(course.semester);
      setStatus(course.enrollStatus);
    }
  }, [course]);

  // Handle save action
  const handleSave = () => {
    if (name && description && semester && status) {
      onSave({
        ...course, // Retain existing course data
        title: name, // Update with new name
        details: description, // Update with new details
        semester: semester, // Update with new semester
        enrollStatus: status, // Update with new status
      });
    }
  };

  return (
    open && (
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-md flex flex-col gap-4 w-96">
          <h2 className="text-lg font-semibold">
            {course ? "Edit Course" : "Add New Course"}
          </h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Course Title"
            className="p-2 border rounded-md w-full"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Course Details"
            className="p-2 border rounded-md w-full"
          />
          <input
            type="number"
            value={semester}
            onChange={(e) => setSemester(Number(e.target.value))}
            placeholder="Semester"
            className="p-2 border rounded-md w-full"
          />

          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="ongoing">Ongoing</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>

          <div className="mt-4 flex justify-end">
            <button
              onClick={() => onOpenChange(false)}
              className="mr-4 text-gray-600"
            >
              Cancel
            </button>
            <button onClick={handleSave} className="text-blue-600">
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
};
