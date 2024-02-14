import { apiHandler, objectRepo } from "@/helpers/api";

// Default API handler for the GET method to handle retrieval of objects.
export default apiHandler({
  get: allhandler,
});

/**
 * Handler function to process GET requests for retrieving objects.
 *
 * @param {Object} req - The incoming request object which may contain filtering criteria.
 * @param {Object} res - The response object to send back the results.
 */
async function allhandler(req: any, res: any) {
  try {
    // Retrieve objects using the objectRepo and the provided request data.
    const objects = await objectRepo.getObjectValues(req);

    // Check if the retrieved objects are empty or if the response is an empty array.
    if (!objects || (Array.isArray(objects) && objects.length === 0)) {
      // If empty, send back a 404 Not Found response indicating no data.
      res.status(404).json({ message: "No data found." });
      return;
    }

    // If objects data is found, send back a 200 OK response with the objects data.
    res.status(200).json(objects);
  } catch (error: any) {
    // If there's an error during the retrieval, send back a 500 Internal Server Error response with the error message.
    res.status(500).send({ message: error.message });
    return;
  }
}
