import { loggerError, loggerInfo } from "@/logger";
import { db } from "../db";
import sendResponseData from "@/helpers/constant";

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
    const data = new db.ModelData(params,{transaction});

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

async function get(modelId: any, userId: any) {
  // Log an information message using the 'loggerInfo' instance
  loggerInfo.info("Get Images");

  try {
    // Fetch all Image records with specific attributes and associated ModelData
    const data = await db.Image.findAll({
      attributes: ["url", "type"],
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
    if (data.length === 0) {
      return sendResponseData(false, "No data Found", []);
    }

    // Return a successful response with the fetched data
    return sendResponseData(true, "Data Fetched Successfully", data);
  } catch (error: any) {
    // Log an error message using the 'loggerError' instance
    loggerError.error("Error");

    // Return an error response
    return sendResponseData(false, "Error In data Fetching", error);
  }
}
