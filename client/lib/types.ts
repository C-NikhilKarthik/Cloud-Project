export interface Course {
  _id?: string;
  title: string;
  details: string;
  semester: number;
  enrollStatus: string;
  type: string;
  instructorName: string;
  studentIds: string[];
}

export interface ApiResponse<T> {
  status: string;
  data?: T;
  message?: string;
  results?: number;
}

export interface UserType {
  id: string;
  role: string;
  email: string;
  name: string;
  avatar: string;
}
