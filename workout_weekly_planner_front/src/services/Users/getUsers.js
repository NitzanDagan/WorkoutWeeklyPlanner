import { API_BASE_URL, API_ENDPOINTS } from "../apiConfing";

export const getUsers = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.users.getUsers}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
