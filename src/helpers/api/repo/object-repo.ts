import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import { error } from "console";
import message from "@/util/responseMessage";

/**
 * Repository for handling object related operations.
 */
export const objectRepo = {
  create,
  get,
  getObjectById,
  delete: _delete,
};

/**
 * Asynchronously creates a new object entry in the database.
 *
 * @param {Object} params - The parameters containing information to save the object.
 * @returns {Object} - Response object indicating the success or failure of the operation.
 */
async function create(params: any) {
  // Log the initiation of object creation.
  loggerInfo.info("Object Repo");

  // Validate that a class ID is provided.
  if (!params.classId) {
    loggerError.error("No Class id Provided");
    return sendResponseData(false, message.error.noClassID, {});
  }

  try {
    // Create a new object instance using the provided parameters.
    const object = new db.object(params);

    // Save the new object to the database.
    const data = await object.save();

    // Return a successful response indicating the object was added.
    return sendResponseData(true, message.success.objectAdded, data);
  } catch (error) {
    // Log the error if there's an issue with the object creation.
    loggerError.error("Error in Object Repo", error);
    // Return a response indicating the failure of the operation.
    return sendResponseData(false, message.error.error, error);
  }
}

/**
 * Fetches Objects, associated ClassTags, and ObjectValues data based on a provided ID.
 *
 * @param {Object} req - The request object containing the ID.
 * @returns {Array} - An array of objects, class tags, and values or an error response.
 */
async function get(id: any) {
  // Log the initiation of fetching Objects, ClassTags, and ObjectValues data.
  loggerInfo.info("Fetching Objects, ClassTags, and ObjectValues data");

  // Validate that an ID is provided.
  if (!id) {
    loggerError.error("NO Id is provided");
    return sendResponseData(false, message.error.noID, error);
  }

  try {
    const result = await db.object.findAll({
      include: [
        {
          model: db.AddClasses,
          where: { id }, // This will filter by classId
          attributes: ["id", "superParentId", "parentId"],
          include: [
            {
              model: db.classTag,
              attributes: ["tagName"],
            },
          ],
        },
        {
          model: db.AddValues,
          attributes: ["values", "createdAt"],
        },
      ],
    });
    return result.map((item: any, index: any) => ({
      S_No: index + 1,
      ...item.get(), // Convert Sequelize instance to plain JS object
    }));
  } catch (error) {
    // Log the error if there's an issue with fetching data.
    loggerError.error(
      "Error fetching Objects, ClassTags, and ObjectValues data:",
      error
    );
    // Return a response indicating the failure of the operation.
    return sendResponseData(false, message.error.error, error);
  }
}

/**
 * Fetches Objects, ClassTags, and ObjectValues data by ObjectId and ClassId.
 *
 * @param {any} params - The parameters containing ObjectId and ClassId for fetching data.
 * @returns {Promise<Array<object>>} A promise that resolves with an array of fetched data.
 */
async function getObjectById(params: any) {
  // Log the initiation of fetching Objects, ClassTags, and ObjectValues data By ObjectId.
  loggerInfo.info("Fetching Objects, ClassTags, and ObjectValues data");

  // Validate that both ObjectId and ClassId are provided.
  if (!params.query.objectId || !params.query.classId) {
    // Log an error if either ObjectId or ClassId is missing.
    loggerError.error("No Id is provided");

    // Return an error response if either ObjectId or ClassId is missing.
    return sendResponseData(false, message.error.noID, []);
  }

  try {
    // Fetch data from the database based on ObjectId and ClassId
    const result = await db.object.findAll({
      where: { id: params.query.objectId }, // This will filter by ObjectId
      include: [
        {
          model: db.AddClasses,
          where: { id: params.query.classId },
          attributes: ["id", "superParentId", "parentId"],
          include: [
            {
              model: db.classTag,
              attributes: ["tagName"],
            },
          ],
        },
        {
          model: db.AddValues,
          attributes: ["values", "createdAt"],
        },
      ],
    });

    // Map the result to add serial numbers
    return result.map((item: any, index: any) => ({
      S_No: index + 1,
      ...item.get(), // Convert Sequelize instance to plain JS object
    }));

  } catch (error) {
    // Log the error if there's an issue with fetching data.
    loggerError.error(
      "Error fetching Objects, ClassTags, and ObjectValues data:",
      error
    );

    // Return an error response in case of an exception during data fetching.
    return sendResponseData(false, message.error.error, error);
  }
}

/**
 * Deletes an object from the database based on the provided object ID.
 *
 * @param {any} params - The parameters containing the object ID for deletion.
 * @returns {Promise<object>} A promise that resolves with the result of the database operation.
 */
async function _delete(params: any) {
  try {
    // Use Sequelize's destroy method to delete the object from the database
    const response = await db.object.destroy({
      where: {
        id: params,
      },
    });

    // Return a successful response after deleting the object
    return sendResponseData(true, message.success.objectDeleted, response);

  } catch (error: any) {
    // Log the error if there's an issue with deleting the object.
    loggerError.error(error);

    // Return an error response in case of an exception during object deletion.
    return sendResponseData(false, message.error.errorDeleteObject, error);
  }
}

