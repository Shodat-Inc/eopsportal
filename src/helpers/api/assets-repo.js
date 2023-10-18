import getConfig from "next/config";
import { db } from "../api/db";
import sendResponseData from "../constant";

export const assetRepo = {
  create,
};


async function create(params) {
  try {
    const asset = new db.Assets(params);
    // save user
    const data = await asset.save();
    return sendResponseData(true, "Asset added successfully", data);
  } catch (error) {
    return sendResponseData(false, "error", error);
  }
}
