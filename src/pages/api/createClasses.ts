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

      const result = await classRepo.create(reqData, transaction);

      // Check if result contains both classData and classTags
      if ('classData' in result && 'classTags' in result) {
        const { classData, classTags } = result;
        res.send({ classData, classTags });
      } else {
        // Handle the case when the result is of the form { success: boolean; message: string; data: any; }
        const { success, message, data } = result;
        if (success) {
          res.send({ classData: data });
        } else {
          res.status(404).json({ message });
        }
      }
    });
  } catch (error: any) {
    // In case of any error during the class creation process, log the error and send back an error response.
    loggerError.error("Error in saving class", error);
    res.status(405).json({ message: "Cannot Store Data" });
  }
}
