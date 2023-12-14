import sendResponseData from "@/helpers/constant";
import { db, dbConnection } from "../db";
import { Response } from "../models";
export const responseDataRepo = {
  saveResponse,
  get
};
async function saveResponse(params: any) {
  try {
    // const data = await db.Response.findOne({
    //   where: { modelValueId: params.modelValueId },
    // });
    const newEntry = new db.Response(params);
    const save = await newEntry.save();
    return sendResponseData(true, "Response Saved Successfully", save);
  } catch (error: any) {
    return sendResponseData(false, "Error", error);
  }
}
async function get(params: any) {
  try {
    const sequelize = await dbConnection()
    const data = await Response(sequelize, "Workplace Detection")
    const res=data.findAll({
      where: { id: params.id },
      attributes: ["modelValuesId", "response"]
    });
    if (!data) {
      return sendResponseData(false, "Data Doesn't Exist", {})
    }
    return sendResponseData(true, "Data Fetched", res);
  } catch (error: any) {
    return sendResponseData(false, "Error", error);
  }

}