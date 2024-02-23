import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import message from "@/util/responseMessage";
import { Sequelize } from "sequelize";
import { paginateQuery } from "../constant/pagination";

export const batteryAlertRepo = {
    create,
    get,
    getAllAlert,
    getAlertById,
    update,
    delete: _delete
};

async function create(params: any) {
    loggerInfo.info("Create Battery Alert")
    try {
        const data = await db.BatteryAlert.findOne({
            where: {
                alertName: params.alertName,
            },
        });

        if (data) {
            return sendResponseData(false, "Alert Name already Exists", {});
        }

        const newAlert = new db.BatteryAlert(params);

        const save = await newAlert.save();

        // Return a successful response with the saved data
        return sendResponseData(true, "Alert Created Successfully", save);
    } catch (error) {
        loggerError.error("Error in Creating Battery Alert Repo", error);
        return sendResponseData(false, "Error in Creating Battery Alert Repo", error);
    }
}

async function get(params: any) {
    loggerInfo.info("Get Alert based on filter className, ObjectId, modelName, userId")
    try {
        const data = await db.RaisedAlert.findOne({
            where: { userId: params.auth },
            // attributes: ['triggeredProbability'],
            attributes: [],
            include: [
                {
                    model: db.Model,
                    attributes: ['modelName'],
                    required: true,
                },
                {
                    model: db.Image,
                    attributes: ['url']
                },

                {
                    model: db.object,
                    attributes: ['id', 'classId']
                },
                {
                    model: db.AddClasses,
                    attributes: ['className']
                }
            ],
        });
        if (!data.length) {
            return sendResponseData(false, "Data not found", {})
        }
        return sendResponseData(true, "Data fetched Successfully", data)
    } catch (error) {
        loggerError.error("Error in getting alert based on filter className, objectId, modelName, userId", error)
        return sendResponseData(false, "Error in getting alert based on filter className, objectId, modelName, userId", error)
    }
}

async function getAllAlert(params: any) {
    loggerInfo.info("Get all Alerts");
    try {
        const page = params.query.page || 1;
        const pageSize = params.query.pageSize || 10;
        let sortOrder = 'DESC'; // Default sorting order is DESC
        let sortField = "id";

        // Check if sortBy parameter is provided and valid
        if (params.query.sortBy && ['ASC', 'DESC'].includes(params.query.sortBy.toUpperCase())) {
            sortOrder = params.query.sortBy.toUpperCase();
        }
        if (params.query.sort && ['id', 'alertName', 'rangeValue', 'thresholdValue', 'receiverEmailAddresses', 'isEnabled', 'createdAt'].includes(params.query.sort)) {
            sortField = params.query.sort;
        }
        const result = await paginateQuery(db.BatteryAlert, page, pageSize, {
            order: [[sortField, sortOrder]],
        });
        if (!result.rows.length) {
            return sendResponseData(false, "Data doesn't Exists", {});
        }
        return sendResponseData(true, "Alert Data fetched successfully", result);
    } catch (error) {
        loggerError.error("Error in getting all the alerts", error);
        return sendResponseData(false, "Error in getting all the alerts", error);
    }
}

async function getAlertById(params: any) {
    loggerInfo.info("Get ALert Data By Id");
    try {
        if (!params.id) {
            return sendResponseData(false, "Data is not provided in params", {});
        }
        const data = await db.BatteryAlert.findOne({
            where: { id: params.id },
        });
        if (!data) {
            return sendResponseData(false, "Data doesn't Exists", {});
        }
        return sendResponseData(true, "Data fetched successfully", data);
    } catch (error) {
        loggerError.error("Error in Alert Repo", error);
        return sendResponseData(false, "Error in Alert Repo", error);
    }
}

async function update(params: any, reqAuth: any) {
    loggerInfo.info("Update Alert");
    try {
        const data = await db.BatteryAlert.findOne({
            where: {
                id: reqAuth.query.id,
                userId: reqAuth.auth.sub
            },
        });

        params["updatedAt"] = new Date();

        // Define the properties to update
        const propertiesToUpdate = [
            "id",
            "alertName",
            "rangeValue",
            "thresholdValue",
            "receiverEmailAddresses",
            "isEnabled",
            "createdAt",
            "updatedAt",
        ];

        propertiesToUpdate.forEach((property) => {
            if (params[property] !== undefined) {
                // Check if the property is an array and update accordingly
                if (
                    property === "receiverEmailAddresses" &&
                    Array.isArray(params[property])
                ) {
                    data.setDataValue(property, params[property]);
                } else {
                    data[property] = params[property];
                }
            }
        });

        const response = await data.save();

        return sendResponseData(true, "Data Updated Successfully", response);
    } catch (error) {
        loggerError.error("Error in Alert", error);
        return sendResponseData(false, "Error in Alert Repo", error);
    }
}

async function _delete(id: number) {
    const alert = await db.BatteryAlert.findByPk(id);
    if (!alert) {
        return sendResponseData(false, "Battery Alert not found", {});
    }
    const response = await alert.destroy();
    return sendResponseData(true, "Battery Alert Deleted Successfuly", response);
}
