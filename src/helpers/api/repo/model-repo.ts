import { loggerError, loggerInfo } from "@/logger";
import { db } from "../db";
import sendResponseData from "@/helpers/constant";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

/**
 * Repository for handling operations related to enterprise user data.
 */
export const ModelRepo = {
  create,
  getObjectBySerialId,
  getClassObjectBySerialId,
  getSubClassObjectBySerialId,
  getAllModels,
  getModelById,
  update
};

async function create(params: any) {
  try {
    loggerInfo.info("");
    const data = await db.Model.findOne({
      where: {
        modelName: params.modelName
      },
    });
    if (data) {
      return sendResponseData(false, "Model Name already Exist", {});
    }
    const newModel = new db.Model(params);
    const save = await newModel.save();

    return sendResponseData(true, "Model Name with the description is Successfully saved", save);
  } catch (error: any) {
    loggerError.error("Error in Model Repo", error);
    return sendResponseData(false, "Error in Model Repo", error);
  }
}

async function getObjectBySerialId(params: any) {
  try {
    loggerInfo.info("Get Objects based on Serial Id");
    if (!Object.keys(params).length) {
      return sendResponseData(
        false,
        "Please provide specific data in params you are looking for",
        {}
      );
    }
    const data = await db.object.findOne({
      where: {
        serialId: params.serialId,
      },
      attributes: ["serialId"],
      include: [
        {
          model: db.AddValues,
          attributes: ["values", "objectId"],
        },
      ],
    });
    if (!data) {
      return sendResponseData(false, "Data doesn't Exist", {});
    }
    return sendResponseData(true, "Data Fetched Successfully", data);
  } catch (error: any) {
    loggerError.error("Error in Model Repo", error);
    return sendResponseData(
      false,
      "Error in Fetching Object By SerialID",
      error
    );
  }
}

async function getClassObjectBySerialId(params: any) {
  try {
    loggerInfo.info("Get Class Object based on Class SerialID");
    if (!Object.keys(params).length) {
      return sendResponseData(
        false,
        "Please provide specific data in params you are looking for",
        {}
      );
    }
    const data = await db.AddClasses.findAll({
      where: {
        serialId: params.serialId,
        parentId: null,
      },
      attributes: ["serialId", "className"],
      include: [
        {
          model: db.object,
          attributes: ["serialId"],
          include: [
            {
              model: db.AddValues,
              attributes: ["values", "objectId"],
            },
          ],
        },
      ],
    });
    return sendResponseData(true, "Data fetched Successfully", data);
  } catch (error: any) {
    loggerError.error("Error in Model Repo", error);
    return sendResponseData(
      false,
      "Error in Fetching Class Object By SerialID",
      error
    );
  }
}

async function getSubClassObjectBySerialId(params: any) {
  try {
    loggerInfo.info("Get SubClass Object By SerialID");
    if (!Object.keys(params).length) {
      return sendResponseData(
        false,
        "Please provide specific data in params you are looking for",
        {}
      );
    }
    const data = await db.AddClasses.findAll({
      where: {
        serialId: params.serialId,
        parentId: params.parentId,
      },
      attributes: ["serialId", "className", "superParentId", "parentId"],
      include: [
        {
          model: db.object,
          attributes: ["serialId"],
          include: [
            {
              model: db.AddValues,
              attributes: ["values", "objectId"],
            },
          ],
        },
      ],
    });
    if (!data) {
      return sendResponseData(false, "Data doesn't Exist", {});
    }
    return sendResponseData(true, "Data Fetched Successfully", data);
  } catch (error: any) {
    loggerError.error("Error in Model Repo", error);
    return sendResponseData(
      false,
      "Error in Fetching SubClass Object By SerialID",
      error
    );
  }
}

async function getAllModels(reqData: any, modelType: string) {
  loggerInfo.info("Get Models");
  try {
    const Model = db[modelType];
    const data = await Model.findAll({
      attributes: ["id", "modelName", "description"],
    });
    if (!data) {
      return sendResponseData(false, "No data Found", []);
    }
    return sendResponseData(true, "Data fetched Successfully", data);
  } catch (error: any) {
    return sendResponseData(false, "Error", error);
  }
}

async function getModelById(params: any, modelType: any) {
  try {
    loggerInfo.info("Get Model By Id")
    const Model = db[modelType];
    const data = await Model.findOne({
      where: { id: params.id }
    })
    if (!data) {
      return sendResponseData(false, "Data Doesn't Exist", {})
    }
    return sendResponseData(true, "Data Fetched Successfully", data)
  } catch (error: any) {
    loggerError.error("Error in Model Repo")
    return sendResponseData(false, "Error in getting Model By ID", error)
  }
}

async function update(params: any) {
  try {
    loggerInfo.info("Update the description of Models");
    const updatedModel = await db.Model.findOne({
      where: {
        modelName: params.modelName,
      },
    });

    if (!updatedModel) {
      return sendResponseData(false, "Model not found", {});
    }
    const update =await db.Model.update(
      {
        description: params.description,
      },
      {
        where: {
          modelName: params.modelName,
        },
      }
    );

    return sendResponseData(true, "Data Updated Successfully", { updatedModel });
  } catch (error: any) {
    loggerError.error("Error in updating description of Models", error);
    return sendResponseData(false, "Error in updating description of Models", error);
  }
}

