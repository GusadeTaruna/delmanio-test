import axios from "axios";

export const getUserDetail = async (id) => {
  try {
    const response = await axios.get(
      `https://delman-fe-api.fly.dev/users/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
