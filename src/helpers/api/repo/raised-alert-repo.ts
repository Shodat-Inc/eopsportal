import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import { Sequelize } from "sequelize";
import message from "@/util/responseMessage";
import { paginateQuery } from "../constant/pagination";

export const raisedAlertRepo = {
  get
}

async function get(params: any) {
  loggerInfo.info("Get API of Raised Alert Data");
  try {
    const page = params.query.page || 1;
    const pageSize = params.query.pageSize || 10;
    let sortOrder = 'DESC'; // Default sorting order is DESC
    let sortField = "id";

    // Check if sortBy parameter is provided and valid
    if (params.query.sortBy && ['ASC', 'DESC'].includes(params.query.sortBy.toUpperCase())) {
      sortOrder = params.query.sortBy.toUpperCase();
    }
    if (params.query.sort && ['id', 'alertTableName', 'tableName', 'createdAt'].includes(params.query.sort)) {
      sortField = params.query.sort;
    }

    const result = await paginateQuery(db.RaisedAlert, page, pageSize, {
      where: { userId: params.auth.sub },
      include: [
        {
          model: db.Image,
          attributes: ['url'],
          where: {
            id: Sequelize.col('RaisedAlert.modelObjectImageId')
          },
        },
        {
          model: db.AddClasses,
          attributes: ['id', 'className', 'userId']
        },
      ],
    });
    if (!result.rows.length) {
      return sendResponseData(false, "Data Not Found", {})
    }

    return sendResponseData(true, "Data fetched Successfully", result)
  } catch (error) {
    loggerError.error("Error in Raised Alert Repo", error);
    return sendResponseData(false, "Error in Raised Alert Repo", error);
  }
}
