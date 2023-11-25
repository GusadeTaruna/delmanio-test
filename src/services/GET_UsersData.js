import axios from "axios";

export const getUsersData = async () => {
  try {
    const response = await axios.get("https://delman-fe-api.fly.dev/users");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching sales data:", error);
    throw error;
  }
};
