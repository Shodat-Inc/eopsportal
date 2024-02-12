import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import message from "@/util/responseMessage";

export const ticketAttachmentRepo = {
    create,
    get,
    update,
    delete: _delete
}
async function create(params: any, reqData: any) {
    loggerInfo.info("Creating POST API of Ticket Attachment(File)")
    try {
        const attachmentData = {
            ...params,
            userId: reqData.sub,
        };
        const data = new db.Attachment(attachmentData)
        const newAttachment = await data.save()
        return sendResponseData(true, "Ticket Attachment Added Successfully", newAttachment)
    } catch (error) {
        loggerError.error("Error in Creating Ticket Attachment(File)", error)
        return sendResponseData(false, "Error in creating Ticket Attachment", error)
    }
}

async function get(params: any) {
    loggerInfo.info("Get the Attachment of Ticket and Comment")
    try {
        if (!params || !params.params || !params.params.ticketId) {
            return sendResponseData(false, "Invalid parameters", {});
        }
        const getData = await db.Attachment.findAll({
            where: {
                ticketId: params.params.ticketId,
                userId: params.userId
            },
            include: [
                {
                    model: db.Ticket,
                    attributes: ['id', 'subject', 'priority', 'assignedTo', 'assignedBy', 'createdAt', 'updatedAt']
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
    loggerInfo.info("Updating Ticket Attachment")
    try {

        const data = await db.Attachment.findOne({
            where: {
                ticketId: reqParams.ticketId,
                id: reqParams.id,
                userId: reqAuth
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

        return sendResponseData(true, "Ticket Updated Sucessfully", data)

    } catch (error) {
        loggerError.error("Error in updating Attachment for ticket", error)
        return sendResponseData(false, "Error in updating Attachment for Ticket", error)
    }
}

async function _delete(params: any, reqAuth: any) {
    loggerInfo.info("Updating Attachment for Ticket")
    try {
        const data = await db.Attachment.findOne({
            where: {
                // ticketId: params.ticketId,
                id: params.id,
                userId: reqAuth.sub,
            },
        })
        if (!data) {
            return sendResponseData(false, "Data Not Found", {});
        }
        await data.destroy()
        return sendResponseData(true, "Attachment(File) deleted Successfully", data)
    } catch (error) {
        loggerError.error("Error in deleting Ticket Attachment", error)
        return sendResponseData(false, "Error in deleting Ticket Attachment", error)
    }
}