import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
  const respone = await axiosInstance.post("/auth/signup", signupData);
  return respone.data;
};
