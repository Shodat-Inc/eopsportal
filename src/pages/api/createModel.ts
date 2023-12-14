import { apiHandler } from "@/helpers/api";
import { loggerError, loggerInfo } from "@/logger";
import { createModelValidation } from "../../../validateSchema";
import message from "@/util/responseMessage";
import { ModelRepo } from "@/helpers/api/repo/model-repo";

// Define the handler function for the API route
export default apiHandler({
    // Specify the POST method handler
    post: async function handler(req: any, res: any) {
        try {
            // Log information about the request
            loggerInfo.info("Post Class");

            // Check if the request method is not POST
            if (req.method !== "POST") {
                // Send a response indicating method not allowed
                res.status(405).send(message.error.postMethodError);
                return;
            }

            // Extract data from the request body
            const data = req.body;
            const id = req.auth.sub

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
            // Determine the model type based on the modelName property
            let modelType;
            switch (validation.value.modelName) {
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
            const user = await ModelRepo.create(id, validation.value, modelType);
            // Send a success response
            res.status(200).json({ message: user });
        } catch (error: any) {
            // Log the error to the console
            loggerError.error("Error in posting class");

            // Send an error response
            res.status(400).json(error);
        }
    },
});

