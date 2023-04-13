import axios from "axios";

import { API_BASE_URL } from "../constants/constants";

type FormData = {
  email: string;
  password: string;
};

export const SignUpHook = async (data: FormData) => {
  try {
    await axios.post(`${API_BASE_URL}/auth/signup`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return true;
  } catch (error) {
    alert("중복된 아이디입니다");
    console.error(error);
  }
};

export const SignInHook = async (data: FormData) => {
  try {
    await axios
      .post(`${API_BASE_URL}/auth/signin`, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res.data.access_token);
        localStorage.setItem("ACCESS_TOKEN", res.data.access_token);
      });
    return true;
  } catch (error) {
    alert("error");
    console.error(error);
  }
};

export const HasToken = () => {
  if (localStorage.getItem("ACCESS_TOKEN")) {
    return true;
  } else {
    return false;
  }
};
