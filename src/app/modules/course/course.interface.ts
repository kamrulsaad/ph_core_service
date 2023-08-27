export type ICourseCreateData = {
  title: string;
  code: string;
  credits: number;
  preRequisiteCourses?: IPreRequisiteCourseRequest[];
};

export type ICourseFilterRequest = {
  searchTerm?: string | undefined;
};

export type IPreRequisiteCourseRequest = {
  courseId: string;
  isDeleted?: boolean;
};
