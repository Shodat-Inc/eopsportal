import { apiHandler, usersRepo } from "@/helpers/api";
import { deleteRecordRepo } from "@/helpers/api/repo/delete-record-repo";

import { loggerError } from "@/logger";

export default apiHandler({
  post: _delete,
});

async function _delete(req: any, res: any) {
  try {
    const id = req.id;
    if (!id) {
      return res
        .status(400)
        .send({ message: "User ID is required for deletion." });
    }

    const user = await usersRepo.getById(id);
    console.log(user);
    const data = req.body;
    console.log(data);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    
    await usersRepo.delete(id);
    // Record the delete action to the deleteRecordTable
    await deleteRecordRepo.create({
      email: data.email,
      userId: id,
      deleteAction: data.deleteAction,
      message: data.message,
      reasonId: data.reasonId,
    });

    res.status(200).send({ message: "User deleted successfully" });
  } catch (error: any) {
    loggerError.error("Can't delete user", error);
    res.status(500).send({ message: error.message });
  }
}
