import sendResponseData from "@/helpers/constant";
import { db } from "../db";
export const responseDataRepo = {
  saveResponse,
};
async function saveResponse(params: any) {
  try {
    // const data = await db.Response.findOne({
    //   where: { modelValueId: params.modelValueId },
    // });
    const newEntry = new db.Response(params);
    const save = await newEntry.save();
    return sendResponseData(true, "Reponse Saved Successfully", save);
  } catch (error: any) {
    return sendResponseData(false, "Error", error);
  }
}
