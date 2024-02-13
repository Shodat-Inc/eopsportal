import { apiHandler, db } from "@/helpers/api";
import { paginateQuery } from "@/helpers/api/constant/pagination";
import { generalizedSearch } from "@/helpers/api/search/search";
import { loggerError, loggerInfo } from "@/logger";
import { Sequelize } from "sequelize";
const { Op } = require('sequelize');

// Handle GET requests with the search function
export default apiHandler({
  get: search,
});

async function search(req: any, res: any) {
  // Log information about the request
  loggerInfo.info("Search Class");

  try {
    // Extract the query parameter from the request
    const query = req.query;

    const page = req.query.page || 1; // Default to page 1 if not provided
    const pageSize = req.query.pageSize || 10; // Default page size to 10 if not provided

    const result = await paginateQuery(db.AddClasses, page, pageSize, {
      where: {
        userId: req.auth.sub,
        [Op.or]: [
          { className: Object.values(query) },
          { serialId: Object.values(query) },
        ],
      },
      attributes: ["id", "serialId", "className", "userId"],
      include: [
        {
          model: db.classTag,
          attributes: ["id", "tagName", "createdAt", "dataTypeId"],
          // required: true, 
          include: [
            {
              model: db.tagDataType,
              attributes: ["name"],
              required: true,
              where: {
                id: Sequelize.col("dataTypeId"),
              },
            },
          ],
        }]
    })

    // Define the fields to search in class
    // const field: string[] = Object.keys(query);
    // const value: string[] = Object.values(query);

    // Perform the search using generalizedSearch function
    // const result = await generalizedSearch(db.AddClasses, field, value);

    // Return the result as a JSON response
    return res.status(200).json(result);
  } catch (error: any) {
    // Log the error
    loggerError.error("Error in searching class");

    // Return an error response
    return res.status(400).json(error);
  }
}
