import authFetch from "@/axios";
import type { GoalsType, TaskType } from "@/types/types";

export const getGoals = async (status?: string,page: number = 1, limit: number = 10): Promise<GoalsType[]> => {
  try {
    const res = await authFetch("/goals", { params: { status,page, limit  } });
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

export const getTasks = async (id: string): Promise<TaskType[]> => {
  try {
    const res = await authFetch(`/goals/${id}/tasks`);
    console.log("Task response: ", res);
    return res.data;
  } catch (error: any) {
    console.error(error.response.message);
    throw error.response.message;
  }
};
