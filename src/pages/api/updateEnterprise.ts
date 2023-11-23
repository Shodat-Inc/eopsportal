import { apiHandler } from "@/helpers/api";
import { loggerError } from "@/logger";
import { updateEnterpriseValidation } from "../../../validateSchema";
import { enterpriseRepo } from "@/helpers/api/repo/enterprise-repo";


// Default API handler for the PUT method to handle enterprise update operations.
export default apiHandler({
    put: handler,
});

/**
 * Handler function to process the update operation for a Enterprise.
 *
 * @param {Object} req - The incoming request object containing the enterprise data to be updated.
 * @param {Object} res - The response object to send back the results.
 */
async function handler(req: any, res: any) {
    try {
        // Extract update data from the request body.
        const updateData = req.body;
        const validation = updateEnterpriseValidation(updateData);
        if (validation.error) {
            // Handle validation errors
            res.status(400).json({
                success: false,
                message: "Validation error",
                errors: validation.error.details.map((detail) => detail.message),
            });
            return;
        }
        // Attempt to update the enterprise using the enterprise repo.
        const updatedData = await enterpriseRepo.update(validation.value);

        // If successful, return a success response with the updated enterprise data.
        res.status(200).json({ message: updatedData });
    } catch (error: any) {
        // If there's an error during the update operation, log the error and return a server error response.
        loggerError.error("Cannot update role", error);
        res.status(500).send({ message: error.message });
    }
}
