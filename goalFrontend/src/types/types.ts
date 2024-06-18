export type TaskType = {
  name: string;
  _id: string;
  completed: boolean;
};

export type GoalsType = {
  _id: string;
  name: string;
  miniDescription: string;
  priority?: string;
  description?: string;
  isComplete?: boolean;
};
export type UserInfo = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
};
export type AuthDataResponseType = {
  message: string;
  refreshToken: string;
  accessToken: string;
  userInfo: UserInfo;
};
