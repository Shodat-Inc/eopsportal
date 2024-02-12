import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";

/**
 * Repository for handling Model related operations.
 */
export const modelRepo = {
  create,
  getAllModel,
  update,
};

async function create(params: any) {
  try {
    // Log an information message using the 'loggerInfo' instance
    loggerInfo.info("Creating Models");

    // Check if a model with the same 'modelName' already exists in the database
    const data = await db.Model.findOne({
      where: {
        modelName: params.modelName,
      },
    });

    // If a model with the same name already exists, return an error response
    if (data) {
      return sendResponseData(false, "Model Name already Exists", {});
    }

    // Create a new Model instance with the provided 'params'
    const newModel = new db.Model(params);

    // Save the new Model instance to the database
    const save = await newModel.save();

    // Return a successful response with the saved data
    return sendResponseData(true, "Model Created Successfully", save);
  } catch (error: any) {
    // Log an error message using the 'loggerError' instance
    loggerError.error("Error in Model Repo", error);

    // Return an error response
    return sendResponseData(false, "Error in Model Repo", error);
  }
}

async function getAllModel() {
  try {
    // Log an information message using the 'loggerInfo' instance
    loggerInfo.info("Get All the Models");

    // Fetch all Model records with specific attributes
    const getData = await db.Model.findAll({
      attributes: [
        "id",
        "modelName",
        "modelTitle",
        "modelSubTitle",
        "howItWorks",
        "benefits",
      ],
    });

    // If no data is found, return an error response
    if (!getData) {
      return sendResponseData(false, "Data Doesn't Exist", {});
    }

    // Return a successful response with the fetched data
    return sendResponseData(true, "Data Fetched Successfully", getData);
  } catch (error: any) {
    // Log an error message using the 'loggerError' instance
    loggerError.error("Error in Get Models", error);

    // Return an error response
    return sendResponseData(false, "Error in Get Models", error);
  }
}

async function update(reqData: any, params: any) {
  try {
    // Log an information message using the 'loggerInfo' instance
    loggerInfo.info("Updating the description of Models");

    // Find a Model with the specified 'modelName' in the database
    const data = await db.Model.findOne({
      where: { modelName: reqData.modelName },
    });

    // If no Model is found with the specified 'modelName', return an error response
    if (!data) {
      return sendResponseData(false, "Model Name doesn't exist", []);
    }

    // Define the properties that can be updated
    const propertiesToUpdate = [
      "modelTitle",
      "modelSubTitle",
      "howItWorks",
      "benefits",
    ];

    // Iterate over each property and update the data if it exists in 'params'
    propertiesToUpdate.forEach((property) => {
      if (params[property] !== undefined) {
        // Handling for "benefits" to update individual keys
        if (property === "benefits" && typeof params.benefits === "object") {
          // Merge the existing benefits with the new benefits
          data.benefits = { ...data.benefits, ...params.benefits };
        } else {
          // Update the property with the value from 'params'
          data[property] = params[property];
        }
      }
    });

    // Save the updated data to the database
    const response = await data.save();

    // Return a successful response with the updated data
    return sendResponseData(
      true,
      "Model's Data Updated Successfully",
      response
    );
  } catch (error: any) {
    // Log an error message using the 'loggerError' instance
    loggerError.error("Error in Model Repo", error);

    // Return an error response
    return sendResponseData(false, "Error in Model Repo", error);
  }
}
