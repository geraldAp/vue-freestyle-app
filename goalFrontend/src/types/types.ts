export type GoalsType = {
  _id: string;
  name: string;
  miniDescription: string;
  priority?: string;
  description?: string;
  isComplete?:boolean
};

export type AuthDataResponseType = {
  message:string
  refreshToken: string;
  accessToken: string;
  email: string;
};
