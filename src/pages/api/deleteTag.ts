import { apiHandler, classTagRepo } from "@/helpers/api";
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

    // Call the delete method from classTagRepo to delete the class tag
    const tag = await classTagRepo.delete(id);

    // Send a success response with a message indicating the deletion
    res.status(200).json("Class Tag Deleted Successfully");
  } catch (error: any) {
    // Handle errors, log the error, and send an error response
    loggerError.error("error in deleting Class Tag", error);
    res.status(400).json("Error in deleting Class Tag", error);
  }
}
