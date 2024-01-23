import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import message from "@/util/responseMessage";
import { send } from "process";

export const alertRepo = {
    create,
    getAllAlert,
    getAlertById,
    update,
    delete: _delete
};

async function create(params: any) {
    loggerInfo.info("Post api/createAlerts to create Alerts")

    try {
        const data = await db.Alert.findOne({
            where: {
                alertName: params.alertName
            }
        });

        if (data) {
            return sendResponseData(false, "Alert Name already Exists", {});
        }

        const newAlert = new db.Alert(params);

        const save = await newAlert.save();

        // Return a successful response with the saved data
        return sendResponseData(true, "Alert Created Successfully", save);

    } catch (error) {
        loggerError.error("Error in Alert Repo", error)
        return sendResponseData(false, "Error in Alert Repo", error)
    }
}

async function getAllAlert() {
    loggerInfo.info("Get all Alerts")
    try {
        const data = await db.Alert.findAll({
            attributes: ['alertName', 'thresholdValue', 'enable']
        })
        if (!data) {
            return sendResponseData(false, "Data doesn't Exists", {})
        }
        return sendResponseData(true, "Alert Data fetched successfully", data)
    } catch (error) {
        loggerError.error("Error in getting all the alerts", error)
        return sendResponseData(false, "Error in getting all the alerts", error)
    }
}

async function getAlertById(params: any) {
    loggerInfo.info("Get ALert Data By Id")
    try {
        console.log(params)
        if (!params.id) {
            return sendResponseData(false, "Data is not provided in params", {})
        }
        const data = await db.Alert.findOne({
            where: { id: params.id }
        })
        if (!data) {
            return sendResponseData(false, "Data doesn't Exists", {})
        }
        return sendResponseData(true, "Data fetched successfully", data)
    } catch (error) {
        loggerError.error("Error in Alert Repo", error)
        return sendResponseData(false, "Error in Alert Repo", error)
    }
}

async function update(params: any, reqAuth: any) {
    loggerInfo.info("Update Alert")
    try {
        const data = await db.Alert.findOne({
            where: { id: reqAuth.sub }
        });

        // Define the properties to update
        const propertiesToUpdate = [
            "alertName",
            "thresholdValue",
            "enable",
            "emailSubject",
            "emailContent"
        ];

        propertiesToUpdate.forEach((property) => {
            if (params[property]) {
                data[property] = params[property];
            }
        });

        const response = await data.save();

        if (!data) {
            return sendResponseData(false, "Data doesn't exists", []);
        }

        // Return a successful response with the updated enterprise data
        return sendResponseData(true, "Data Updated Successfully", response);
    } catch (error) {
        loggerError.error("Error in Alert", error)
        return sendResponseData(false, "Error in Alert Repo", error)
    }
}

async function _delete(id: number) {
    const alert = await db.Alert.findByPk(id);
    if (!alert) {
        return sendResponseData(false, "Alert not found", {})
    }
    return await alert.destroy();
}