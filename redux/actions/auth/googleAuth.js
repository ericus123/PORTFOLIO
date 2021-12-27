import http from "../../../utils/axios/axios";

export const googleAuthRequest = async () => {
  try {
    const res = await http.post("/api/auth/google");
    console.log(res.data);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};
