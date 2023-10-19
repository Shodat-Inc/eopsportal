import { apiHandler, usersRepo } from "@/helpers/api";
import { loggerError } from "@/logger";

export default apiHandler({
    get: handleGetRequest,
});

async function handleGetRequest(req: any, res: any) {
    try {
        const id = req.id;
        if (!id) {
            res.error(400).json("Id isn't in the database");
        } else {
            const user = await usersRepo.getById(2);
            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }
            res.status(200).json(user);
        }
    } catch (error: any) {
        loggerError.error("Cant fetch User", error);
        res.status(500).send({ message: error.message });
    }
}
