import { apiHandler } from "@/helpers/api";
import { associationRepo } from "@/helpers/api/repo/association-repo";
import { loggerError, loggerInfo } from "@/logger";

export default apiHandler({
    get: getAssociationByID,
});


async function getAssociationByID(req: any, res: any) {
    loggerInfo.info("GET Association By ID");
    try {
        const reqData = req.query
        const users = await associationRepo.getById(reqData);
        res.status(200).json({ message: users });
    } catch (error: any) {
        loggerError.error("Cant fetch Association", error);
        res.status(500).send({ message: error.message });
    }
}
