import { apiHandler, db } from "@/helpers/api";
import { generalizedSearch } from "@/helpers/api/search/search";
import { loggerError, loggerInfo } from "@/logger";
const { Op } = require('sequelize');
import { Sequelize } from "sequelize";

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
        const data = await db.object.findAll({
            where: {
                serialId: Object.values(query),
            },
            attributes: ["id", "serialId",],
            include: [
                {
                    model: db.AddValues,
                    attributes: ["values"],
                    required: true,
                    include: [
                        {
                            model: db.classTag,
                            attributes: ["tagName"],
                            required: true,
                            where: {
                                id: Sequelize.col("classTagId"),
                            },
                        },
                    ],
                }]
        })
        // // Define the fields to search in object
        // const field: string[] = Object.keys(query);
        // const value: string[] = Object.values(query);

        // // Perform the search using generalizedSearch function
        // const result = await generalizedSearch(db.object, field, value);

        // Return the result as a JSON response
        return res.status(200).json(data);
    } catch (error: any) {
        // Log the error
        loggerError.error("Error in Searching Object");

        // Return an error response
        return res.status(400).json(error);
    }
}
