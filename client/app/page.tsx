import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, BookOpen, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { CourseGrid } from "@/components/course-grid";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="px-4 py-20 md:py-32 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Transform Your Teaching Experience
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Create, manage, and share your courses with our intuitive platform.
            Built for educators who want to focus on teaching, not technology.
          </p>
          <div className="mt-10 flex gap-4 justify-center">
            <Link href="/courses">
              <Button size="lg" className="gap-2">
                Browse Courses <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/auth">
              <Button size="lg" variant="outline">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose LearnHub?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <GraduationCap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Expert Teaching Tools
              </h3>
              <p className="text-gray-600">
                Comprehensive tools designed specifically for course creation
                and management.
              </p>
            </Card>
            <Card className="p-6">
              <BookOpen className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Rich Content Support
              </h3>
              <p className="text-gray-600">
                Create engaging content with support for multiple formats and
                interactive elements.
              </p>
            </Card>
            <Card className="p-6">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Student Management</h3>
              <p className="text-gray-600">
                Easily manage student enrollments, progress tracking, and
                communications.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Featured Courses</h2>
          <CourseGrid />
        </div>
      </section>
    </div>
  );
}
