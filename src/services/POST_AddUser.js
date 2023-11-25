import axios from "axios";

export const postAddUser = async ({ name, email }) => {
  try {
    const response = await axios.post("https://delman-fe-api.fly.dev/users", {
      name,
      email,
    });

    console.log(`User created: ${name}, ${email}`);
  } catch (error) {
    console.error("Error creating user:", error.message);
  }
};
