import { Course } from "@/lib/types";

interface CourseListProps {
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
}

export const CourseList: React.FC<CourseListProps> = ({
  courses,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
              Title
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
              Details
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
              Semester
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
              Enroll Status
            </th>
            <th className="px-6 py-3 text-center text-sm font-medium text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {courses?.map((course) => (
            <tr key={course._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {course.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {course.details}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {course.semester} {/* Display semester here */}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {course.enrollStatus} {/* Display semester here */}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-4">
                <button
                  onClick={() => onEdit(course)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(course._id!)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
