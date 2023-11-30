import { apiHandler } from "@/helpers/api";
import { loggerError } from "@/logger";
import { EnterpriseUsersRepo } from "@/helpers/api/repo/enterpriseUser-repo";


// Default API handler for the PUT method to handle enterprise user update operations.
export default apiHandler({
    post: handler,
});

/**
 * Handler function to process the update operation for a Enterprise User.
 *
 * @param {Object} req - The incoming request object containing the enterprise user data to be updated.
 * @param {Object} res - The response object to send back the results.
 */
async function handler(req: any, res: any) {
    try {

        // Extract update data from the request body.
        const reqAuth = req.auth;
        const updateData = req.body;

        // Attempt to update the role using the roleRepo.
        const updatedRole: any = await EnterpriseUsersRepo.cancelInvite(updateData, reqAuth);

        // If successful, return a success response with the updated role data.
        res.status(200).json({ message: updatedRole });
    } catch (error: any) {
        // If there's an error during the update operation, log the error and return a server error response.
        loggerError.error("Cannot update role", error);
        res.status(500).send({ message: error.message });
    }
}
