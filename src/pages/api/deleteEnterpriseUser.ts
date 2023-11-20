import { apiHandler } from "@/helpers/api";
import { EnterpriseUsersRepo } from "@/helpers/api/repo/enterpriseUser-repo";
import { loggerError, loggerInfo } from "@/logger";
import { deleteEnterpriseUserValidation } from "../../../validateSchema";

export default apiHandler({
    delete: _delete,
});
async function _delete(req: any, res: any) {
    loggerInfo.info("Delete Enterprise User");
    try {
        const id = req.body;
        const validation = deleteEnterpriseUserValidation(id);
        if (validation.error) {
            // Handle validation errors
            res.status(400).json({
                success: false,
                message: "Validation error",
                errors: validation.error.details.map((detail) => detail.message),
            });
            return;
        }
        const delData = await EnterpriseUsersRepo.delete(validation.value);
        res.status(200).json({ message: delData });
    } catch (error: any) {
        loggerError.error("error in deleting enterprise user");
        res.status(400).json("Error in deleting Enterprise User", error);
    }
}
