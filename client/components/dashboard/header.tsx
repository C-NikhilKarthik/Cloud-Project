import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface DashboardHeaderProps {
  onCreateClick: () => void;
  role: string | undefined;
}

export function DashboardHeader({ onCreateClick, role }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold">Course Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage your courses and content</p>
      </div>
      {role === "teacher" && (
        <Button onClick={onCreateClick} className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Create Course
        </Button>
      )}
    </div>
  );
}
