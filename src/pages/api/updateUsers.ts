import { apiHandler, usersRepo } from "@/helpers/api";
import { loggerError } from "@/logger";

export default apiHandler({
  put: handler,
});

async function handler(req: any, res: any) {
  try {
    const userId = req.id; // assuming you have user ID in the URL like /users/123
    console.log(userId,"====userId")
    if (!userId) {
      return res.status(400).send({ message: "User ID is required" });
    }
    const updateData = req.body;

    if (!updateData) {
      return res.status(400).send({ message: "Update data is required" });
    }

    const updatedUser: any = await usersRepo.update(userId, updateData);
    console.log(updatedUser, "---------------------");
    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).json(updatedUser,{res});
  } catch (error: any) {
    loggerError.error("Cannot update user", error);
    res.status(500).send({ message: error.message });
  }
}
