import { apiHandler, alertRepo } from "@/helpers/api";
import { loggerError, loggerInfo } from "@/logger";

// Define DELETE API endpoint using apiHandler
export default apiHandler({
  delete: _delete,
});

// Define the _delete function to handle the DELETE request
async function _delete(req: any, res: any) {
  loggerInfo.info("Delete Alert");

  try {
    // Extract the 'id' parameter from the request query
    const id = req.query.id;

    const deletedData = await alertRepo.delete(id);

    res.status(200).json(deletedData);
  } catch (error: any) {
    // Handle errors, log the error, and send an error response
    loggerError.error("Error in deleting alert", error);
    res.status(400).json(error);
  }
}
