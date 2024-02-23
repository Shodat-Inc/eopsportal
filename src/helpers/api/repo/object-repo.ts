import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import message from "@/util/responseMessage";
import { generateRandomAlphaNumeric } from "../../../util/helper";
import { classTagRepo } from "./classTag-repo";
import { paginateQuery } from "../constant/pagination";
import { Op, Sequelize } from "sequelize";

/**
 * Repository for handling object related operations.
 */
export const objectRepo = {
  create,
  get,
  getObjectById,
  delete: _delete,
  getObjectValues,
  getObjectValuesOnValues,
};

/**
 * Asynchronously creates a new object entry in the database.
 *
 * @param {Object} params - The parameters containing information to save the object.
 * @returns {Object} - Response object indicating the success or failure of the operation.
 */
async function create(params: any, transaction: any) {
  // Log the initiation of object creation.
  loggerInfo.info("Object Repo");

  // Validate that a class ID is provided.
  if (!params.classId) {
    loggerError.error("No Class id Provided");
    return sendResponseData(false, message.error.noClassID, {});
  }

  try {
    const serialId = await generateRandomAlphaNumeric({
      model: db.Object,
      transaction,
      prefix: "OBJ",
    });
    const updatedData = {
      ...params,
      serialId,
    };
    // Create a new object instance using the provided parameters.
    const object = new db.object(updatedData, { transaction });

    // Save the new object to the database.
    const data = await object.save({ transaction });

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
async function get(params: any) {
  // Log the initiation of fetching Objects, ClassTags, and ObjectValues data.
  loggerInfo.info("Fetching Objects, ClassTags, and ObjectValues data");

  try {
    let result;
    let obj = {};

    let sortOrder = 'DESC'; // Default sorting order is DESC
    let sortField = "id";

    // Check if sortBy parameter is provided and valid
    if (params.query.sortBy && ['ASC', 'DESC'].includes(params.query.sortBy.toUpperCase())) {
      sortOrder = params.query.sortBy.toUpperCase();
    }
    if (params.query.sort && ['id', 'className', 'values'].includes(params.query.sort)) {
      sortField = params.query.sort;
    }

    if (params.query.parentJoinKey) {
      obj = { id: params.query.parentJoinKey };
    }
    if (params.query.id) {
      result = await paginateQuery(
        db.object,
        params.query.page || 1,
        params.query.pageSize || 10,
        {
          include: [
            {
              model: db.AddClasses,
              where: { id: params.query.id }, // This will filter by classId
              attributes: ["id", "superParentId", "parentId", "serialId", "createdAt",],
              order: [[sortField, sortOrder]],
              include: [
                {
                  model: db.classTag,
                  attributes: ["tagName"],
                },
                {
                  model: db.parentJoinKey,
                  where: obj, // This will filter by classId
                  attributes: ["id", "parentTagId", "createdAt"],
                  required: false,
                },
              ],
            },
            {
              model: db.AddValues,
              attributes: ["id", "values", "createdAt"],
            },
          ],
        }
      );
    } else if (params.query.keyword) {
      const page = params.query.page || 1; // Default to page 1 if not provided
      const pageSize = params.query.pageSize || 10; // Default page size to 10 if not provided

      const { totalItems, totalPages, currentPage, rows } = await paginateQuery(
        db.AddValues,
        page,
        pageSize,
        {
          where: {
            values: {
              [Op.like]: `%${params.query.keyword}%`
            }
          },
          required: true,
          include: [
            {
              model: db.classTag,
              required: true,
              attributes: ["tagName", "dataTypeId", "classId"],
              include: [
                {
                  model: db.AddClasses,
                  required: true,
                  where: { userId: params.userId },
                },
              ],
            },
          ],
          order: [[sortField, sortOrder]],
        }
      );

      const modifiedData = rows.map((item: any) => ({
        Class: {
          id: item.classTag?.classId,
          serialId: item.classTag?.Class?.serialId,
          className: item.classTag?.Class?.className,
          userId: item.classTag?.Class?.userId,
          createdAt: item.classTag?.Class?.createdAt,
          updatedAt: item.classTag?.Class?.updatedAt,
          ClassTags: [
            {
              tagName: item.classTag?.tagName,
              dataTypeId: item.classTag?.dataTypeId,
              classId: item.classTag?.classId,
            },
          ],
        },
        ObjectValues: [
          {
            id: item.id,
            values: item.values,
            classTagId: item.classTagId,
            objectId: item.objectId,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          },
        ],
      }));

      if (!modifiedData.length) {
        return sendResponseData(false, "Data Not Found", {});
      }

      return sendResponseData(
        true,
        "Object with its tag value fetched successfully",
        {
          totalItems,
          totalPages,
          currentPage,
          pageSize,
          rows: modifiedData,
        }
      );
    }
    if (!result || !result.rows.length) {
      return sendResponseData(false, "Object Do not Exist", {});
    }

    const data: any = {};
    for (let i of result.rows) {
      const pjk = i.Class.ParentJoinKeys;
      for (let j of pjk) {
        let tagQuery = await classTagRepo.getParentTagValue(j.parentTagId);
        data[`${tagQuery.tagName}`] = tagQuery.ObjectValues[0].values;
        i.dataValues.parentJoinValues = data;
      }
    }
    return sendResponseData(true, "Object fetched Successfully", result);
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
    let sortOrder = 'DESC'; // Default sorting order is DESC

    // Check if sortBy parameter is provided and valid
    if (params.query.sortBy && ['ASC', 'DESC'].includes(params.query.sortBy.toUpperCase())) {
      sortOrder = params.query.sortBy.toUpperCase();
    }
    let sortField = "id";
    if (params.query.sort && ['id', 'className', 'values', 'objectName'].includes(params.query.sort)) {
      sortField = params.query.sort;
    }
    // Fetch data from the database based on ObjectId and ClassId
    const result = await paginateQuery(
      db.object,
      params.query.page || 1,
      params.query.pageSize || 10,
      {
        where: { id: params.query.objectId }, // This will filter by ObjectId
        include: [
          {
            model: db.AddClasses,
            where: { id: params.query.classId },
            attributes: ["id", "superParentId", "parentId", "serialId"],
            order: [[sortField, sortOrder]],
            include: [
              {
                model: db.classTag,
                attributes: ["id", "tagName"],
              },
              {
                model: db.parentJoinKey,
                attributes: ["id", "parentTagId", "createdAt"],
              },
            ],
          },
          {
            model: db.AddValues,
            attributes: ["id", "values", "createdAt"],
          },
        ],
      }
    );

    const data: any = {};
    for (let i of result.rows) {
      const pjk = i.Class.ParentJoinKeys;
      for (let j of pjk) {
        let tagQuery = await classTagRepo.getParentTagValue(j.parentTagId);
        data[`${tagQuery.tagName}`] = tagQuery.ObjectValues[0].values;
        i.dataValues.parentJoinValues = data;
      }
    }
    if (!result.rows.length) {
      return sendResponseData(false, "Object Do not Exist", {});
    }
    return sendResponseData(true, "Object fetched Successfully", result);

    // Map the result to add serial numbers
    // return result.map((item: any, index: any) => ({
    //   S_No: index + 1,
    //   ...item.get(), // Convert Sequelize instance to plain JS object
    // }));
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

async function getObjectValues(params: any) {
  loggerInfo.info("Get all the Object Values");
  try {
    // Convert keyword to lowercase for case-insensitive comparison
    const keyword = params.query.keyword.toLowerCase();
    let sortOrder = 'DESC'; // Default sorting order is DESC
    let sortField = "id";

    // Check if sortBy parameter is provided and valid
    if (params.query.sortBy && ['ASC', 'DESC'].includes(params.query.sortBy.toUpperCase())) {
      sortOrder = params.query.sortBy.toUpperCase();
    }
    if (params.query.sort && ['id', 'className', 'values'].includes(params.query.sort)) {
      sortField = params.query.sort;
    }

    const objResult = await db.AddValues.findAll({
      where: {
        values: {
          [Op.like]: `%${keyword}%`
        }
      },
      order: [[sortField, sortOrder]],
      include: [
        {
          model: db.object,
          attributes: [],
          required: true,
          include: [
            {
              model: db.AddClasses,
              where: { userId: params.auth.sub },
              attributes: [],
            }
          ]
        },
      ],
    });

    const classResult = await db.AddClasses.findAll({
      where: {
        className: keyword,
        userId: params.auth.sub,
      },
      attributes: [
        "id",
        "serialId",
        "className",
        "userId",
        "enterpriseId",
        "superParentId",
        "parentId",
      ],
      include: [
        {
          model: db.object,
          where: { id: Sequelize.col("Class.id") },
          attributes: [
            "id",
            "serialId",
            "classId",
            "superParentId",
            "parentId",
          ],
          required: false,
          include: [
            {
              model: db.AddValues,
              where: { objectId: Sequelize.col("Objects.id") },
              attributes: ["id", "values", "classTagId", "objectId"],
              order: [[sortField, sortOrder]],
              required: false,
            },
          ],
        },
      ],
    });

    // If data found in db.AddClasses, return the result
    const response = { objResult, classResult };
    if (!response.objResult.length && !response.classResult.length) {
      return sendResponseData(false, "No data Found", []);
    }
    // If data not found in both tables
    return sendResponseData(true, "Data Fetched Sucessfully", response);
  } catch (error) {
    loggerError.error("Error in fetching object values", error);
    return sendResponseData(false, "Error in fetching object values", error);
  }
}

async function getObjectValuesOnValues(params: any) {
  loggerInfo.info("Getting Object Values on Values");
  try {
    let result;
    const page = params.query.page || 1;
    const pageSize = params.query.pageSize || 10;
    let sortOrder = 'DESC'; // Default sorting order is DESC
    let sortField = "id";

    // Check if sortBy parameter is provided and valid
    if (params.query.sortBy && ['ASC', 'DESC'].includes(params.query.sortBy.toUpperCase())) {
      sortOrder = params.query.sortBy.toUpperCase();
    }
    if (params.query.sort && ['id', 'values'].includes(params.query.sort)) {
      sortField = params.query.sort;
    }

    result = await paginateQuery(db.AddValues, page, pageSize, {
      where: {
        objectId: params.query.objectId,
      },
      order: [[sortField, sortOrder]],
    });
    if (!result.rows.length) {
      return sendResponseData(false, "No Data Found", {});
    }
    return sendResponseData(
      true,
      "Object Values and its related object Values fetched Successfully",
      result
    );
  } catch (error) {
    loggerError.error("Error in getting Object Values related to value", error);
    return sendResponseData(
      false,
      "Error in getting Object Values related to value",
      error
    );
  }
}
