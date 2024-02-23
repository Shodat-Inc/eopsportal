import { loggerError, loggerInfo } from "@/logger";
import { db } from "../db";
import sendResponseData from "@/helpers/constant";
import { paginateQuery } from "../constant/pagination";

export const tyreAlertRepo = {
  create,
  getAllAlert,
  update,
  delete: _delete
};

async function create(params: any) {
  loggerInfo.info("Post api/createAlerts to create Alerts");

  try {
    const data = await db.TyreAlerts.findOne({
      where: {
        alertName: params.alertName,
      },
    });

    if (data) {
      return sendResponseData(false, "Alert Name already Exists", {});
    }

    const newAlert = new db.TyreAlerts(params);

    const save = await newAlert.save();

    // Return a successful response with the saved data
    return sendResponseData(true, "Alert Created Successfully", save);
  } catch (error) {
    loggerError.error("Error in Alert Repo", error);
    return sendResponseData(false, "Error in Alert Repo", error);
  }
}

async function getAllAlert(params: any) {
  loggerInfo.info("Get all Alerts");
  try {
    const page = params.query.page || 1;
    const pageSize = params.query.pageSize || 10;
    let sortOrder = 'DESC'; // Default sorting order is DESC
    let sortField = "id";
    let whereClause;

    if (params.query.id) {
      whereClause = { id: params.query.id };
    }

    // Check if sortBy parameter is provided and valid
    if (params.query.sortBy && ['ASC', 'DESC'].includes(params.query.sortBy.toUpperCase())) {
      sortOrder = params.query.sortBy.toUpperCase();
    }
    if (params.query.sort && ['id', 'alertName', 'recommendation', 'distanceRange', 'value', 'isEnabled', 'receiverEmailAddresses', 'emailTemplateId', 'createdAt'].includes(params.query.sort)) {
      sortField = params.query.sort;
    }
    const result = await paginateQuery(db.TyreAlerts, page, pageSize, {
      attributes: [
        "id",
        "alertName",
        "recommendation",
        "distanceRange",
        "value",
        "isEnabled",
        "receiverEmailAddresses",
        "modelObjectImageId",
        "userId",
        "enterpriseId",
        "emailTemplateId",
        "createdAt",
        "updatedAt",
      ],
      order: [[sortField, sortOrder]],
      where: whereClause
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

async function update(params: any, reqAuth: any) {
  loggerInfo.info("Update Alert");
  try {
    const data = await db.TyreAlerts.findOne({
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
      "recommendation",
      "distanceRange",
      "value",
      "isEnabled",
      "receiverEmailAddresses",
      "modelObjectImageId",
      "userId",
      "enterpriseId",
      "emailTemplateId",

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
  const alert = await db.TyreAlerts.findByPk(id);
  if (!alert) {
    return sendResponseData(false, "Tyre Alert not found", {});
  }
  const response = await alert.destroy();
  return sendResponseData(true, "Tyre Alert Deleted Successfuly", response);
}