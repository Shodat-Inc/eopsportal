import { apiHandler } from "@/helpers/api";
import { loggerError } from "@/logger";
import { ModelRepo } from "@/helpers/api/repo/model-repo";


export default apiHandler({
    get: getModelById,
});


async function getModelById(req: any, res: any) {
    try {
        const reqData = req.query
        const id = req.auth.id
        let modelType;
        switch (req.query.modelName) {
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
        const model = await ModelRepo.getModelById(reqData, modelType);

        res.status(200).json(model);
    } catch (error: any) {
        loggerError.error("Cant fetch User(s)", error);
        res.status(500).send({ message: error.message });
    }
}
