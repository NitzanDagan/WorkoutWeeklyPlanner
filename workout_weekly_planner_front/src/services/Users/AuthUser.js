import { API_BASE_URL, API_ENDPOINTS } from "../apiConfing";

export const signIn = async (email, password) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.users.signIn}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (error) {
    console.error(error);
  }
};

export const signUp = async (newUser) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.users.signUp}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (error) {
    console.error(error);
  }
};
