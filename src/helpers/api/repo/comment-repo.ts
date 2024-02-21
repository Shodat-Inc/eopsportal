import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import message from "@/util/responseMessage";

export const commentRepo = {
    create,
    get,
    update,
    delete: _delete
}

async function create(params: any, reqData: any) {
    loggerInfo.info("Post API to create Comment")
    try {
        const commentData = {
            ...params,
            userId: reqData.sub,
        };
        const data = new db.Comment(commentData)
        const newComment = await data.save()
        return sendResponseData(true, "Comment Added Successfully", newComment)

    } catch (error) {
        loggerError.error("Error in Creating Comment", error)
        return sendResponseData(false, "Error in Creating Comment", error)
    }
}

async function get(params: any) {
    loggerInfo.info("Get comment")
    try {
        const data = await db.Comment.findAll({
            where: { ticketId: params.ticketId },
            attributes: ['comment', 'parentId', 'ticketId', 'userId', 'enterpriseId'],
            include: [{
                model: db.Ticket,
            }]
        })
        if (!data.length) {
            return sendResponseData(false, "No comments are avaiable for requested Ticket Id", {})
        }
        return sendResponseData(true, "Comments fetched Sucessfully", data)
    } catch (error) {
        loggerError.error("Error in getting comment", error)
        return sendResponseData(false, "Error in getting Comment", error)
    }
}

async function update(params: any, reqData: any, reqParams: any) {
    loggerInfo.info("Update Comment")
    try {

        const data = await db.Comment.findOne({
            where: {
                ticketId: reqParams.ticketId,
                parentId: reqParams.parentId,
                id: reqParams.id,
                userId: reqData,
            },
        })
        if (!data) {
            return sendResponseData(false, "Comment not found for update", {});
        }
        const propertiesToUpdate = [
            "comment"
        ];

        propertiesToUpdate.forEach((property) => {
            if (params[property]) {
                data[property] = params[property];
            }
        });
        data.updatedAt = new Date()
        const response = await data.save();

        return sendResponseData(true, "Comment Updated Successfully", response)
    } catch (error) {
        loggerError.error("Error in Updating Comment", error)
        return sendResponseData(false, "Error in Updating Comment", error)
    }
}

async function _delete(params: any, reqAuth: any) {
    loggerInfo.info("Deleting Comment")
    try {
        const data = await db.Comment.findOne({
            where: {
                ticketId: params.ticketId,
                id: params.id,
                userId: reqAuth.sub
            }
        })
        if (!data) {
            return sendResponseData(false, "Comment Not Found", {})
        }
        const deleteComment = await data.destroy()
        return sendResponseData(true, "Comment Deleted Successfully", deleteComment)
    } catch (error) {
        loggerError.error("Error in deleting Comment", error)
        return sendResponseData(false, "Error in deleting Comment", error)
    }
}