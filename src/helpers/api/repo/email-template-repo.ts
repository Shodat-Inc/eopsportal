import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import { paginateQuery } from "../constant/pagination";
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

async function getAll(params: any) {
    loggerInfo.info("Get All Email Templates")
    try {
        const page = params.query.page || 1;
        const pageSize = params.query.pageSize || 10;

        let sortOrder = 'ASC'; // Default sorting order is ASC
        let sortField = "id";
        let whereClause;

        if (params.query.id) {
            whereClause = { id: params.query.id };
        }

        // Check if sortBy parameter is provided and valid
        if (params.query.sortBy && ['ASC', 'DESC'].includes(params.query.sortBy.toUpperCase())) {
            sortOrder = params.query.sortBy.toUpperCase();
        }
        if (params.query.sort && ['id', 'emailSubject', 'emailContent', 'createdAt'].includes(params.query.sort)) {
            sortField = params.query.sort;
        }

        const result = await paginateQuery(db.EmailTemplate, page, pageSize, {
            order: [[sortField, sortOrder]],
            where: whereClause
        })
        if (!result.rows.length) {
            return sendResponseData(false, "Data doesn't Exists", {})
        }
        return sendResponseData(true, "Data Fetched Successfully", result)
    } catch (error) {
        loggerError.error("Error in email template repo while getting All Email Templates", error)
        return sendResponseData(false, "Error in email template while getting ALl Email Templates", error)
    }
}