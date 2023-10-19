import { apiHandler, usersRepo } from "@/helpers/api";
import { loggerError } from "@/logger";

export default apiHandler({
  get: getAllUsers,
});
async function getAllUsers(req: any, res: any) {
  try {
    const users = await usersRepo.getAll();
    res.status(200).json(users);
  } catch (error: any) {
    loggerError.error("Cant fetch User(s)", error);
    res.status(500).send({ message: error.message });
  }
}
