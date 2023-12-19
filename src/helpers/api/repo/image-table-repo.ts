import { loggerError, loggerInfo } from "@/logger";
import { db } from "../db";
import sendResponseData from "@/helpers/constant";

/**
 * Repository for handling Model Oject Image related operations.
 */
export const imageTableRepo = {
  create,
};

async function create(params: any, transaction: any) {
  loggerInfo.info("Image Table Entry");

  try {
    const modelDataId = params.modelDataId;

    if (!transaction) {
      const checkData = await db.ModelData.findOne({
        where: { id: params.modelDataId },
      }, { transaction });

      if (!checkData) {
        return sendResponseData(false, "ModelData Doesn't Exist", []);
      }
    }

    let responseArray = [];

    for (let i in params.url) {
      let url = params.url[i];

      let findURL = await db.Image.findOne({
        where: { url },
      }, { transaction });

      if (findURL) {
        if (!findURL.modelDataId) {
          await db.Image.update(
            { modelDataId: modelDataId },
            { where: { url } },
            { transaction }
          );
        }

        responseArray.push(findURL);
      } else {
        const data = { url, modelDataId };
        const newURL = new db.Image(data);
        const save = await newURL.save({ transaction });

        responseArray.push(save);
      }
    }

    // Return a successful response with the added data
    return sendResponseData(true, "Data Added Successfully", responseArray);
  } catch (error: any) {
    // Log an error message using the 'loggerError' instance
    loggerError.error("Error In ImageDataRepo", error);

    // Return an error response
    return sendResponseData(false, "Error in saving Data", error);
  }
}
