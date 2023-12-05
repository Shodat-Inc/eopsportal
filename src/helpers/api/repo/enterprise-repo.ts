import { loggerError, loggerInfo } from "@/logger";
import { db } from "../db";
import sendResponseData from "@/helpers/constant";

/**
 * Repository for handling operations related to enterprises.
 */
export const enterpriseRepo = {
  create,
  getAllData,
  getDataById,
  update,
  delete: _delete,
};

/**
 * Creates a new enterprise entry in the database.
 *
 * @param {any} params - The parameters containing information for creating an enterprise entry.
 * @returns {Promise<object>} A promise that resolves with the result of the database operation.
 */
async function create(params: any) {
  try {
    // Log information about the function execution
    loggerInfo.info("Create Enterprise Repo");

    // Check if an enterprise with the given name already exists
    const enterprise = await db.Enterprise.findOne({
      where: { enterpriseName: params.enterpriseName },
    });

    // If the enterprise already exists, return an error response
    if (enterprise) {
      return sendResponseData(false, "Enterprise Already Exists", []);
    }

    // Create a new enterprise entry using Sequelize model
    const newEnterprise = new db.Enterprise(params);
    const save = await newEnterprise.save();

    // Return a successful response with the created enterprise entry
    return sendResponseData(true, "Enterprise Created Successfully", save);
  } catch (error: any) {
    // Log error information in case of an exception
    loggerError.error("Error in Enterprise Repo");

    // Return an error response in case of an exception during enterprise creation
    return sendResponseData(false, "Error In Creating Enterprise", []);
  }
}

/**
 * Retrieves all enterprise data from the database.
 *
 * @returns {Promise<Array<object>>} A promise that resolves with an array of enterprise data.
 */
async function getAllData() {
  // Log information about the function execution
  loggerInfo.info("GET all the Enterprises");

  // Fetch all enterprise data from the database using Sequelize findAll method
  // The 'attributes' option specifies the fields to be included in the result
  return await db.Enterprise.findAll({
    attributes: [
      "id",
      "enterpriseName",
      "enterpriseIndustry",
      "founderYear",
      "website",
      "description",
      "employeeCount",
      "superAdminName",
      "status"
    ],
  });
}

/**
 * Retrieves enterprise data from the database based on the provided ID.
 *
 * @param {any} params - The parameters containing the ID for fetching enterprise data.
 * @returns {Promise<object>} A promise that resolves with the result of the database query.
 */
async function getDataById(params: any) {
  try {
    // Log information about the function execution
    loggerInfo.info("Fetching Enterprise user by id");

    // Check if the ID is provided in the parameters
    if (!params.id) {
      return sendResponseData(false, "Id is not provided", [])
    }

    // Fetch enterprise data from the database using Sequelize findAll method
    const result = await db.Enterprise.findAll({
      where: {
        id: params.id,
      },
      attributes: ["enterpriseName",
        "enterpriseIndustry",
        "founderYear",
        "website",
        "description",
        "employeeCount",
        "superAdminName",
        "status"]
    });

    // If no data is found for the provided ID, return an error response
    if (result.length === 0) {
      return sendResponseData(false, "Data Doesn't Exist", [])
    }

    // Return a successful response with the fetched enterprise data
    return sendResponseData(true, "Data fetched By Id", result)
  } catch (error: any) {
    // Log error information in case of an exception
    loggerError.error("Error in enterprise repo")

    // Return an error response in case of an exception during data fetching
    return sendResponseData(false, "Error in fetching Enterprise Data", [])
  }
}

/**
 * Updates enterprise data in the database based on the provided parameters.
 *
 * @param {any} params - The parameters containing information for updating enterprise data.
 * @returns {Promise<object>} A promise that resolves with the result of the database operation.
 */
async function update(params: any) {
  try {
    // Log information about the function execution
    loggerInfo.info("Updating Enterprise Data");

    // Find the enterprise data in the database based on the provided ID
    const data = await db.Enterprise.findOne({
      where: { id: params.id }
    });

    // Define the properties to update
    const propertiesToUpdate = [
      "enterpriseName",
      "enterpriseIndustry",
      "founderYear",
      "website",
      "description",
      "employeeCount",
      "superAdminName",
      "status"
    ];

    // Update the enterprise data fields based on the provided parameters
    propertiesToUpdate.forEach((property) => {
      if (params[property]) {
        data[property] = params[property];
      }
    });

    // Save the updated enterprise data
    const response = await data.save();

    // If no data is found for the provided ID, return an error response
    if (!data) {
      return sendResponseData(false, "Data doesn't Exist", []);
    }

    // Return a successful response with the updated enterprise data
    return sendResponseData(true, "Updated Data", response);
  } catch (error: any) {
    // Log error information in case of an exception
    loggerError.error("Error in enterprise repo");

    // Return an error response in case of an exception during data updating
    return sendResponseData(false, "Error in updating Enterprise Data", []);
  }
}

/**
 * Deletes enterprise data from the database based on the provided ID.
 *
 * @param {any} params - The parameters containing the ID for deleting enterprise data.
 * @returns {Promise<object>} A promise that resolves with the result of the database operation.
 */
async function _delete(params: any) {
  try {
    // Log information about the function execution
    loggerInfo.info("Enterprise to be deleted");

    // Check if the ID is provided in the parameters
    if (!params.id) {
      return sendResponseData(false, "Id is not provided", []);
    }

    // Find the enterprise data in the database based on the provided ID
    const data = await db.Enterprise.findOne({
      where: { id: params.id }
    });

    // If no data is found for the provided ID, return an error response
    if (!data) {
      return sendResponseData(false, "Data doesn't Exist", []);
    }

    // Delete the enterprise data
    await data.destroy();

    // Return a successful response after deleting the enterprise data
    return sendResponseData(true, "Enterprise Data deleted Successfully", []);

  } catch (error: any) {
    // Log error information in case of an exception
    loggerError.error("Error in enterprise repo");

    // Return an error response in case of an exception during data deletion
    return sendResponseData(false, "Error in deleting data", []);
  }
}
