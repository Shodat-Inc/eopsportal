import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import message from "@/util/responseMessage";

export const commentAttachmentRepo = {
    create,
    get,
    update,
    delete: _delete
}

async function create(params: any, reqData: any) {
    loggerInfo.info("Creating POST API of Comment Attachment(File)")
    try {
        const attachmentData = {
            ...params,
            userId: reqData.sub,
        };
        const data = new db.CommentAttachment(attachmentData)
        const newAttachment = await data.save()
        return sendResponseData(true, "Comment Attachment Added Successfully", newAttachment)
    } catch (error) {
        loggerError.error("Error in Creating Comment Attachment(File)", error)
        return sendResponseData(false, "Error in creating Comment Attachment", error)
    }
}

async function get(params: any) {
    loggerInfo.info("Get API of Comments Attachment")
    try {
        if (!params || !params.params || !params.params.commentId) {
            return sendResponseData(false, "Invalid parameters", {});
        }
        const getData = await db.CommentAttachment.findAll({
            where: {
                commentId: params.params.commentId,
                userId: params.userId
            },
            include: [
                {
                    model: db.Comment
                }
            ]
        })
        if (!getData.length) {
            return sendResponseData(false, "Data Not Found", {})
        }
        return sendResponseData(true, "Comment and it's Attachment fetched successfully", getData)
    } catch (error) {
        loggerError.error("Error in getting Comments Attachment", error)
        return sendResponseData(false, "Error in getting Comments Attachment", error)
    }
}

async function update(params: any, reqAuth: any, reqParams: any) {
    loggerInfo.info("Update Comment Attachment")
    try {
        const data = await db.CommentAttachment.findOne({
            where: {
                commentId: reqParams.commentId,
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

        return sendResponseData(true, "Comment Attachment Updated Sucessfully", data)
    } catch (error) {
        loggerError.error("Error in Updating Comment Attachment", error)
        return sendResponseData(false, "Error in Updating Comment Attachment", error)
    }
}

async function _delete(params: any, reqAuth: any) {
    loggerInfo.info("Deleting Comment Attachment")
    try {
        const data = await db.CommentAttachment.findOne({
            where: {
                // commentId: params.commentId,
                id: params.id,
                userId: reqAuth.sub,
            },
        })
        if (!data) {
            return sendResponseData(false, "Data Not Found", {});
        }
        await data.destroy()
        return sendResponseData(true, "Comment Attachment(File) deleted Successfully", data)
    } catch (error) {
        loggerError.error("Error in deleting Comment Attachment", error)
        return sendResponseData(false, "Error in deleting Comment Attachment", error)
    }

}