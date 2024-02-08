import { ticketRepo, apiHandler, db } from "@/helpers/api";
import { loggerError, loggerInfo } from "@/logger";
import { createTicketValidation } from "../../../validateSchema";

// Define the handler function for the API route
export default apiHandler({
    // Specify the POST method handler
    post: async function handler(req: any, res: any) {
        // Log information about the request
        loggerInfo.info("Post Class");
        try {
            if (req.method !== "POST") {
                res.status(405).send("Only POST method allowed");
                return;
            }

            // Use Sequelize transaction to ensure atomicity of database operations
            await db.sequelize.transaction(async (transaction: any) => {

                // Extract data from the request body
                const data = req.body;

                // Validate the data using a validation module
                const validation = createTicketValidation(data);

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

                const ticketData = await ticketRepo.create(data, transaction);

                // Send a success response
                res.status(200).json(ticketData);
            });
        } catch (error: any) {
            // Log the error to the console
            loggerError.error("Error in Creating Ticket", error);

            // Send an error response
            res.status(400).json(error);
        }
    },
});

