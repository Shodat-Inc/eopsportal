import { apiHandler, classTagRepo } from "@/helpers/api";
import { classRepo } from "@/helpers/api/repo/class-repo";
import { parentJoinKeyRepo } from "@/helpers/api/repo/parentJoinRepo";
import { CreateClass } from "@/interface";
import { loggerInfo, loggerError } from "@/logger";

// Default API handler for the POST method to handle class creation.
export default apiHandler({
  post: handler,
});

/**
 * Handler function to process the class creation request.
 *
 * @param {Object} req - The incoming request object containing class and its tags.
 * @param {Object} res - The response object to send back the results.
 */
async function handler(req: any, res: any) {
  loggerInfo.info("Class Creation API:");
  try {
    // Ensure that the request method is POST. If not, send back an appropriate error response.
    if (req.method !== "POST") {
      res.status(405).send({ message: "Only POST requests allowed" });
      return;
    }

    // Construct the request data object, ensuring the user ID is added.
    const reqData: CreateClass = {
      ...req.body,
      userId: req.id,
    };

    // Create a new class entry using the provided data.
    const classData = await classRepo.create(reqData);
    const classId = classData.data.id;

    // Create a new array to store tags for the class.
    const tagData = [];

    // Populate the tag data from the request.
    for (let key of reqData.tags) {
      tagData.push({
        tagName: key.tagName,
        dataTypeId: key.dataTypeId,
        classId: classId,
      });
    }

    // Bulk create class tags using the populated tag data.
    const classTags = await classTagRepo.bulkCreate(tagData, classId);
    const tagIdArr: any = [];
    if (reqData.parentJoinKey && reqData.parentJoinKey.length ) {
      const classTagId = await classTagRepo.getClassTags(reqData.parentJoinKey);
      classTagId.data.forEach((element: any) => {
        tagIdArr.push({
          classId,
          parentTagId: element.id,
        });
      });
      const values = await parentJoinKeyRepo.bulkCreate(tagIdArr, classId);
    }
    // Send back a successful response with the class and tag data.
    res.send({ classData, classTags });
  } catch (error: any) {
    // In case of any error during the class creation process, log the error and send back an error response.
    loggerError.error("Error in saving class", error);
    res.status(405).json({ message: "Cannot Store Data " });
  }
}
