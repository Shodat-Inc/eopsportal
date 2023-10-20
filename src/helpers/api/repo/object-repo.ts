import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import { error, info } from "console";
import { Sequelize } from "sequelize";

export const objectRepo = {
  create,
  get,
};
async function create(params: any) {
  loggerInfo.info("Object Repo", info);
  if (!params.classId) {
    loggerError.error("No Class id Provided", error);
    return sendResponseData(false, "No Class ID", {});
  }
  try {
    const object = new db.object(params);
    // save object
    const data = await object.save();
    return sendResponseData(true, "Object added successfully", data);
  } catch (error) {
    loggerError.error("Error in Object Repo", error);
    return sendResponseData(false, "error", error);
  }
}
async function get(req: any) {
  // Logging
  loggerInfo.info("Fetching Objects, ClassTags, and ObjectValues data");
  if (!req.id) {
    loggerError.error("NO Id is provided", error);
    return sendResponseData(false, "no id", error);
  }
  try {
    const result = await db.object.findAll({
      attributes: [
        ["id", "objectId"],
        [Sequelize.col("ClassTags.tagName"), "tagName"],
        [Sequelize.col("ObjectValues.values"), "values"],
        [Sequelize.col("ObjectValues.createdAt"), "createdAt"],
      ],
      include: [
        {
          model: db.classTag,
          attributes: [],
          required: true,
          where: {
            classId: req.query.id,
          },
        },
        {
          model: db.AddValues,
          on: {
            classTagId: Sequelize.col("classTagId"),
            objectId: Sequelize.col("objectId"),
          },
          attributes: [],
          required: false,
        },
      ],
      order: [["id", "ASC"]],
    });

    return result.map((item: any, index: any) => ({
      S_No: index + 1,
      ...item.get(), // Convert Sequelize instance to plain JS object
    }));
  } catch (error) {
    loggerError.error(
      "Error fetching Objects, ClassTags, and ObjectValues data:",
      error
    );
    return sendResponseData(false, "error", error);
  }
}
