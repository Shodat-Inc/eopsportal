import { apiHandler } from "@/helpers/api";
import { loggerError } from "@/logger";
import { ModelRepo } from "@/helpers/api/repo/model-repo";


export default apiHandler({
    get: getAllModel,
});


async function getAllModel(req: any, res: any) {
    try {
        const reqData = req.query.modelName
        let modelType;
        switch (reqData) {
            case "Crack Detection":
                modelType = "CrackModel";
                break;
            case "Parts Detection":
                modelType = "PartModel";
                break;
            case "Workplace Safety Detection":
                modelType = "WorkplaceModel";
                break;
        }
        if (modelType === undefined) {
            res.status(400).json({
                success: false,
                message: "Invalid modelName",
            });
            return;
        }
        const model = await ModelRepo.getAllModels(reqData, modelType);

        res.status(200).json(model);
    } catch (error: any) {
        loggerError.error("Cant fetch User(s)", error);
        res.status(500).send({ message: error.message });
    }
}
