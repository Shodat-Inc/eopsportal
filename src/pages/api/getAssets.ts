import { apiHandler, classRepo } from "@/helpers/api";

// Default API handler for the GET method to handle retrieval of class data.
export default apiHandler({
  get: allhandler,
});

/**
 * Handler function to process GET requests for retrieving class data.
 *
 * @param {Object} req - The incoming request object which may contain filtering criteria.
 * @param {Object} res - The response object to send back the results.
 */
async function allhandler(req: any, res: any) {
  try {
    const data = {
      query: req.query,
      userId: req.auth.sub
    }
    // Retrieve class data using the classRepo and the provided request data.
    const classes = await classRepo.getClassData(data);

    // If class data is successfully retrieved, send back a 200 OK response with the class data.
    res.status(200).json(classes);
  } catch (error: any) {
    // If there's an error during class data retrieval, send back a 500 Internal Server Error response with the error message.
    res.status(500).send({ message: error.message });
    return;
  }
}
