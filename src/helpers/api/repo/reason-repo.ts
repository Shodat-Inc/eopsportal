import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";

// Repository for reason-related operations.
export const reasonRepo = {
  create,
};

/**
 * Asynchronously creates a new reason entry in the database.
 *
 * @param {Object} params - The parameters containing information to save the reason.
 * @returns {Object} - Response object indicating the success or failure of the operation.
 */
async function create(params: any) {
  // Log the initiation of reason creation.
  loggerInfo.info("Reason repo");

  try {
    // Create a new Reason instance using the provided parameters.
    const reason = new db.Reason(params);

    // Save the new reason to the database.
    const data = await reason.save();

    // Return a successful response indicating the reason was added.
    return sendResponseData(true, "Reason added successfully", data);
  } catch (error) {
    // Log the error if there's an issue with the reason creation.
    loggerError.error("Cant Save Reason", error);
    // Return a response indicating the failure of the operation.
    return sendResponseData(false, "error", error);
  }
}
