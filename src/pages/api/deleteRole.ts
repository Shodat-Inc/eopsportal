import { apiHandler, classRepo } from "@/helpers/api";
import { roleRepo } from "@/helpers/api/repo/role-repo";
import { loggerError, loggerInfo } from "@/logger";
import { deleteRoleValidation } from "../../../validateSchema";
import message from "@/util/responseMessage";

export default apiHandler({
    delete: _delete,
});
async function _delete(req: any, res: any) {
    loggerInfo.info("Delete Class");
    try {
        const id = req.body;
        const validation = deleteRoleValidation(id);
        if (validation.error) {
            // Handle validation errors
            res.status(400).json({
                success: false,
                message: "Validation error",
                errors: validation.error.details.map((detail) => detail.message),
            });
            return;
        }
        const role = await roleRepo.delete(validation.value);
        res.status(200).json({ message: role });
    } catch (error: any) {
        loggerError.error("error in deleting Role");
        res.status(400).json("Error in deleting Role", error);
    }
}
