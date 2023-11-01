import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import message from "@/util/responseMessage";
import { Sequelize } from "sequelize";
import { classTagRepo } from "./classTag-repo";

// Repository for Class-related operations.
export const classRepo = {
  create,
  getClassData,
  getSubClass,
  update,
  delete: _delete,
  getClassDataByID,
  getSubClassByID,
};

/**
 * Asynchronously creates a new class entry in the database.
 *
 * @param {Object} params - The parameters containing information to save the class.
 * @returns {Object} - Response object indicating the success or failure of the operation.
 */
async function create(params: any) {
  // Log the initiation of class creation.
  loggerInfo.info("Create Class Repo:");

  try {
    // Validate that the class name doesn't already exist.
    let class_data = await db.AddClasses.findOne({
      where: { className: params.className },
    });
    if (class_data) {
      return sendResponseData(false, "Class already exist", {});
    }

    // Create and save the new class instance.
    const classes = new db.AddClasses(params);
    const data = await classes.save();
    return sendResponseData(true, "Class added successfully", data);
  } catch (error) {
    // Log the error if there's an issue with the class creation.
    loggerError.error("Error in class repo", error);
    return sendResponseData(false, "error", error);
  }
}

/**
 * Fetch all classes and associated tags for a given user where the parentId is null.
 *
 * @param {Object} req - The request object containing the user ID.
 * @returns {Array} - An array of classes and associated tags or an error response.
 */
async function getClassData(params: any) {
  try {
    // Log the initiation of fetching classes and tags.
    loggerInfo.info("Fetching all class and classTags data");

    const result = await db.AddClasses.findAll({
      where: {
        userId: params.id,
        parentId: null,
      },
      attributes: ["className"],
      include: [
        {
          model: db.classTag,
          attributes: ["tagName", "createdAt", "dataTypeId"],
          required: true, // Makes it an INNER JOIN
          include: [
            {
              model: db.tagDataType,
              attributes: ["name"],
              required: true, // Makes it an INNER JOIN
              where: {
                id: Sequelize.col("dataTypeId"),
              },
            },
          ],
        },
      ],
    });
    return result.map((item: any, index: any) => ({
      serialNumber: index + 1,
      ...item.get(), // Convert Sequelize instance to plain JS object
    }));
  } catch (error) {
    // Log the error if fetching classes and tags fails.
    loggerError.error("Error fetching class and classTags data:", error);
    return sendResponseData(false, "error", error);
  }
}

//Fetch class By ID
async function getClassDataByID(params: any) {
  try {
    // Log the initiation of fetching classes and tags.
    loggerInfo.info("Fetching all class and classTags data on class ID");

    if (!params.id) {
      throw "NO ID exist";
    }
    const result = await db.AddClasses.findAll({
      where: {
        id: params.id,
        parentId: null,
      },
      attributes: ["className"],
      include: [
        {
          model: db.classTag,
          attributes: ["tagName", "createdAt", "dataTypeId"],
          required: true, // Makes it an INNER JOIN
          include: [
            {
              model: db.tagDataType,
              attributes: ["name"],
              required: true, // Makes it an INNER JOIN
              where: {
                id: Sequelize.col("dataTypeId"),
              },
            },
          ],
        },
      ],
    });
    if (result.length === 0) {
      return sendResponseData(false, "No data found", []);
    }

    return result.map((item: any, index: any) => ({
      serialNumber: index + 1,
      ...item.get(), // Convert Sequelize instance to plain JS object
    }));
  } catch (error) {
    // Log the error if fetching classes and tags fails.
    loggerError.error("Error fetching class and classTags data by ID:", error);
    return sendResponseData(false, "error", error);
  }
}
/**
 * Fetch all subclasses and associated tags for a given user based on a parent class ID.
 *
 * @param {Object} param - The request object containing the user ID and query for the parent class ID.
 * @returns {Array} - An array of subclasses and associated tags or an error response.
 */
async function getSubClass(param: any) {
  try {
    // Log the initiation of fetching subclasses and tags.
    loggerInfo.info("Fetching all subclass and subclassTags data");
    const result = await db.AddClasses.findAll({
      where: {
        userId: param.id,
        parentId: param.query.id,
      },
      attributes: ["className"],
      include: [
        {
          model: db.classTag,
          attributes: ["tagName", "createdAt", "dataTypeId"],
          required: true, // Makes it an INNER JOIN
          include: [
            {
              model: db.tagDataType,
              attributes: ["name"],
              required: true, // Makes it an INNER JOIN
              where: {
                id: Sequelize.col("dataTypeId"),
              },
            },
          ],
        },
        {
          model: db.parentJoinKey,
          attributes: ["parentTagId"],
          required: true, // Makes it an INNER JOI
        },
      ],
    });
    if (result.length === 0) {
      return sendResponseData(false, "No data found", []);
    }
    // Get Parent Join Tag Name
    for (let x of result) {
      let parentKey = x.ParentJoinKeys;
      for (let y of parentKey) {
        let tagQuery = await classTagRepo.getParentJoinTags(y.parentTagId);
        y.dataValues.tagname = tagQuery.tagName;
      }
    }
    const response = result.map((item: any, index: any) => ({
      S_No: index + 1,
      ...item.get(),
    }));
    return response;
  } catch (error) {
    // Log the error if fetching subclasses and tags fails.
    loggerError.error("Error fetching class and classTags data:", error);
    return sendResponseData(false, "error", error);
  }
}
async function getSubClassByID(param: any) {
  console.log();
  try {
    // Log the initiation of fetching subclasses and tags.
    loggerInfo.info("Fetching subclass and subclassTags data by ID");
    const result = await db.AddClasses.findAll({
      where: {
        id: param.query.classId,
        parentId: param.query.parentId,
      },
      attributes: ["className"],
      include: [
        {
          model: db.classTag,
          attributes: ["tagName", "createdAt", "dataTypeId"],
          required: true, // Makes it an INNER JOIN
          include: [
            {
              model: db.tagDataType,
              attributes: ["name"],
              required: true, // Makes it an INNER JOIN
              where: {
                id: Sequelize.col("dataTypeId"),
              },
            },
          ],
        },
        {
          model: db.parentJoinKey,
          attributes: ["parentTagId"],
          required: true, // Makes it an INNER JOI
        },
      ],
    });
    if (result.length === 0) {
      return sendResponseData(false, "No data found", []);
    }
    // Get Parent Join Tag Name
    for (let x of result) {
      let parentKey = x.ParentJoinKeys;
      for (let y of parentKey) {
        let tagQuery = await classTagRepo.getParentJoinTags(y.parentTagId);
        y.dataValues.tagname = tagQuery.tagName;
      }
    }
    const response = result.map((item: any, index: any) => ({
      S_No: index + 1,
      ...item.get(),
    }));
    return response;
  } catch (error) {
    // Log the error if fetching subclasses and tags fails.
    loggerError.error("Error fetching class and classTags data:", error);
    return sendResponseData(false, "error", error);
  }
}

async function update(params: any) {
  try {
    loggerInfo.info("Update Class Name");
    const classes = await db.AddClasses.findOne({
      where: { id: params.id },
    });
    if (!classes) throw "Class with this id not found";
    if (
      classes.className !== params.className &&
      (await db.AddClasses.findOne({ where: { className: params.className } }))
    ) {
      throw 'Class Name"' + params.className + '" is already taken';
    }
    classes.className = params.className;
    return await classes.save();
  } catch (error: any) {
    loggerError.error("Error in Updating class", error);
    return sendResponseData(false, message.error, error);
  }
}

async function _delete(params: any) {
  const classes = await db.AddClasses.findByPk(params);
  if (!classes) throw "Class doesn't exist";
  return await classes.destroy();
}
