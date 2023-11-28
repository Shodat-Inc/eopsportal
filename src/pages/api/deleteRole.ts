import { apiHandler, classRepo } from "@/helpers/api";
import { roleRepo } from "@/helpers/api/repo/role-repo";
import { loggerError, loggerInfo } from "@/logger";
import { deleteRoleValidation } from "../../../validateSchema";
// Define DELETE API endpoint using apiHandler
export default apiHandler({
    delete: _delete,
});

// Define the _delete function to handle the DELETE request
async function _delete(req: any, res: any) {
    loggerInfo.info("Delete Class");

    try {
        // Extract the 'id' parameter from the request body
        const id = req.body;

        // Validate the 'id' parameter using deleteRoleValidation
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

        // Call the delete method from roleRepo to delete the role
        const role = await roleRepo.delete(validation.value);

        // Send a success response with the result of the delete operation
        res.status(200).json({ message: role });
    } catch (error: any) {
        // Handle errors, log the error, and send an error response
        loggerError.error("error in deleting Role", error);
        res.status(400).json("Error in deleting Role", error);
    }
}
