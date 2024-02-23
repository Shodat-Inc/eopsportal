import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import { paginateQuery } from "../constant/pagination";
import { Op } from "sequelize";

/**
 * Repository for handling Model related operations.
 */
export const modelRepo = {
  create,
  getAllModel,
  update,
  searchAiModel
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

async function getAllModel(params: any) {
  try {
    // Log an information message using the 'loggerInfo' instance
    loggerInfo.info("Get All the Models");

    const page = params.query.page || 1;
    const pageSize = params.query.pageSize || 10;
    let sortOrder = 'DESC'; // Default sorting order is DESC
    let sortField = "id";

    // Check if sortBy parameter is provided and valid
    if (params.query.sortBy && ['ASC', 'DESC'].includes(params.query.sortBy.toUpperCase())) {
      sortOrder = params.query.sortBy.toUpperCase();
    }
    if (params.query.sort && ['id', 'modelName', 'modelTitle', 'modelSubTitle'].includes(params.query.sort)) {
      sortField = params.query.sort;
    }

    const result = await paginateQuery(db.Model, page, pageSize, {

      // Fetch all Model records with specific attributes
      // const getData = await db.Model.findAll({
      attributes: [
        "id",
        "modelName",
        "modelTitle",
        "modelSubTitle",
        "howItWorks",
        "benefits",
      ],
      order: [[sortField, sortOrder]],
    });

    // If no data is found, return an error response
    if (!result.rows.length) {
      return sendResponseData(false, "Data Doesn't Exist", {});
    }

    // Return a successful response with the fetched data
    return sendResponseData(true, "Data Fetched Successfully", result);
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

async function searchAiModel(params: any) {
  try {
    loggerInfo.info("Search AI Model");

    const columnName: string = Object.keys(params.query)[0];
    const searchValue = params.query[columnName];

    const allowedColumns = ['modelName', 'modelTitle', 'modelSubTitle'];
    if (!allowedColumns.includes(columnName)) {
      return sendResponseData(false, "Invalid column name", {});
    }

    const whereCondition = {
      [columnName]: {
        [Op.like]: `%${searchValue}%`
      }
    };

    const data = await db.Model.findAll({
      where: whereCondition
    });

    return sendResponseData(true, "Search results for AI Model", data);
  } catch (error) {
    loggerError.error("Error in Searching AI Model", error);
    return sendResponseData(false, "Error in Searching AI Model", error);
  }
}
