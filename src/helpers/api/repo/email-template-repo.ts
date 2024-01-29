import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import message from "@/util/responseMessage";

export const mailTemplateRepo = {
    create,
    getAll
}

async function create(params: any) {
    loggerInfo.info("Create Post api of email template")
    try {
        const data = new db.EmailTemplate(params)
        const response = await data.save()
        return sendResponseData(true, "Email saved Successfully", response)
    } catch (error) {
        loggerError.error("Error in email template repo while creating email template", error)
        return sendResponseData(false, "Error in email template repo while creating email template", error)
    }
}

async function getAll() {
    loggerInfo.info("Get All Email Templates")
    try {

        const data = await db.EmailTemplate.findAll({
            attributes: ["emailSubject", "emailContent"]
        })
        if (!data) {
            return sendResponseData(false, "Data doesn't Exists", {})
        }
        return sendResponseData(true, "Data Fetched Successfully", data)
    } catch (error) {
        loggerError.error("Error in email template repo while getting All Email Templates", error)
        return sendResponseData(false, "Error in email template while getting ALl Email Templates", error)
    }
}