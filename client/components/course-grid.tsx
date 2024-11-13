"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users } from "lucide-react";

const SAMPLE_COURSES = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    description:
      "Learn the basics of web development with HTML, CSS, and JavaScript",
    instructor: "Sarah Johnson",
    duration: "8 weeks",
    students: 234,
    category: "Programming",
    image:
      "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&q=80&w=400&h=300",
  },
  {
    id: 2,
    title: "Digital Marketing Essentials",
    description:
      "Master the core concepts of digital marketing and social media",
    instructor: "Michael Chen",
    duration: "6 weeks",
    students: 189,
    category: "Marketing",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400&h=300",
  },
  {
    id: 3,
    title: "Data Science Basics",
    description: "Introduction to data analysis and machine learning concepts",
    instructor: "Emily Rodriguez",
    duration: "10 weeks",
    students: 156,
    category: "Data Science",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400&h=300",
  },
];

export function CourseGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {SAMPLE_COURSES.map((course) => (
        <Card key={course.id} className="overflow-hidden">
          <CardHeader className="p-0">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-xl mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  by {course.instructor}
                </p>
              </div>
              <Badge>{course.category}</Badge>
            </div>
            <p className="text-gray-600 text-sm mb-4">{course.description}</p>
            <div className="flex gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {course.duration}
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {course.students} students
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-6 pt-0">
            <Button className="w-full">View Course</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
