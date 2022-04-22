import http from "../../../utils/axios/axios";

export const googleAuthRequest = async () => {
  try {
    const res = await http.post("/api/auth/google");
    return res;
  } catch (error) {
    return error;
  }
};
