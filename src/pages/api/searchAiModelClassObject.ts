import { ticketRepo, apiHandler, searchRepo } from "@/helpers/api";
import { loggerError } from "@/logger";

// Default API handler for the GET method to retrieve all roles.
export default apiHandler({
    get: getAllObject,
});

async function getAllObject(req: any, res: any) {
    try {
        const data = {
            query: req.query,
            userId: req.auth.sub
        }
        const getData = await searchRepo.getAiModelObject(data);
        res.status(200).json(getData);
    } catch (error: any) {
        loggerError.error("Can't fetch Object with Tag Values", error);
        res.status(500).send({ message: error.message });
    }
}