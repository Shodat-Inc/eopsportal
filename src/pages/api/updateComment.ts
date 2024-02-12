import { apiHandler, commentRepo } from "@/helpers/api";
import { loggerError } from "@/logger";
import { updateCommentValidation } from "../../../validateSchema";

export default apiHandler({
    put: handler,
});

async function handler(req: any, res: any) {
    try {
        // Extract update data from the request body.
        const reqAuth = req.auth.sub
        const updateData = req.body;
        const reqParams = req.query
        const validation = updateCommentValidation(updateData);
        if (validation.error) {
            // Handle validation errors
            res.status(400).json({
                success: false,
                message: "Validation error",
                errors: validation.error.details.map((detail) => detail.message),
            });
            return;
        }
        const updatedData = await commentRepo.update(validation.value, reqAuth, reqParams);

        res.status(200).json({ message: updatedData });
    } catch (error: any) {
        // If there's an error during the update operation, log the error and return a server error response.
        loggerError.error("Cannot update role", error);
        res.status(500).send({ message: error.message });
    }
}
