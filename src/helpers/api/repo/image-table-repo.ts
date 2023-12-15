import { loggerError, loggerInfo } from "@/logger";
import { db } from "../db";
import sendResponseData from "@/helpers/constant";
export const imgaeTableRepo = {
  create,
};
async function create(params: any) {
  loggerInfo.info("Image Table Entry");
  try {
    const modelDataId = params.modelDataId;
const checkData = await db.ModelData.findOne({
  where: { id: params.modelDataId },
});

if (!checkData) {
  return sendResponseData(false, "ModelData Doesn't Exist", []);
}

let responseArray = [];

for (let i in params.url) {
  let url = params.url[i];
  let findURL = await db.Image.findOne({
    where: { url: url },
  });

  if (findURL) {
    if (!findURL.modelDataId) {
      await db.Image.update(
        { modelDataId: modelDataId },
        { where: { url: url } }
      );
    }
    responseArray.push(findURL);
  } else {
    const data = { url, modelDataId };
    const newURL = new db.Image(data);
    const save = await newURL.save();
    responseArray.push(save);
  }
}
    return sendResponseData(true, "Data Added Successfuly", responseArray);
  } catch (error: any) {
    loggerError.error("Error In ImageDataRepo");
    return sendResponseData(false, "Error in saving Data", error);
  }
}
