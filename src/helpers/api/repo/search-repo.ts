import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import message from "@/util/responseMessage";
import { Op } from "sequelize";

export const searchRepo = {
    getAiModelObject,
};

async function getAiModelObject(params: any) {
    loggerInfo.info("Get AI Model for Class Object")
    try {
        const data = await db.classTag.findAll({
            // where: { tagName: params.query.classTag },
            where: {
                tagName: {
                    [Op.like]: `%${params.query.classTag}%`
                }
            },
            attributes: ['tagName', 'classId'],
            include: [
                {
                    model: db.object,
                    attributes: ['id', 'serialId', 'classId', 'superParentId', 'parentId'],
                    include: [
                        {
                            model: db.ModelData,
                            where: { userId: params.userId },
                            attributes: ['id', 'userId', 'modelId', 'objectId', 'classId'],
                            include: [
                                {
                                    model: db.Model,
                                    where: { modelName: params.query.modelName },
                                    attributes: ['id', 'modelName']
                                }
                            ]
                        },
                    ]
                },
            ],
        })
        if (!data.length) {
            return sendResponseData(false, "Data Not Found", {})
        }
        return sendResponseData(true, "Class or SubClass Object for AI Model", data)
    } catch (error) {
        loggerError.error("Error in getting AI Model for Class Object", error)
        return sendResponseData(false, "Error in getting AI Model for Class Object", error)
    }
}
