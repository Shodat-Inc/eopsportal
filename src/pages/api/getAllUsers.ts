import { apiHandler, usersRepo } from "@/helpers/api";
import { loggerError } from "@/logger";

// Default API handler for the GET method to retrieve all users.
export default apiHandler({
  get: getAllUsers,
});

/**
 * Handler function to process GET requests for retrieving all users.
 *
 * @param {Object} req - The incoming request object.
 * @param {Object} res - The response object to send back the results.
 */
async function getAllUsers(req: any, res: any) {
  try {
    // Retrieve all users using the usersRepo.
    const users = await usersRepo.getAll();

    // If users are successfully retrieved, send back a 200 OK response with the users data.
    res.status(200).json(users);
  } catch (error: any) {
    // If there's an error during the retrieval, log the error and send back a 500 Internal Server Error response with the error message.
    loggerError.error("Cant fetch User(s)", error);
    res.status(500).send({ message: error.message });
  }
}
