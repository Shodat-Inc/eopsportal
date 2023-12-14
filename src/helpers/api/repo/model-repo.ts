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

async function create(id: any, params: any, modelType: string) {
  try {
    loggerInfo.info(`Create ${modelType} Model`);
    const Model = db[modelType];
    const data = await Model.findOne({
      where: {
        id: id,
        modelName: params.modelName
      },
    });

    if (data) {
      return sendResponseData(false, `${modelType} Name already exists`, {});
    }

    const newModel = new Model(params);
    const save = await newModel.save();

    return sendResponseData(true, `${modelType} created Successfully`, save);
  } catch (error: any) {
    loggerError.error(`Error in ${modelType} Repo`, error);
    return sendResponseData(false, `Error in ${modelType} Repo`, error);
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

async function update(id: any, params: any, modelType: any) {
  try {
    loggerInfo.info(`Update ${modelType} Model`)
    const Model = db[modelType];
    const data = await Model.findOne({
      where: {
        id: id,
        modelName: params.modelName
      }
    })
    // console.log(params.description,"=====h")
    // if (params.description.Benefits) {
    //   data.description.Benefits = params.description.Benefits
    // }
    // if (params.description.HowItWorks) {
    //   data.description.HowItWorks= params.description.HowItWorks
    // }
    if (params.description.Benefits !== undefined) {
      data.description.Benefits = params.description.Benefits;
    }
    if (params.description.HowItWorks !== undefined) {
      data.description.HowItWorks = params.description.HowItWorks;
    }
    const res = await data.save()
    return sendResponseData(true, "Data Updated Successfully", res)
  } catch (error: any) {
    loggerError.error(`Error in ${modelType} Repo, error`);
    return sendResponseData(false, `Error in ${modelType} Repo`, error)
  }
}
