import { apiHandler } from "@/helpers/api";
import { roleRepo } from "@/helpers/api/repo/role-repo";
import { loggerError } from "@/logger";

// Default API handler for the GET method to retrieve all roles.
export default apiHandler({
  get: getAllRoles,
});

/**
 * Handler function to process GET requests for retrieving all roles.
 *
 * @param {Object} req - The incoming request object.
 * @param {Object} res - The response object to send back the results.
 */
async function getAllRoles(req: any, res: any) {
  try {
    // Retrieve all roles using the Role Repo.
    const users = await roleRepo.getAllRoles();
    // If roles are successfully retrieved, send back a 200 OK response with the roles data.
    res.status(200).json(users);
  } catch (error: any) {
    // If there's an error during the retrieval, log the error and send back a 500 Internal Server Error response with the error message.
    loggerError.error("Cant fetch User(s)", error);
    res.status(500).send({ message: error.message });
  }
}
