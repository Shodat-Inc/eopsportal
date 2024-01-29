import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import message from "@/util/responseMessage";

export const alertRepo = {
  create,
  getAllAlert,
  getAlertById,
  update,
  delete: _delete,
};

async function create(params: any) {
  loggerInfo.info("Post api/createAlerts to create Alerts");

  try {
    const data = await db.Alert.findOne({
      where: {
        alertName: params.alertName,
      },
    });

    if (data) {
      return sendResponseData(false, "Alert Name already Exists", {});
    }

    const newAlert = new db.Alert(params);

    const save = await newAlert.save();

    // Return a successful response with the saved data
    return sendResponseData(true, "Alert Created Successfully", save);
  } catch (error) {
    loggerError.error("Error in Alert Repo", error);
    return sendResponseData(false, "Error in Alert Repo", error);
  }
}

async function getAllAlert() {
  loggerInfo.info("Get all Alerts");
  try {
    const data = await db.Alert.findAll({
      attributes: [
        "id",
        "alertName",
        "rangeValue",
        "thresholdValue",
        "receiverEmailAddresses",
        "isEnabled",
        "createdAt",
        "updatedAt",
      ],
    });
    if (!data.length) {
      return sendResponseData(false, "Data doesn't Exists", {});
    }
    return sendResponseData(true, "Alert Data fetched successfully", data);
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
    const data = await db.Alert.findOne({
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
    const data = await db.Alert.findOne({
      where: { id: reqAuth.id },
    });
    if (!data.length) {
      return sendResponseData(false, "Data doesn't exist", []);
    }

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
  const alert = await db.Alert.findByPk(id);
  if (!alert) {
    return sendResponseData(false, "Alert not found", {});
  }
  const response = await alert.destroy();
  return sendResponseData(true, "Alert Deleted Successfuly", response);
}
