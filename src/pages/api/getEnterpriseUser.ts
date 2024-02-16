import { apiHandler } from "@/helpers/api";
import { EnterpriseUsersRepo } from "@/helpers/api/repo/enterpriseUser-repo";
import { loggerError, loggerInfo } from "@/logger";

// Default API handler for the GET method to retrieve all enterprise users.
export default apiHandler({
    get: getEnterpriseUser,
});

/**
 * Handler function to process GET requests for retrieving all Enterprise Users.
 *
 * @param {Object} req - The incoming request object.
 * @param {Object} res - The response object to send back the results.
 */
async function getEnterpriseUser(req: any, res: any) {
    loggerInfo.info("GET Enterprise User");
    try {
        const data = req.query
        // Retrieve all Enterprise Users using the EnterpriseUsers Repo.
        const users = await EnterpriseUsersRepo.getAllEnterpriseUser(data);
        // If Enterprise Users are successfully retrieved, send back a 200 OK response with the Enterprise Users data.
        res.status(200).json({ message: users });
    } catch (error: any) {
        // If there's an error during the retrieval, log the error and send back a 500 Internal Server Error response with the error message.
        loggerError.error("Cant fetch User(s)", error);
        res.status(500).send({ message: error.message });
    }
}
