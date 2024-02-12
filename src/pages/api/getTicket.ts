import { ticketRepo, apiHandler } from "@/helpers/api";
import { loggerError } from "@/logger";

// Default API handler for the GET method to retrieve all roles.
export default apiHandler({
    get: getAllTickets,
});

async function getAllTickets(req: any, res: any) {
    try {
        const data = req.query
        const users = await ticketRepo.getTicketByAlertId(data);
        res.status(200).json(users);
    } catch (error: any) {
        loggerError.error("Can't fetch Ticket", error);
        res.status(500).send({ message: error.message });
    }
}