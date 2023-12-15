import { modelRepo, apiHandler } from "@/helpers/api";
import { loggerError, loggerInfo } from "@/logger";
import { createModelValidation } from "../../../validateSchema";

// Define the handler function for the API route
export default apiHandler({
    // Specify the POST method handler
    post: async function handler(req: any, res: any) {
        try {
            // Log information about the request
            loggerInfo.info("Post Class");

            // Extract data from the request body
            const data = req.body;

            // Validate the data using a validation module
            const validation = createModelValidation(data);

            // Check for validation errors
            if (validation.error) {
                // Handle validation errors
                res.status(400).json({
                    success: false,
                    message: "Validation error",
                    errors: validation.error.details.map((detail) => detail.message),
                });
                return;
            }

            // Create a model using the model repository
            const model = await modelRepo.create(validation.value);

            // Send a success response
            res.status(200).json(model);
        } catch (error: any) {
            // Log the error to the console
            loggerError.error("Error in Creating Model", error);

            // Send an error response
            res.status(400).json(error);
        }
    },
});

