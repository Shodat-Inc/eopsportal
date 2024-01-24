import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import { Sequelize } from "sequelize";
import message from "@/util/responseMessage";

export const raisedAlertRepo = {
  create,
  get
}

async function create(params: any) {
  try {

    const newAlertRaised = new db.RaisedAlert(params);

    const save = await newAlertRaised.save();

    return sendResponseData(true, "Alert Raised Created Successfully", save);
  } catch (error) {
    loggerError.error("Error in creating Raised Alert API", error)
    return sendResponseData(false, "Error in creating Raised Alert Repo", error)
  }

}

async function get(params: any) {
  loggerInfo.info("Get API of Raised Alert Data");
  try {
    const alertDetails = await db.RaisedAlert.findAll({
      attributes: ['tags'],
      include: [
        {
          model: db.Image,
          attributes: ['url'],
          where: {
            id: Sequelize.col('RaisedAlert.modelObjectImageId')
          },
        },
        {
          model: db.ModelData,
          attributes: ['objectValueId'],
          where: {
            id: Sequelize.col('RaisedAlert.modelDataId')
          },
          include: [
            {
              model: db.AddValues,
              attributes: ['values'],
              where: {
                id: Sequelize.col('ModelDatum.ObjectValue.id')
              },
            },
          ],
        },
      ],
    });

    return sendResponseData(true, "Data fetched Successfully", alertDetails)
  } catch (error) {
    loggerError.error("Error in Raised Alert Repo", error);
    return sendResponseData(false, "Error in Raised Alert Repo", error);
  }
}
