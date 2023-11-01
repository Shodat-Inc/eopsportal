import { apiHandler, classRepo } from "@/helpers/api";

// Default API handler for the GET method to handle retrieval of subclasses.
export default apiHandler({
  get: allhandler,
});

/**
 * Handler function to process GET requests for retrieving subclasses.
 *
 * @param {Object} req - The incoming request object which may contain filtering criteria.
 * @param {Object} res - The response object to send back the results.
 */
async function allhandler(req: any, res: any) {
  try {
    // Retrieve subclasses using the classRepo and the provided request data.
    const subClass = await classRepo.getSubClass(req);

    // If subclasses are successfully retrieved, send back a 200 OK response with the class data.
    res.status(200).json(subClass);
  } catch (error: any) {
    // If there's an error during subclass retrieval, send back a 500 Internal Server Error response with the error message.
    res.status(500).send({ message: error.message });
    return;
  }
}
