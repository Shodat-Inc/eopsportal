import { loggerError, loggerInfo } from "@/logger";
import { db } from "../db";
import sendResponseData from "@/helpers/constant";
import { paginateQuery } from "../constant/pagination";

/**
 * Repository for handling Model Data related operations.
 */
export const modelDataRepo = {
  create,
  get,
};

async function create(params: any, transaction: any) {
  try {
    // Log an information message using the 'loggerInfo' instance
    loggerInfo.info("Model Data Entry");

    // Create a new ModelData instance with the provided 'params'
    const data = new db.ModelData(params, { transaction });

    // Save the new ModelData instance to the database
    const result = await data.save({ transaction });

    // Return a successful response with the added data
    return sendResponseData(true, "Data Added Successfully", result);
  } catch (error: any) {
    // Log an error message using the 'loggerError' instance
    loggerError.error("Error In ModelDataRepo", error);

    // Return an error response
    return sendResponseData(false, "Error in saving Data", error);
  }
}

async function get(modelId: any, userId: any, type: any) {
  // Log an information message using the 'loggerInfo' instance
  loggerInfo.info("Get Images");

  try {
    const page = type.page || 1;
    const pageSize = type.pageSize || 10;

    // Fetch all Image records with specific attributes and associated ModelData
    const result = await paginateQuery(db.Image, page, pageSize, {
      attributes: [["id", "modelObjectImageId"], "url", "type"],
      where: { type: type.type },
      include: [
        {
          // Specify the association with the ModelData model
          model: db.ModelData,
          // Define conditions for the association
          where: { modelId: modelId, userId: userId },
        },
      ],
    });

    // If no data is found, return an error response
    if (!result.rows.length) {
      return sendResponseData(false, "No data Found", []);
    }

    // Return a successful response with the fetched data
    return sendResponseData(true, "Data Fetched Successfully", result);
  } catch (error: any) {
    // Log an error message using the 'loggerError' instance
    loggerError.error("Error");

    // Return an error response
    return sendResponseData(false, "Error In data Fetching", error);
  }
}
