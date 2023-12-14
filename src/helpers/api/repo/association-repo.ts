import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";

export const associationRepo = {
    create,
    getAll,
    getById
};

async function create(params: any) {
    try {
        loggerInfo.info("Creating Association")
        const data = await db.Association.findOne({
            where: {
                classId: params.classId,
                objectId: params.objectId,
                modelId: params.modelId
            }
        })
        if (data) {
            return sendResponseData(false, "Data Already Exists", {})
        }
        const response = new db.Association(params)
        const save = await response.save()
        return sendResponseData(true, "Data Added Successfully", save)

    } catch (error: any) {
        loggerError.error("Error in Association Repo", error)
        return sendResponseData(false, "Error in Creating Association.", error)
    }
}

async function getAll() {
    try {
        loggerInfo.info("Getting Association")
        const data = await db.Association.findAll({
            attributes: ["id", "classId", "objectId", "modelId"]
        })
        return sendResponseData(true, "Data fetched Successfully", data)
    } catch (error: any) {
        loggerError.error("Error in Association Repo", error)
        return sendResponseData(false, "Error in Getting Association.", error)
    }
}

async function getById(params: any) {
    try {
        loggerInfo.info("Getting Association By id")
        if (!params.id) {
            return sendResponseData(false, "Id is not provided", [])
        }
        const result = await db.Association.findAll({
            where: {
                id: params.id,
            },
            attributes: ["id", "classId", "objectId", "modelId"]
        });

        if (result.length === 0) {
            return sendResponseData(false, "Data Doesn't Exist", [])
        }

        return sendResponseData(true, "Data fetched By Id", result)
    } catch (error: any) {
        loggerError.error("Error in Association Repo", error)
        return sendResponseData(false, "Error in getting Association by ID", error)
    }
}