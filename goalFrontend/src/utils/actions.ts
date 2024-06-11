/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import type { AuthDataResponseType, GoalsType } from "./../types/types";
import { useAuthStore } from "@/stores/counter";
import { useToast } from "@/components/ui/toast/use-toast";
import authFetch from "@/axios";

export const signUpHandler = async (
  firstName: string,
  lastName: string,
  userName: string,
  email: string,
  password: string
) => {
  try {
    console.log("Attempting to sign up with email:", email); // Debug statement
    const data = {
      firstName,
      lastName,
      userName,
      email,
      password,
    };
    const res = await axios.post(
      "http://localhost:8080/api/v1/auth/sign-up",
      data
    );

    console.log("Response from sign-up:", res); // Debug statement

    return res;
  } catch (error: any) {
    console.error("Error during sign-up:", error.response.data.message); // Debug statement
  }
};

export const loginHandler = async (userName: string, password: string) => {
  console.log("baseUrl", import.meta.env.VITE_BASE_URL);

  try {
    const res = await axios.post(`http://localhost:8080/api/v1/auth/login`, {
      userName,
      password,
    });
    console.log("Response", res);
    const { data }: { data: AuthDataResponseType } = res;
    console.log(data);

    const refreshToken = data.refreshToken;
    const accessToken = data.accessToken;

    console.log(refreshToken, accessToken);
    const authStore = useAuthStore();
    authStore.setToken(accessToken);

    localStorage.setItem("refresh", refreshToken);
    console.log("done");
    localStorage.setItem("access", accessToken);

    const { toast } = useToast();
    toast({
      title: "Login Successful!!",
      description: "You have logged in successfully",
    });
    return true;
  } catch (error: any) {
    const { toast } = useToast();
    toast({
      title: "Uh oh! Something went wrong.",
      description: error.message,
      variant: "destructive",
    });
    return false;
  }
};


export const logout = async () => {
  const refreshToken = localStorage.getItem("refresh") as string;
  console.log("the logout refresh token:", { refreshToken });
  const res = await axios.post("http://localhost:8080/api/v1/auth/logout", {
    refreshToken,
  });
  console.log("Logout res:", res.data.message);
  return res.data.message;
};



export const refreshAccessToken = async (Token: string): Promise<string> => {
  try {
    const { data } = await axios.post(
      `http://localhost:8080/api/v1/auth/refresh-token`,
      { refreshToken: Token }
    );
    console.log("token Refreshed: ", data.accessToken);
    return data.accessToken;
  } catch (error: any) {
    console.error("Error refreshing access token:", error);
    throw new Error(
      error.response?.data?.message || "Error refreshing access token"
    );
  }
};


export const createGoal = async (data: GoalsType) => {
  try {
    const res = await authFetch.post("/goals", data);
    return res.data as GoalsType;
  } catch (error: any) {
    console.error(error.response.message);
  }
};



interface UpdateGoalArgs {
  id: string;
  data?: Partial<GoalsType>;
}
export const updateGoal = async ({
  id,
  data,
}: UpdateGoalArgs): Promise<GoalsType> => {
  try {
    console.log(`Updating goal with ID: ${id}`, data);
    const res = await authFetch.put(`/goals/${id}`, data);
    return res.data as GoalsType;
  } catch (error: any) {
    console.error(
      "Error updating goal:",
      error.response?.data?.message || error.message
    );
    throw new Error(error.response?.data?.message || "Error updating goal");
  }
};


export const deleteGoal = async (id: string) => {
  try {
    console.log(`deleting goal with ID: ${id}`);
    await authFetch.delete(`/goals/${id}`);
  } catch (error: any) {
    console.error(
      "Error updating goal:",
      error.response?.data?.message || error.message
    );
    throw new Error(error.response?.data?.message || "Error deleting goal");
  }
};

// Tasks
export const createTask = async ({
  id,
  task,
}: {
  id: string;
  task: string;
}) => {
  try {
    await authFetch.post(`/goals/${id}/tasks`, { name: task });
  } catch (error: any) {
    console.error(
      "Error updating goal:",
      error.response?.data?.message || error.message
    );
    throw new Error(error.response?.data?.message || "Error creating goal");
  }
};


interface EditTaskType {
  goalId: string;
  task: {
    name: string;
    completed?: boolean;
  };
  taskId: string;
}
export const editTask = async ({ goalId, task, taskId }: EditTaskType) => {
  try {
    await authFetch.put(`/goals/${taskId}/task/${goalId}`, {
      name: task.name,
      completed: task.completed,
    });
    console.log(`task name: ${task.name} is being set ${task.completed} `);
  } catch (error: any) {
    console.error(
      "Error updating task:",
      error.response?.data?.message || error.message
    );
    throw new Error(error.response?.data?.message || "Error updating task");
  }
};


export const deleteTask = async (taskId: string) => {
  try {
    await authFetch.delete(`/goals/${taskId}/task`);
    console.log(`task with: ${taskId} is being deleted `);
  } catch (error: any) {
    console.error(
      "Error deleting task:",
      error.response?.data?.message || error.message
    );
    throw new Error(error.response?.data?.message || "Error deleting task");
  }
};
