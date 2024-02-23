import { apiHandler, tyreAlertRepo } from "@/helpers/api";
import { loggerError, loggerInfo } from "@/logger";
import { updateAlertValidation } from "../../../validateSchema";


// Default API handler for the PUT method to handle alert update operations.
export default apiHandler({
    put: handler,
});

async function handler(req: any, res: any) {
    try {
        // Extract update data from the request body.
        const updateData = req.body;
        const validation = updateAlertValidation(updateData);
        if (validation.error) {
            // Handle validation errors
            res.status(400).json({
                success: false,
                message: "Validation error",
                errors: validation.error.details.map((detail) => detail.message),
            });
            return;
        }
        const updatedData = await tyreAlertRepo.update(validation.value, req);

        res.status(200).json({ message: updatedData });
    } catch (error: any) {
        // If there's an error during the update operation, log the error and return a server error response.
        loggerError.error("Cannot update role", error);
        res.status(500).send({ message: error.message });
    }
}
