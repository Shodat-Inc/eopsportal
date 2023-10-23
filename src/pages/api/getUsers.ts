import { apiHandler, usersRepo } from "@/helpers/api";
import { loggerError } from "@/logger";
import message from "@/util/responseMessage";

// Default API handler for the GET method to handle user retrieval operations.
export default apiHandler({
  get: handleGetRequest,
});

/**
 * Handler function to process GET requests for retrieving a user by ID.
 *
 * @param {Object} req - The incoming request object containing the user ID.
 * @param {Object} res - The response object to send back the results.
 */
async function handleGetRequest(req: any, res: any) {
  try {
    const id = req.id; // Extract user ID from the request object.

    // If no ID is provided in the request, send back an error response.
    if (!id) {
      res.error(400).json(message.error.idError);
    } else {
      // Retrieve user data from the repository using the provided ID.
      const user = await usersRepo.getById(id);

      // If no user is found for the given ID, send back a 404 Not Found response.
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      // If user data is found, send back a 200 OK response with the user data.
      res.status(200).json(user);
    }
  } catch (error: any) {
    // If there's an error during user retrieval, log the error and send back a 500 Internal Server Error response.
    loggerError.error("Cant fetch User", error);
    res.status(500).send(message.error.cantFetchUser);
  }
}
