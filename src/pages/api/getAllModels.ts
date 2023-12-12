import { apiHandler } from "@/helpers/api";
import { loggerError } from "@/logger";
import { ModelRepo } from "@/helpers/api/repo/model-repo";


export default apiHandler({
    get: getAllModel,
});


async function getAllModel(req: any, res: any) {
    try {
        const model = await ModelRepo.getAllModels();

        res.status(200).json(model);
    } catch (error: any) {
        loggerError.error("Cant fetch User(s)", error);
        res.status(500).send({ message: error.message });
    }
}
