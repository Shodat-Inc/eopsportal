import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import message from "@/util/responseMessage";
import { paginateQuery } from "../constant/pagination";

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
        const page = params.page || 1;
        const pageSize = params.pageSize || 10;
        let sortOrder = 'DESC'; // Default sorting order is DESC
        let sortField = "id";

        // Check if sortBy parameter is provided and valid
        if (params.sortBy && ['ASC', 'DESC'].includes(params.sortBy.toUpperCase())) {
            sortOrder = params.sortBy.toUpperCase();
        }
        if (params.sort && ['id', 'comment', 'parentId', 'ticketId', 'userId', 'enterpriseId', 'createdAt'].includes(params.sort)) {
            sortField = params.sort;
        }

        const result = await paginateQuery(db.Comment, page, pageSize, {
            where: { ticketId: params.ticketId },
            attributes: ['comment', 'parentId', 'ticketId', 'userId', 'enterpriseId'],
            order: [[sortField, sortOrder]],
            include: [{
                model: db.Ticket,
            }]
        })
        if (!result.rows.length) {
            return sendResponseData(false, "No comments are avaiable for requested Ticket Id", {})
        }
        return sendResponseData(true, "Comments fetched Sucessfully", result)
    } catch (error) {
        loggerError.error("Error in getting comment", error)
        return sendResponseData(false, "Error in getting Comment", error)
    }
}

async function update(params: any, reqData: any, reqParams: any) {
    loggerInfo.info("Update Comment")
    try {

        const parentId = reqParams.parentId === "NULL" || "null" || "Null" ? null : reqParams.parentId;

        // Construct the where clause dynamically
        const whereClause: any = {
            ticketId: reqParams.ticketId,
            id: reqParams.id,
            userId: reqData,
        };

        // Include parentId in where clause if it exists
        if (parentId !== undefined && parentId !== null) {
            whereClause.parentId = parentId;
        }

        const data = await db.Comment.findOne({
            where: whereClause,
        });

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