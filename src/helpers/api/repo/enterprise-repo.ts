import { loggerError, loggerInfo } from "@/logger";
import { db } from "../db";
import sendResponseData from "@/helpers/constant";
import message from "@/util/responseMessage";

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
async function create(params: any, transaction: any) {
  try {
    // Log information about the function execution
    loggerInfo.info("Create Enterprise Repo");

    // Check if an enterprise with the given name already exists
    const enterprise = await db.Enterprise.findOne({
      where: { enterpriseName: params.enterpriseName },
    }, { transaction });

    // If the enterprise already exists, return an error response
    if (enterprise) {
      return sendResponseData(false, "Enterprise Already Exists", []);
    }

    // Create a new enterprise entry using Sequelize model
    const newEnterprise = new db.Enterprise(params, { transaction });
    const save = await newEnterprise.save({ transaction });

    // Return a successful response with the created enterprise entry
    return sendResponseData(true, message.success.enterpriseCreated, save);
  } catch (error: any) {
    // Log error information in case of an exception
    loggerError.error("Error in Enterprise Repo");

    // Return an error response in case of an exception during enterprise creation
    return sendResponseData(false, message.error.errorCreateEnterpriseUser, []);
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
    if (!result.length) {
      return sendResponseData(false, message.error.dataNotExist, [])
    }

    // Return a successful response with the fetched enterprise data
    return sendResponseData(true, message.success.dataFetchedById, result)
  } catch (error: any) {
    // Log error information in case of an exception
    loggerError.error("Error in enterprise repo")

    // Return an error response in case of an exception during data fetching
    return sendResponseData(false, message.error.errorFetchingEnterpriseData, [])
  }
}

/**
 * Updates enterprise data in the database based on the provided parameters.
 *
 * @param {any} params - The parameters containing information for updating enterprise data.
 * @returns {Promise<object>} A promise that resolves with the result of the database operation.
 */
async function update(params: any, reqAuth: any) {
  try {
    // Log information about the function execution
    loggerInfo.info("Updating Enterprise Data");

    // Find the enterprise data in the database based on the provided ID
    const data = await db.Enterprise.findOne({
      where: { id: reqAuth.enterpriseId }
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
      return sendResponseData(false, message.error.dataNotExist, []);
    }

    // Return a successful response with the updated enterprise data
    return sendResponseData(true, message.success.updated, response);
  } catch (error: any) {
    // Log error information in case of an exception
    loggerError.error("Error in enterprise repo");

    // Return an error response in case of an exception during data updating
    return sendResponseData(false, message.error.errorUpdatingEnterpriseData, []);
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
      return sendResponseData(false, message.error.idNotProvided, []);
    }

    // Find the enterprise data in the database based on the provided ID
    const data = await db.Enterprise.findOne({
      where: { id: params.id }
    });

    // If no data is found for the provided ID, return an error response
    if (!data) {
      return sendResponseData(false, message.error.dataNotExist, []);
    }

    // Delete the enterprise data
    await data.destroy();

    // Return a successful response after deleting the enterprise data
    return sendResponseData(true, message.success.enterpriseDataDeleted, []);

  } catch (error: any) {
    // Log error information in case of an exception
    loggerError.error("Error in enterprise repo");

    // Return an error response in case of an exception during data deletion
    return sendResponseData(false, message.error.errorDeletingData, []);
  }
}
