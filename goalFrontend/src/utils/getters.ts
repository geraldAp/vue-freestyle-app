import authFetch from "@/axios";
import type { GoalsType } from "@/types/types";

export const getGoals = async (): Promise<GoalsType[]> => {
  try {
    const res = await authFetch("/goals");
    console.log("response 1", res);
    return res.data;
  } catch (error: any) {
    console.error(error.response.message);
    throw error.response.message;
  }
};
export const getGoal = async (id: string): Promise<GoalsType> => {
  try {
    const res = await authFetch(`/goals/${id}`);
    console.log(" goal response :", res);
    return res.data;
  } catch (error: any) {
    console.error(error.response.message);
    throw error.response.message;
  }
};
interface Task {
  _id:string
  name: string;
}
export const geTasks = async (id: string): Promise<Task[]> => {
  try {
    const res = await authFetch(`/goals/${id}/tasks`);
    console.log("Task response: ", res);
    return res.data;
  } catch (error: any) {
    console.error(error.response.message);
    throw error.response.message;
  }
};
