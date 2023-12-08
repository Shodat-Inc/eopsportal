import { apiHandler, db } from "@/helpers/api";
import { loggerError, loggerInfo } from "@/logger";

// Handle GET requests with the search function
export default apiHandler({
    get: search,
});
async function search(req: any, res: any) {
    // Log information about the request
    loggerInfo.info("Search Object");

    try {
        // Extract the query parameter from the request
        const query = req.query;
        const data = await db.Model.findAll({
            where: {
                id: Object.values(query),
            },
            attributes: ["id", "modelName",],
            include: [
                {
                    model: db.object,
                    attributes: ["id", "serialId"],
                    required: true,
                    include: [
                        {
                            model: db.AddValues,
                            attributes: ["values"],
                            required: true,
                        },
                    ],
                }]
        })

        return res.status(200).json(data);
    } catch (error: any) {
        // Log the error
        loggerError.error("Error in Searching Object");

        // Return an error response
        return res.status(400).json(error);
    }
}
