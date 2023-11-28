import { apiHandler } from "@/helpers/api";
import { loggerError } from "@/logger";
import { updateEnterpriseValidation } from "../../../validateSchema";
import { enterpriseRepo } from "@/helpers/api/repo/enterprise-repo";


// Default API handler for the DELETE method to handle enterprise delete operations.
export default apiHandler({
    post: handler,
});

/**
 * Handler function to process the delete operation for a Enterprise.
 *
 * @param {Object} req - The incoming request object containing the enterprise data to be deleted.
 * @param {Object} res - The response object to send back the results.
 */
async function handler(req: any, res: any) {
    try {
        // Extract data to be deleted from the params.
        const reqData = req.query.id;
        // Attempt to delete the enterprise using the enterprise repo.
        const deleteData = await enterpriseRepo.delete(reqData);

        // If successful, return a success response with the deleted enterprise data.
        res.status(200).json({ message: deleteData });
    } catch (error: any) {
        // If there's an error during the update operation, log the error and return a server error response.
        loggerError.error("Cannot update role", error);
        res.status(500).send({ message: error.message });
    }
}
