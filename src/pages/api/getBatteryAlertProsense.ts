import { batteryAlertRepo, apiHandler } from "@/helpers/api";
import { loggerError, loggerInfo } from "@/logger";
import { createAlertValidation } from "../../../validateSchema";

// Define the handler function for the API route
export default apiHandler({
    // Specify the POST method handler
    get: async function handler(req: any, res: any) {
        try {
            // Log information about the request
            loggerInfo.info("Get");

            // Extract data from the request body
            const data = { data: req.query, auth: req.auth.sub };
            console.log(data,"==data")

            const batteryAlert = await batteryAlertRepo.get(data);

            // Send a success response
            res.status(200).json(batteryAlert);
        } catch (error: any) {
            // Log the error to the console
            loggerError.error("Error in Creating Battery Alert", error);

            // Send an error response
            res.status(400).json(error);
        }
    },
});

