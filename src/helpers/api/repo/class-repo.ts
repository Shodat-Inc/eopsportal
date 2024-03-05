import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import message from "@/util/responseMessage";
import { Sequelize } from "sequelize";
import { classTagRepo } from "./classTag-repo";
import { generateRandomAlphaNumeric } from "../../../util/helper"
import { paginateQuery } from "../constant/pagination";
import { parentJoinKeyRepo } from "./parentJoinRepo";


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
async function create(params: any, transaction: any) {
  loggerInfo.info("Create Class Repo:");

  try {
    // Validate that the class name doesn't already exist.
    let classData;
    if (params.enterpriseId) {
      classData = await db.AddClasses.findOne({
        where: {
          className: params.className,
          enterpriseId: params.enterpriseId,
        },
      },
        { transaction });
    } else {
      classData = await db.AddClasses.findOne({
        where: { className: params.className, enterpriseId: null },
      },
        { transaction });
    }

    if (classData) {
      // Class with the same name already exists.
      return sendResponseData(false, message.error.classExist, {});
    }

    let serialId: string = "";
    if (params.parentId) {
      serialId = await generateRandomAlphaNumeric({
        model: db.AddClasses,
        transaction,
        prefix: "SUBCLS",
      });
    } else {
      serialId = await generateRandomAlphaNumeric({
        model: db.AddClasses,
        transaction,
        prefix: "CLS",
      });
    }

    const updatedData = {
      ...params,
      serialId,
    };

    // Create and save the new class instance.
    const newClass = new db.AddClasses(updatedData, { transaction });
    const savedClass = await newClass.save({ transaction });

    const classId = savedClass.id;

    // Create tags for the class.
    const tagData = params.tags.map((tag: any) => ({
      tagName: tag.tagName,
      dataTypeId: tag.dataTypeId,
      classId: classId,
    }));

    const createdTags = await classTagRepo.bulkCreate(tagData, classId, transaction);

    // Handle primary keys if provided.
    const primaryKeys = params.primaryKeys;
    if (primaryKeys) {
      for (const primaryKey of primaryKeys) {
        for (const createdTag of createdTags.data) {
          if (createdTag.dataValues.tagName === primaryKey) {
            const primaryKeyData = {
              classTagId: createdTag.dataValues.id,
              classId: classId,
              userId: params.userId, // Assuming userId is available in params
            };
            const newPrimaryKey = new db.PrimaryKey(primaryKeyData);
            await newPrimaryKey.save({ transaction });
          }
        }
      }
    }

    // Handle parent join keys if provided.
    if (params.parentJoinKey && params.parentJoinKey.length) {
      const parentJoinKeys = await classTagRepo.getClassTags(params.parentJoinKey, transaction);
      const parentJoinKeyData = parentJoinKeys.data.map((element: any) => ({
        classId,
        parentTagId: element.id,
      }));
      await parentJoinKeyRepo.bulkCreate(parentJoinKeyData, classId, transaction);
    }

    // Return both classData and classTags.
    return { classData: savedClass, classTags: createdTags };
  } catch (error) {
    // Log the error if there's an issue with the class creation.
    loggerError.error("Error in class repo", error);
    return sendResponseData(false, message.error.error, error);
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

    const page = params.query.page || 1;
    const pageSize = params.query.pageSize || 10;
    let sortOrder = 'ASC'; // Default sorting order is DESC
    let sortField = "id";

    // Check if sortBy parameter is provided and valid
    if (params.query.sortBy && ['ASC', 'DESC'].includes(params.query.sortBy.toUpperCase())) {
      sortOrder = params.query.sortBy.toUpperCase();
    }
    if (params.query.sort && ['id', 'className',].includes(params.query.sort)) {
      sortField = params.query.sort;
    }

    const result = await paginateQuery(db.AddClasses, page, pageSize, {
      where: {
        userId: params.userId,
        parentId: null,
      },
      order: [[sortField, sortOrder]],
      attributes: ["id", "className", "serialId", "createdAt", "updatedAt"],
      include: [
        {
          model: db.classTag,
          attributes: ["id", "tagName", "dataTypeId", "createdAt", "updatedAt"],
          include: [
            {
              model: db.tagDataType,
              attributes: ["name"],
              required: true,
              where: {
                id: Sequelize.col("dataTypeId"),
              },
            },
          ],
        },
      ],
    });

    if (!result.rows.length) {
      return sendResponseData(false, message.error.classData, []);
    }
    return sendResponseData(true, message.success.fetchClass, result);
  } catch (error) {
    // Log the error if fetching classes and tags fails.
    loggerError.error("Error fetching class and classTags data:", error);
    return sendResponseData(false, message.error.error, error);
  }
}

/**
 * Fetch all classes and associated tags by id for a given user where the parentId is null.
 *
 * @param {Object} params - The request object containing the user ID.
 * @returns {Object} - An array of classes and associated tags or an error response.
 */
//Fetch class By ID
async function getClassDataByID(params: any) {
  try {
    // Log the initiation of fetching classes and tags.
    loggerInfo.info("Fetching all class and classTags data on class ID");

    if (!params.id) {
      throw "NO ID exist";
    }
    let sortOrder = 'ASC'; // Default sorting order is DESC
    let sortField = "id";

    // Check if sortBy parameter is provided and valid
    if (params.query.sortBy && ['ASC', 'DESC'].includes(params.query.sortBy.toUpperCase())) {
      sortOrder = params.query.sortBy.toUpperCase();
    }
    if (params.query.sort && ['id', 'className',].includes(params.query.sort)) {
      sortField = params.query.sort;
    }

    const page = params.query.page || 1; // Default to page 1 if not provided
    const pageSize = params.query.pageSize || 10; // Default page size to 10 if not provided

    const result = await paginateQuery(db.AddClasses, page, pageSize, {
      where: {
        id: params.query.id,
        parentId: null,
        userId: params.auth.sub
      },
      order: [[sortField, sortOrder]],
      attributes: ["id", "className", "serialId", "userId", "enterpriseId", "createdAt", "updatedAt"],
      include: [
        {
          model: db.classTag,
          attributes: ["id", "tagName", "dataTypeId", "createdAt", "updatedAt"],
          // required: true, // Makes it an INNER JOIN
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

    if (!result.rows.length) {
      return sendResponseData(false, message.error.noDataFound, []);
    }

    // Here, `result` contains paginated data
    return sendResponseData(true, message.success.fetchClass, result);
  } catch (error) {
    // Log the error if fetching classes and tags fails.
    loggerError.error("Error fetching class and classTags data by ID:", error);
    return sendResponseData(false, message.error.error, error);
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

    let sortOrder = 'ASC'; // Default sorting order is DESC
    let sortField = "id";

    // Check if sortBy parameter is provided and valid
    if (param.query.sortBy && ['ASC', 'DESC'].includes(param.query.sortBy.toUpperCase())) {
      sortOrder = param.query.sortBy.toUpperCase();
    }
    if (param.query.sort && ['id', 'className',].includes(param.query.sort)) {
      sortField = param.query.sort;
    }
    const page = param.query.page || 1; // Default to page 1 if not provided
    const pageSize = param.query.pageSize || 10; // Default page size to 10 if not provided

    const result = await paginateQuery(db.AddClasses, page, pageSize, {
      where: {
        userId: param.auth.sub,
        parentId: param.query.id,
      },
      attributes: ["id", "className", "serialId", "userId", "enterpriseId", "createdAt", "updatedAt"],
      order: [[sortField, sortOrder]],
      include: [
        {
          model: db.classTag,
          attributes: ["id", "tagName", "dataTypeId", "createdAt", "updatedAt"],
          // required: true, // Makes it an INNER JOIN
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
          order: [['createdAt', sortOrder]],
          required: false, // Makes it an INNER JOI
        },
      ],
    });
    if (!result.rows.length) {
      return sendResponseData(false, message.error.noDataFound, []);
    }
    // Get Parent Join Tag Name
    for (let x of result.rows) {
      let parentKey = x.ParentJoinKeys;
      for (let y of parentKey) {
        let tagQuery = await classTagRepo.getParentJoinTags(y.parentTagId);
        y.dataValues.tagname = tagQuery.tagName;
      }
    }
    // const response = result.map((item: any, index: any) => ({
    //   S_No: index + 1,
    //   ...item.get(),
    // }));

    return sendResponseData(true, message.success.fetchClass, result);
  } catch (error) {
    // Log the error if fetching subclasses and tags fails.
    loggerError.error("Error fetching class and classTags data:", error);
    return sendResponseData(false, message.error.error, error);
  }
}
/**
 * Fetch all subclasses and associated tags by id for a given user based on a parent class ID.
 *
 * @param {Object} param - The request object containing the user ID and query for the parent class ID.
 * @returns {Array} - An array of subclasses and associated tags or an error response.
 */
async function getSubClassByID(param: any) {
  try {
    // Log the initiation of fetching subclasses and tags.
    loggerInfo.info("Fetching subclass and subclassTags data by ID");

    let sortOrder = 'ASC'; // Default sorting order is DESC
    let sortField = "id";

    // Check if sortBy parameter is provided and valid
    if (param.query.sortBy && ['ASC', 'DESC'].includes(param.query.sortBy.toUpperCase())) {
      sortOrder = param.query.sortBy.toUpperCase();
    }
    if (param.query.sort && ['id', 'className',].includes(param.query.sort)) {
      sortField = param.query.sort;
    }
    const page = param.query.page || 1; // Default to page 1 if not provided
    const pageSize = param.query.pageSize || 10; // Default page size to 10 if not provided

    const result = await paginateQuery(db.AddClasses, page, pageSize, {
      where: {
        id: param.query.classId,
        parentId: param.query.parentId,
        userId: param.auth.sub
      },
      attributes: ["id", "className", "serialId", "createdAt", "updatedAt"],
      order: [[sortField, sortOrder]],
      include: [
        {
          model: db.classTag,
          attributes: ["id", "tagName", "dataTypeId", "createdAt", "updatedAt"],
          // required: true, // Makes it an INNER JOIN
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
          required: false, // Makes it an INNER JOI
        },
      ],
    });
    if (!result.rows.length) {
      return sendResponseData(false, "No data found", []);
    }
    // Get Parent Join Tag Name
    for (let x of result.rows) {
      let parentKey = x.ParentJoinKeys;
      for (let y of parentKey) {
        let tagQuery = await classTagRepo.getParentJoinTags(y.parentTagId);
        y.dataValues.tagname = tagQuery.tagName;
      }
    }
    // const response = result.map((item: any, index: any) => ({
    //   S_No: index + 1,
    //   ...item.get(),
    // }));

    return sendResponseData(true, message.success.fetchSubClass, result);
  } catch (error) {
    // Log the error if fetching subclasses and tags fails.
    loggerError.error("Error fetching class and classTags data:", error);
    return sendResponseData(false, message.error.error, error);
  }
}

/**
 * Update all classes, subclasses and associated tags.
 *
 * @param {Object} param - The request object containing the data to be updated
 * @returns {Array} - An array of classes, subclasses and associated tags or an error response.
 */
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
    // Set updatedAt to the current date/time
    classes.updatedAt = new Date();

    const response = await classes.save();
    return sendResponseData(true, "Class Updated Successfully", response);
  } catch (error: any) {
    loggerError.error("Error in Updating class", error);
    return sendResponseData(false, message.error.error, error);
  }
}

/**
 * Delete classes, subclasses and associated tags.
 *
 * @param {Object} param - The request object containing the data to be deleted
 * @returns {Array} - An array of classes, subclasses and associated tags or an error response.
 */
async function _delete(params: any) {
  try {
    const classes = await db.AddClasses.findOne({
      where: { id: params },
    });
    if (!classes) throw "Class doesn't exist";
    await classes.destroy();
    return sendResponseData(
      true,
      message.success.deleteClass,
      classes.className
    );
  } catch (error: any) {
    return sendResponseData(false, message.error.errorDeleteClass, error);
  }
}
