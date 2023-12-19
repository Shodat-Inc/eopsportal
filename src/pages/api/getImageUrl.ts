import { apiHandler, modelDataRepo } from "@/helpers/api";
import { loggerInfo } from "@/logger";

// Export the default API handler for the GET method
export default apiHandler({
  get: handler,
});

async function handler(req: any, res: any) {
  // Log an information message using the 'loggerInfo' instance
  loggerInfo.info("Get Image Urls");

  try {
    // Check if the HTTP method is GET; otherwise, respond with a 405 Method Not Allowed status
    if (req.method !== "GET") {
      res.status(405).send("Only GET method allowed");
      return;
    }

    // Extract the user ID and model ID from the request
    const userId = req.id;
    const modelId = req.query.modelId;

    // Get image URLs based on the provided model ID and user ID
    const result = await modelDataRepo.get(modelId, userId);

    // Respond with a 200 OK status and the result data
    return res.status(200).json(result);
  } catch (error: any) {
    // If an error occurs, respond with a 400 Bad Request status and the error details
    return res.status(400).json(error);
  }
}
