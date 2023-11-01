import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import { error } from "console";

// Repository for object-related operations.
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
    return sendResponseData(false, "No Class ID", {});
  }

  try {
    // Create a new object instance using the provided parameters.
    const object = new db.object(params);

    // Save the new object to the database.
    const data = await object.save();

    // Return a successful response indicating the object was added.
    return sendResponseData(true, "Object added successfully", data);
  } catch (error) {
    // Log the error if there's an issue with the object creation.
    loggerError.error("Error in Object Repo", error);
    // Return a response indicating the failure of the operation.
    return sendResponseData(false, "error", error);
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
    return sendResponseData(false, "no id", error);
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
    return sendResponseData(false, "error", error);
  }
}
async function getObjectById(params: any) {
  // Log the initiation of fetching Objects, ClassTags, and ObjectValues data By ObjectId.
  loggerInfo.info("Fetching Objects, ClassTags, and ObjectValues data");
  // Validate that an ID is provided.
  if (!params.query.objectId && !params.query.classId) {
    loggerError.error("No Id is provided");
    return sendResponseData(false, "no id", error);
  }

  try {
    const result = await db.object.findAll({
      where: { id: params.query.objectId }, // This will filter by classId
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
    return sendResponseData(false, "error", error);
  }
}

async function _delete(params: any) {
  return await db.object.destroy({
    where: {
      id: params,
    },
  });
}
