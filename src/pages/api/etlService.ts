import { apiHandler, db, imageTableRepo, modelDataRepo } from "@/helpers/api";
import { loggerInfo } from "@/logger";

// Export the default API handler for the POST method
export default apiHandler({
  post: handler,
});

async function handler(req: any, res: any) {
  // Log an information message using the 'loggerInfo' instance
  loggerInfo.info("Etl Service API");

  try {
    // Check if the HTTP method is POST; otherwise, respond with a 405 Method Not Allowed status
    if (req.method !== "POST") {
      res.status(405).send("Only POST method allowed");
      return;
    }

    // Use Sequelize transaction to ensure atomicity of database operations
    await db.sequelize.transaction(async (transaction: any) => {
      // Extract relevant data from the request body
      const data = req.body;
      const { userId, type, classId, objectId, modelId, objectValueId, ...objdata } = data;
      const { url } = objdata;

      // Create a new ModelData record in the database
      const result = await modelDataRepo.create(data, transaction);

      // Create a new Image record in the database associated with the ModelData record
      const urlData = await imageTableRepo.create(
        {
          url,
          modelDataId: result.data.dataValues.id,
        },
        transaction
      );

      // Respond with a 200 OK status and the results of the operations
      return res.status(200).json({ result, urlData });
    });
  } catch (error: any) {
    // If an error occurs, respond with a 400 Bad Request status and the error details
    return res.status(400).json(error);
  }
}
