import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";

/**
 * Repository for handling Model related operations.
 */
export const modelRepo = {
    create,
    getAllModel,
    update
};

async function create(params: any) {
    try {
        loggerInfo.info("Creating Models")
        const data = await db.Model.findOne({
            where: {
                modelName: params.modelName
            }
        })
        if (data) {
            return sendResponseData(false, "Model Name already Exists", {})
        }
        const newModel = new db.Model(params)
        const save = await newModel.save()
        return sendResponseData(true, "Model Created Successfully", save)
    } catch (error: any) {
        loggerError.error("Error in Model Repo", error)
        return sendResponseData(false, "Error in Model Repo", error)
    }

}

async function getAllModel() {
    try {
        loggerInfo.info("Get All the Models")
        const getData = await db.Model.findAll({
            attributes: ["modelName", "modelTitle", "modelSubTitle", "howItWorks", "benefits"]
        })
        if (!getData) {
            return sendResponseData(false, "Data Doesn't Exist", {})
        }
        return sendResponseData(true, "Data Fetched Successfully", getData)
    } catch (error: any) {
        loggerError.error("Error in Get Models", error)
        return sendResponseData(false, "Error in Get Models", error)
    }
}

async function update(reqData: any, params: any) {
    try {
        loggerInfo.info("Updating the description of Models");
        const data = await db.Model.findOne({
            where: { modelName: reqData.modelName }
        });

        if (!data) {
            return sendResponseData(false, "Model Name doesn't exist", []);
        }

        // Update properties
        const propertiesToUpdate = [
            "modelTitle",
            "modelSubTitle",
            "howItWorks",
            "benefits"
        ];

        propertiesToUpdate.forEach((property) => {
            if (params[property] !== undefined) {
                // handling for "benefits" to update individual keys
                if (property === "benefits" && typeof params.benefits === 'object') {
                    data.benefits = { ...data.benefits, ...params.benefits };
                } else {
                    data[property] = params[property];
                }
            }
        });
        const response = await data.save();
        return sendResponseData(true, "Model Data Updated Successfully", response);
    } catch (error: any) {
        loggerError.error("Error in Model Repo", error);
        return sendResponseData(false, "Error in Model Repo", error);
    }
}
