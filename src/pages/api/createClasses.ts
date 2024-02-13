import { apiHandler, classTagRepo, db } from "@/helpers/api";
import { classRepo } from "@/helpers/api/repo/class-repo";
import { parentJoinKeyRepo } from "@/helpers/api/repo/parentJoinRepo";
import { loggerInfo, loggerError } from "@/logger";
import { createClassValidation } from "../../../validateSchema";

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
    const reqData = {
      ...req.body,
      userId: req.id,
      enterpriseId: req.enterpriseId,
    };
    const validation = createClassValidation(req.body);
    if (validation.error) {
      // Handle validation errors
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validation.error.details.map((detail) => detail.message),
      });
      return;
    }

    await db.sequelize.transaction(async (transaction: any) => {
      // Create a new class entry using the provided data.
      const classData = await classRepo.create(reqData, transaction);
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
      const data = req.body.primaryKeys;
      // Bulk create class tags using the populated tag data.
      const classTags = await classTagRepo.bulkCreate(
        tagData,
        classId,
        transaction
      );

      const classTagData = classTags.data;
      if (data) {
        const primaryKeyIds = data.forEach((primaryKey: any) => {
          classTagData.forEach(async (classTagData: any) => {
            if (classTagData.dataValues.tagName === primaryKey) {
              var insertData = {
                classTagId: classTagData.dataValues.id,
                classId: classId,
                userId: req.id,
              };
              const newTicket = new db.PrimaryKey(insertData);
              await newTicket.save(newTicket);
            }
          });
        });
      }

      const tagIdArr: any = [];
      if (reqData.parentJoinKey && reqData.parentJoinKey.length) {
        const classTagId = await classTagRepo.getClassTags(
          reqData.parentJoinKey,
          transaction
        );
        classTagId.data.forEach((element: any) => {
          tagIdArr.push({
            classId,
            parentTagId: element.id,
          });
        });
        const values = await parentJoinKeyRepo.bulkCreate(
          tagIdArr,
          classId,
          transaction
        );
      }
      // Send back a successful response with the class and tag data.
      res.send({ classData, classTags });
    });
  } catch (error: any) {
    // In case of any error during the class creation process, log the error and send back an error response.
    loggerError.error("Error in saving class", error);
    res.status(405).json({ message: "Cannot Store Data " });
  }
}
