import axios from "axios";

export const deleteUserData = async ({ id, name, email }) => {
  try {
    const response = await axios.delete(
      `https://delman-fe-api.fly.dev/users/${id}`,
      {
        data: {
          name,
          email,
        },
      }
    );

    console.log(`User deleted: ID ${id}, ${name}, ${email}`);

    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error.message);
    throw error;
  }
};
