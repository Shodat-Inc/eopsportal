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

async function create(params: any) {
    try {
        loggerInfo.info("Creating Image of the Object")
        const data = await db.ImageObject.findOne({
            where: {
                url: params.url,
            }
        })
        if (data) {
            return sendResponseData(false, "Image URL already exist", {})
        }
        const newData = new db.ImageObject(params)
        const save = await newData.save()
        return sendResponseData(true, "Image Added Successfully", save)
    } catch (error: any) {
        loggerError.error("Error in image-object-repo")
        return sendResponseData(false, "Error in Image Object Repo", error)
    }

}