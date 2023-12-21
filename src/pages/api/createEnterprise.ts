import { apiHandler, db } from "@/helpers/api";
import { enterpriseRepo } from "@/helpers/api/repo/enterprise-repo";
import { enterpriseAddressRepo } from "@/helpers/api/repo/enterpriseAddress-repo";
import sendResponseData from "@/helpers/constant";
import { loggerError, loggerInfo } from "@/logger";

// Define the handler function for the API route
export default apiHandler({
  // Specify the POST method handler
  post: async function handler(req: any, res: any) {
    try {
      // Log information about the request
      loggerInfo.info("Create Enterprise API");

      // Extract relevant data from the request body
      const reqData = req.body;
      const {
        enterpriseName,
        enterpriseIndustry,
        founderYear,
        website,
        description,
        employeeCount,
        superAdminName,
        roleId,
        status,
        ...resData
      } = reqData;

      await db.sequelize.transaction(async (transaction: any) => {

        // Create an enterprise using the enterprise repository
        const enterprise = await enterpriseRepo.create({
          enterpriseName,
          enterpriseIndustry,
          founderYear,
          website,
          description,
          employeeCount,
          superAdminName,
          roleId,
          status
        }, transaction);

        // Check if the enterprise creation was successful
        if (!enterprise.success) {
          // Send a response indicating failure
          return res.send(sendResponseData(false, enterprise.message, []));
        }

        // Extract address-related data from the response data
        const { city, state, pincode, address } = resData;

        // Create an enterprise address using the enterprise address repository
        const enterpriseAddress = await enterpriseAddressRepo.create({
          city,
          state,
          pincode,
          address,
          enterpriseId: enterprise.data.id,
        }, transaction);

        // Send a success response
        res.status(200).json({ message: enterprise });
      })
    } catch (error: any) {
      // Log the error to the console
      loggerError.error("Error in Enterprise API", error);

      // Send an error response
      res.status(400).json({ message: "Error in Saving Enterprise" });
    }
  },
});

