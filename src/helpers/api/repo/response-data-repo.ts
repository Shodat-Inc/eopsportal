import sendResponseData from "@/helpers/constant";
import { db } from "../db";

export const responseDataRepo = {
  saveResponse,
  get
};

async function saveResponse(params: any) {
  try {
    //Filter the data based on the unique "imageObjectId" associated with each image URL.
    console.log(params, "==oparams")
    const data = await db.CrackResponse.findOne({
      where: { imageObjectId: params.imageObjectId },
    });
    if (data) {
      return sendResponseData(false, "Response Already Exist with given imageObjectId", {})
    }
    const newEntry = new db.CrackResponse(params);
    const save = await newEntry.save();
    return sendResponseData(true, "Response Saved Successfully", save);
  } catch (error: any) {
    return sendResponseData(false, "Error", error);
  }
}

async function get(params: any) {
  try {
    const data = await db.Response.findAll({
      where: { id: params.id },
      attributes: ["modelValuesId", "response"]
    });
    if (!data) {
      return sendResponseData(false, "Data Doesn't Exist", {})
    }
    return sendResponseData(true, "Data Fetched Successfully", data);
  } catch (error: any) {
    return sendResponseData(false, "Error", error);
  }
}