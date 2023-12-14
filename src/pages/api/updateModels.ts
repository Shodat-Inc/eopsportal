import { apiHandler } from "@/helpers/api";
import { loggerError } from "@/logger";
import { updateModelValidation } from "../../../validateSchema";
import { ModelRepo } from "@/helpers/api/repo/model-repo";


// Default API handler for the PUT method to handle model update operations.
export default apiHandler({
    put: handler,
});

/**
 * Handler function to process the update operation for a model.
 *
 * @param {Object} req - The incoming request object containing the model data to be updated.
 * @param {Object} res - The response object to send back the results.
 */
async function handler(req: any, res: any) {
    try {

        // Extract update data from the request body.
        const id = req.auth.sub
        const updateData = req.body;
        const validation = updateModelValidation(updateData);
        if (validation.error) {
            // Handle validation errors
            res.status(400).json({
                success: false,
                message: "Validation error",
                errors: validation.error.details.map((detail) => detail.message),
            });
            return;
        }
        // Attempt to update the model description using Model Repo.
        const updatedRole: any = await ModelRepo.update(validation.value);

        // If successful, return a success response with the updated model data.
        res.status(200).json({ message: updatedRole });
    } catch (error: any) {
        // If there's an error during the update operation, log the error and return a server error response.
        loggerError.error("Cannot update role", error);
        res.status(500).send({ message: error.message });
    }
}
