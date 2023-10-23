import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";

// Object to manage address-related database operations.
export const addressRepo = {
  create,
};

/**
 *
 * @param {Object} params - The parameters containing information to save the address.
 * @returns {Object} - Response object indicating the success or failure of the operation.
 */
async function create(params: any) {
  // Logging the initiation of an address creation.
  loggerInfo.info(`POST api/createUsers Save Address`);

  try {
    // Validate that the userId is provided.
    if (params.userId) {
      // Retrieve the user by its primary key (ID) from the database.
      const user = await db.User.findByPk(params.userId);

      // If no user is found with the given ID, return an error response.
      if (!user) {
        return sendResponseData(false, "User doesn't exist", {});
      }
    } else {
      // If userId isn't provided, return an error response.
      return sendResponseData(false, "UserId not provided", {});
    }

    // Create a new address instance using the provided parameters.
    const address = new db.Address(params);

    // Save the new address to the database.
    const data = await address.save();

    // Return a successful response indicating the address was added.
    return sendResponseData(true, "Address added successfully", data);
  } catch (error) {
    // Log the error if saving the address fails.
    loggerError.error("Cant Save Address", error);
    // Return a response indicating the failure of the operation.
    return sendResponseData(false, "error", error);
  }
}
