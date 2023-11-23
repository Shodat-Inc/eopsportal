import { apiHandler, classRepo } from "@/helpers/api";
import { loggerError, loggerInfo } from "@/logger";

// Define DELETE API endpoint using apiHandler
export default apiHandler({
  delete: _delete,
});

// Define the _delete function to handle the DELETE request
async function _delete(req: any, res: any) {
  loggerInfo.info("Delete Class");

  try {
    // Extract the 'id' parameter from the request query
    const id = req.query.id;

    // Call the delete method from the classRepo to delete the class
    const deleteClass = await classRepo.delete(id);

    // Send a success response with the result of the delete operation
    res.status(200).json(deleteClass);
  } catch (error: any) {
    // Handle errors, log the error, and send an error response
    loggerError.error("error in deleting class", error);
    res.status(400).json(error);
  }
}
