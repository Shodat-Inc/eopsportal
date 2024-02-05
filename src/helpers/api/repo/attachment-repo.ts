import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import message from "@/util/responseMessage";

export const attachmentRepo = {
    create,
    get,
    update,
    delete: _delete
}
async function create(params: any, reqData: any) {
    loggerInfo.info("Creating POST API of Attachment(File)")
    try {
        const attachmentData = {
            ...params,
            userId: reqData.sub,
        };
        const data = new db.Attachment(attachmentData)
        const newAttachment = await data.save()
        return sendResponseData(true, "Comment Added Successfully", newAttachment)
    } catch (error) {
        loggerError.error("Error in Creating Attachment(File)", error)
        return sendResponseData(false, "Error in creating Attachment", error)
    }
}

async function get(params: any) {
    loggerInfo.info("Get the Attachment of Ticket and Comment")
    try {
        let joinTable;
        if (params.params.referenceTableName === "TicketComments") {
            joinTable = db.Comment;
        }
        else if (params.params.referenceTableName === "Tickets") {
            joinTable = db.Ticket;
        }
        const getData = await db.Attachment.findAll({
            where: {
                referenceTableId: params.params.referenceTableId,
                referenceTableName: params.params.referenceTableName,
                userId: params.userId
            },
            include: [
                {
                    model: joinTable,
                },
            ]
        })
        if (!getData.length) {
            return sendResponseData(false, "Data Not Found", {})
        }
        return sendResponseData(true, "Data Fetched Successfully", getData)
    } catch (error) {
        loggerError.error("Error in getting Attachment Data", error)
        return sendResponseData(false, "Error in getting Attachment Data of Ticket and Comment", error)
    }
}

async function update(params: any, reqAuth: any, reqParams: any) {
    loggerInfo.info("Updating Attachment for Ticket or Comment")
    try {

        const data = await db.Attachment.findOne({
            where: {
                referenceTableId: reqParams.referenceTableId,
                referenceTableName: reqParams.referenceTableName,
                userId: reqAuth,
                id: reqParams.id
            },
        })
        if (!data) {
            return sendResponseData(false, "Data Not Found", {});
        }

        const propertiesToUpdate = [
            "fileName",
            "fileUrl",
            "fileType",
        ];

        propertiesToUpdate.forEach((property) => {
            if (params[property]) {
                data[property] = params[property];
            }
        });
        data.updatedAt = new Date()
        await data.save();

        return sendResponseData(true, "Updated Sucessfully", data)

    } catch (error) {
        loggerError.error("Error in updating Attachment for ticket or Comment", error)
        return sendResponseData(false, "Error in updating Attachment for Ticket or Comment", error)
    }
}

async function _delete(params: any, reqAuth: any) {
    loggerInfo.info("Updating Attachment for Ticket or Comment")
    try {
        const data = await db.Attachment.findOne({
            where: {
                referenceTableId: params.referenceTableId,
                referenceTableName: params.referenceTableName,
                userId: reqAuth.sub,
                id: params.id
            },
        })
        if (!data) {
            return sendResponseData(false, "Data Not Found", {});
        }
        await data.destroy()
        return sendResponseData(true, "Attachment(File) deleted Successfully", data)
    } catch (error) {
        loggerError.error("Error in deleting Comment or Ticket Attachment", error)
        return sendResponseData(false, "Error in deleting Comment or Ticket", error)
    }
}