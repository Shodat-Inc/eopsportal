import { apiHandler, tagDataTypeRepo } from "@/helpers/api";
import { loggerError } from "@/logger";

// Default API handler for the GET method to handle retrieval operations.
export default apiHandler({
  get: handleGetRequest,
});

async function handleGetRequest(req: any, res: any) {
  try {
    const result = await tagDataTypeRepo.get();
    res.status(200).json(result);
  } catch (error: any) {
    // If there's an error during user retrieval, log the error and send back a 500 Internal Server Error response.
    loggerError.error("Cant fetch User", error);
    res.status(500).json(error);
  }
}
