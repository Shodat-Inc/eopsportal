import { alertRepo, apiHandler } from "@/helpers/api";
import { loggerError, loggerInfo } from "@/logger";
import { createAlertValidation } from "../../../validateSchema";
import { tyreAlertRepo } from "@/helpers/api/repo/tyre-alert-repo";

// Define the handler function for the API route
export default apiHandler({
  // Specify the POST method handler
  post: async function handler(req: any, res: any) {
    try {
      if (req.method !== "POST") {
        // If not, send a method not allowed response
        res.status(405).send({ message: "Only POST requests allowed" });
        return;
      }
      // Log information about the request
      loggerInfo.info("Post Class");

      // Extract data from the request body
      const data = req.body;
      data.userId = req.id;

      // Validate the data using a validation module

      // Check for validation errors

      const alert = await tyreAlertRepo.create(data);

      // Send a success response
      res.status(200).json(alert);
    } catch (error: any) {
      // Log the error to the console
      loggerError.error("Error in Creating Model", error);

      // Send an error response
      res.status(400).json(error);
    }
  },
});