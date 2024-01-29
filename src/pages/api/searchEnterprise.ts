import { apiHandler, db } from "@/helpers/api";
import { generalizedSearch } from "@/helpers/api/search/search";
import { loggerError, loggerInfo } from "@/logger";


export default apiHandler({
    get: search,
});

/**
 * Handler for the search endpoint.
 * Retrieves data from the database based on query parameters.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
async function search(req: any, res: any) {
    try {
        // Log information about the operation.
        loggerInfo.info("Search for Enterprise");

        // Extract query parameters from the request.
        const queryParams = req.query;

        // Extract fields and values from query parameters.
        const fields: string[] = Object.keys(queryParams);
        const values: string[] = Object.values(queryParams);

        // Perform the search using generalizedSearch function.
        const result = await generalizedSearch(db.Enterprise, fields, values);

        // Check if any data was found.
        if (!result.length) {
            res.status(404).json({ success: false, message: "Sorry, No Data found for requested search", data: [] });
        }

        // Send the result as a JSON response.
        return res.status(200).json(result);
    } catch (error: any) {
        // Log an error if an exception occurs.
        loggerError.error("Error in search");

        // Send an error response.
        return res.status(400).json(error);
    }
}
