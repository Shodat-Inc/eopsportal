import { apiHandler, purchaseHistoryRepo } from "@/helpers/api";

// Export the default API handler for the GET method
export default apiHandler({ get: handler });

/**
 * Handler function to process GET requests for retrieving purchase history details.
 *
 * @param {Object} req - The incoming request object which may contain filtering criteria.
 * @param {Object} res - The response object to send back the results.
 */
async function handler(req: any, res: any) {
  try {
    // Check if the HTTP method is GET; otherwise, respond with a 405 Method Not Allowed status
    if (req.method !== "GET") {
      res.status(405).send("Only GET method is allowed");
      return;
    }

    // Extract the user ID and subscription ID from the request
    const userId = req.id;
    const subscriptionId = req.query.subscriptionId;

    // Retrieve purchase history details based on the user ID and subscription ID
    const result = await purchaseHistoryRepo.getDetails({
      userId,
      subscriptionId,
    });

    // Respond with a 200 OK status and the result data
    return res.status(200).json(result);
  } catch (error: any) {
    // If an error occurs, respond with a 400 Bad Request status and the error details
    return res.status(400).json(error);
  }
}
