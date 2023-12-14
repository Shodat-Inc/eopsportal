import { loggerError, loggerInfo } from "@/logger";
import { db } from "../db";
import sendResponseData from "@/helpers/constant";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

/**
 * Repository for handling operations related to enterprise user data.
 */
export const ImageObjectRepo = {
    create,
}

async function create(id: any, params: any) {
    try {
        loggerInfo.info("Creating Image of the Object")
        const data = await db.ImageObject.findOne({
            where: {
                id: id,
            }
        })
        if (data) {
            return sendResponseData(false, "Data already Exist", {})
        }
        const newData = new db.ImageObject(params)
        const save = await newData.save()
        return sendResponseData(true, "Image Added Successfully", save)
    } catch (error: any) {
        loggerError.error("Error in image-object-repo")
        return sendResponseData(false, "Error in Image Object Repo", error)
    }

}