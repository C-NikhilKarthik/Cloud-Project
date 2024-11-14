export interface Course {
  _id?: string;
  title: string;
  details: string;
  semester: number;
  enrollStatus: string;
  type: string;
}

export interface ApiResponse<T> {
  status: string;
  data?: T;
  message?: string;
  results?: number;
}
