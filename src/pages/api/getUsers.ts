import { apiHandler, usersRepo } from "@/helpers/api";
import { loggerError } from "@/logger";

export default apiHandler({
  get: handleGetRequest,
});

async function handleGetRequest(req: any, res: any) {
  try {
    const id = req.query.id;
    if (id) {
      const user = await usersRepo.getById(id);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      res.status(200).json(user);
    } else {
      const users = await usersRepo.getAll();
      res.status(200).json(users);
    }
  } catch (error: any) {
    loggerError.error("Cant fetch User(s)", error);
    res.status(500).send({ message: error.message });
  }
}
