import { apiHandler, associationRepo } from "@/helpers/api";
import { loggerError } from "@/logger";

// Default API handler for the GET method to retrieve all users.
export default apiHandler({
    get: getAllAssociation,
});

/**
 * Handler function to process GET requests for retrieving all users.
 *
 * @param {Object} req - The incoming request object.
 * @param {Object} res - The response object to send back the results.
 */
async function getAllAssociation(req: any, res: any) {
    try {
        const association = await associationRepo.getAll();

        res.status(200).json(association);
    } catch (error: any) {
        loggerError.error("Cant fetch User(s)", error);
        res.status(500).send({ message: error.message });
    }
}
