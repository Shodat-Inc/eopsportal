import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import message from "@/util/responseMessage";
import { Logger } from "winston";

export const mailTemplateRepo = {
    create
}

async function create(params: any) {
    loggerInfo.info("Create Post api of email template")
    try {
        console.log(params, "==params")
        const data = new db.EmailTemplate(params)
        const response = await data.save()
        return sendResponseData(true, "Email saved Successfully", response)
    } catch (error) {
        loggerError.error("Error in email template repo while creating email template", error)
        return sendResponseData(false, "Error in email template repo while creating email template", error)
    }
}