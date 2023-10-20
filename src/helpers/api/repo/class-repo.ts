import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";

export const classRepo = {
  create,
  getClassData,
  getSubClass,
};
async function create(params: any) {
  loggerInfo.info("Create Class Repo:");
  try {
    // validate
    let class_data = await db.AddClasses.findOne({
      where: { className: params.className },
    });
    if (class_data) {
      return sendResponseData(false, "Class already exist", {});
    }
    // save class
    const classes = new db.AddClasses(params);
    const data = await classes.save();
    return sendResponseData(true, "Class added successfully", data);
  } catch (error) {
    loggerError.error("Error in class repo", error);
    return sendResponseData(false, "error", error);
  }
}

async function getClassData(req: any) {
  try {
    loggerInfo.info("Fetching all class and classTags data");

    const result = await db.AddClasses.findAll({
      where: {
        userId: req.id,
        parentId: null,
      },
      attributes: ["className"],
      include: [
        {
          model: db.classTag,
          attributes: ["tagName", "createdAt"],
          required: true, // Makes it an INNER JOIN
        },
      ],
    });
    return result.map((item: any, index: any) => ({
      serialNumber: index + 1,
      ...item.get(), // Convert Sequelize instance to plain JS object
    }));
  } catch (error) {
    loggerError.error("Error fetching class and classTags data:", error);
    return sendResponseData(false, "error", error);
  }
}

async function getSubClass(req: any) {
  try {
    loggerInfo.info("Fetching all class and classTags data");

    const result = await db.AddClasses.findAll({
      where: {
        userId: req.id,
        parentId: req.query.id,
      },
      attributes: ["className"],
      include: [
        {
          model: db.classTag,
          attributes: ["tagName", "createdAt"],
          required: true, // Makes it an INNER JOIN
        },
      ],
    });
    return result.map((item: any, index: any) => ({
      S_No: index + 1,
      ...item.get(), // Convert Sequelize instance to plain JS object
    }));
  } catch (error) {
    loggerError.error("Error fetching class and classTags data:", error);
    return sendResponseData(false, "error", error);
  }
}
