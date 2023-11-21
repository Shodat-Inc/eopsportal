import { loggerError, loggerInfo } from "@/logger";
import { db } from "../db";
import sendResponseData from "@/helpers/constant";
import { Sequelize } from "sequelize";

export const enterpriseDataRepo = {
  getAllEnterpriseData,
  getEnterpriseById,
  getEnterpriseObject,
  getEnterpriseObjectById,
  getEnterpriseClass,
};
async function getEnterpriseClass(params: any) {
  try {
    loggerInfo.info("Get Classes Of One Enterprise");
    const data = await db.AddClasses.findAll({
      where: {
        enterpriseId: params.enterpriseId,
      },
      attributes: ["id", "className", "createdAt"],
      include: [
        {
          model: db.classTag,
          attributes: ["id", "tagName", "createdAt", "dataTypeId"],
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
    return sendResponseData(true, "Class Data", data);
  } catch (error: any) {
    loggerError.error("Error in Enterprise Class Repo");
    return sendResponseData(false, "Error", error);
  }
}
async function getAllEnterpriseData(params: any) {
  try {
    loggerInfo.info("Get Enterprise Data Repo");

    const result = await db.AddClasses.findAll({
      where: {
        enterpriseUserId: params.enterpriseUserId,
        parentId: null,
      },
      attributes: ["id", "className", "createdAt"],
      include: [
        {
          model: db.classTag,
          attributes: ["id", "tagName", "createdAt", "dataTypeId"],
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
    return sendResponseData(true, "Enterprise Class Data", result);
  } catch (error: any) {
    loggerError.error("Error in Enterprise Data Repo");
    return sendResponseData(false, "Error in getting Enterprise Data", []);
  }
}

async function getEnterpriseById(params: any) {
  try {
    loggerInfo.info("Get Enterprise Data Repo by Id");

    if (!params.id) {
      throw "NO ID exist";
    }
    const result = await db.AddClasses.findAll({
      where: {
        id: params.id,
        parentId: null,
      },
      attributes: ["id", "className", "createdAt"],
      include: [
        {
          model: db.classTag,
          attributes: ["id", "tagName", "createdAt", "dataTypeId"],
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
      return sendResponseData(false, "Error in fetching data", []);
    }

    const response = result.map((item: any, index: any) => ({
      serialNumber: index + 1,
      ...item.get(), // Convert Sequelize instance to plain JS object
    }));
    return sendResponseData(true, "Data Fetched Successfully", response);
  } catch (error: any) {
    loggerError.error("Error in Enterprise Data Repo");
    return sendResponseData(
      false,
      "Error in getting Enterprise Data by Id",
      []
    );
  }
}

async function getEnterpriseObject(id: any) {
  try {
    loggerInfo.info("Fetching Objects, ClassTags, and ObjectValues data");

    // Validate that an ID is provided.
    if (!id) {
      loggerError.error("NO Id is provided");
      return sendResponseData(false, "No Id is provided", Error);
    }
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
  } catch (error: any) {
    loggerError.error("Error in Enterprise Data Repo");
    return sendResponseData(
      false,
      "Error in getting Enterprise Data by Id",
      []
    );
  }
}

async function getEnterpriseObjectById(params: any) {
  // Log the initiation of fetching Objects, ClassTags, and ObjectValues data By ObjectId.
  loggerInfo.info("Fetching Objects, ClassTags, and ObjectValues data");
  // Validate that an ID is provided.
  if (!params.query.objectId && !params.query.classId) {
    loggerError.error("No Id is provided");
    return sendResponseData(false, "No Id is provided", Error);
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
    loggerError.error("Error fetching Objects", error);
    // Return a response indicating the failure of the operation.
    return sendResponseData(false, "Error in fetching object", error);
  }
}
