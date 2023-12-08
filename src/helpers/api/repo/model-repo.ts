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
}

async function create(params: any) {
    try {
        loggerInfo.info("Create Model")
        const data = await db.Model.findOne({
            where: { modelName: params.modelName }
        })
        if (data) {
            return sendResponseData(false, "Model Name already exists", {})
        }
        const newModel = new db.Model(params)
        const save = await newModel.save()
        return sendResponseData(true, "Model created Successfully", save)
    } catch (error: any) {
        loggerError.error("Error in Model Repo", error)
        return sendResponseData(false, "Error in Model Repo", error)
    }
}