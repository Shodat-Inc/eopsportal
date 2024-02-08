import { ticketRepo, apiHandler, db } from "@/helpers/api";
import { loggerError } from "@/logger";
import { updateTicketValidation } from "../../../validateSchema";

export default apiHandler({
    put: handler,
});

async function handler(req: any, res: any) {
    try {

        await db.sequelize.transaction(async (transaction: any) => {

            // Extract update data from the request body.
            const updateData = req.body
            const query = req.query
            const validation = updateTicketValidation(updateData);
            if (validation.error) {
                // Handle validation errors
                res.status(400).json({
                    success: false,
                    message: "Validation error",
                    errors: validation.error.details.map((detail) => detail.message),
                });
                return;
            }

            const updatedTicket: any = await ticketRepo.update(validation.value, query, transaction);

            // If successful, return a success response with the updated role data.
            res.status(200).json({ message: updatedTicket });
        });
    } catch (error: any) {
        // If there's an error during the update operation, log the error and return a server error response.
        loggerError.error("Cannot update role", error);
        res.status(500).send({ message: error.message });
    }
}
