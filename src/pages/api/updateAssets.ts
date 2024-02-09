import { apiHandler, classRepo, classTagRepo, db } from "@/helpers/api";
import sendResponseData from "@/helpers/constant";
import { loggerError, loggerInfo } from "@/logger";
import { updateClassValidation } from "../../../validateSchema";

/**
 * Handler for updating a class and its tags.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
async function updateClass(req: any, res: any) {
  // Log information about the operation.
  loggerInfo.info("Update Class and Class Tags");

  // Extract data from the request body.
  const reqData = req.body;

  // Check if update data is provided in the request.
  if (!reqData) {
    return res.status(400).send({ message: "Update Data is required" });
  }

  // Validate the request data.
  const validation = updateClassValidation(reqData);
  if (validation.error) {
    // Handle validation errors
    res.status(400).json({
      success: false,
      message: "Validation error",
      errors: validation.error.details.map((detail) => detail.message),
    });
    return;
  }

  // Extract relevant data from validated values.
  const { id, className, ...tagData } = validation.value;

  try {
    await db.sequelize.transaction(async (transaction: any) => {

      // Update class name if provided.
      if (className) {
        await classRepo.update({ id, className });
      }

      // Process tags - delete and add.
      const { deleteTagId, addTag, parentJoinKeysUpdate } = tagData;

      // Delete tags with specified IDs.
      if (deleteTagId) {
        await classTagRepo.delete(deleteTagId);
      }

      // Add new tags if provided.
      if (addTag) {
        // Set classId for each new tag.
        addTag.forEach((ele: any) => {
          ele.classId = id;
        });

        // Bulk create new tags.
        await classTagRepo.bulkCreate(addTag, id, transaction);
      }

      // to update parentJoinKeys
      if (parentJoinKeysUpdate) {
        await db.parentJoinKey.destroy({
          where: { classId: id }
        });
        for (const pjk of parentJoinKeysUpdate) {
          await db.parentJoinKey.create({
            classId: id,
            parentTagId: pjk
          });
        }
      }

      // Send a success response.
      return res
        .status(200)
        .send(sendResponseData(true, "Class updated successfully", {}));
    })
  }
  catch (error: any) {
    // Log an error if update fails.
    loggerError.error("Cannot update class", error);

    // Send an error response.
    res.status(500).send({ message: error.message });
  }
}

// Export the API handler with the updateClass function.
export default apiHandler({
  put: updateClass,
});
