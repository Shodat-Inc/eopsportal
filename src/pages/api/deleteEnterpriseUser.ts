import { apiHandler } from "@/helpers/api";
import { EnterpriseUsersRepo } from "@/helpers/api/repo/enterpriseUser-repo";
import { loggerError, loggerInfo } from "@/logger";
import { deleteEnterpriseUserValidation } from "../../../validateSchema";

// Define DELETE API endpoint using apiHandler
export default apiHandler({
    delete: _delete,
});

// Define the _delete function to handle the DELETE request
async function _delete(req: any, res: any) {
    loggerInfo.info("Delete Enterprise User");

    try {
        // Extract the 'id' parameter from the request body
        const id = req.body;

        // Validate the 'id' parameter using deleteEnterpriseUserValidation
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

        // Call the delete method from EnterpriseUsersRepo to delete the enterprise user
        const delData = await EnterpriseUsersRepo.delete(validation.value);

        // Send a success response with the result of the delete operation
        res.status(200).json({ message: delData });
    } catch (error: any) {
        // Handle errors, log the error, and send an error response
        loggerError.error("error in deleting enterprise user", error);
        res.status(400).json("Error in deleting Enterprise User", error);
    }
}
