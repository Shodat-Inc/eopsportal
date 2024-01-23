import { apiHandler } from "@/helpers/api";
import { enterpriseRepo } from "@/helpers/api/repo/enterprise-repo";
import { loggerError, loggerInfo } from "@/logger";

// Default API handler for the GET method to retrieve all enterprises.
export default apiHandler({
    get: getEnterpriseUser,
});

/**
 * Handler function to process GET requests for retrieving all Enterprises.
 *
 * @param {Object} req - The incoming request object.
 * @param {Object} res - The response object to send back the results.
 */
async function getEnterpriseUser(req: any, res: any) {
    loggerInfo.info("GET Enterprise User");
    try {
        // Retrieve all Enterprises using the Enterprise Repo.
        const users = await enterpriseRepo.getAllData();
        // If Enterprises are successfully retrieved, send back a 200 OK response with the Enterprises data.
        res.status(200).json({ message: users });
    } catch (error: any) {
        // If there's an error during the retrieval, log the error and send back a 500 Internal Server Error response with the error message.
        loggerError.error("Cant fetch User(s)", error);
        res.status(500).send({ message: error.message });
    }
}