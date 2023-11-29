import { apiHandler } from "@/helpers/api";
import { ContactSalesRepo } from "@/helpers/api/repo/contactSale-repo";
import { loggerError, loggerInfo } from "@/logger";
import { contactSales } from "../../../validateSchema";

// Export the default apiHandler with the POST method handled by the handler function
export default apiHandler({
  post: handler,
});

// Define the handler function for POST requests
async function handler(req: any, res: any) {
  // Log the initiation of posting a class
  loggerInfo.info("Post Class");

  try {
    const reqData = req.body
    const validation = contactSales(reqData);
    if (validation.error) {
      // Handle validation errors
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validation.error.details.map((detail) => detail.message),
      });
      return;
    }
    // Create a new entry in the database using ContactSalesRepo.create
    const contactSale = await ContactSalesRepo.create(validation.value);

    // Send a successful response with the created entry
    res.status(200).json(contactSale);
  } catch (error: any) {
    // Log an error if an exception occurs during the process
    loggerError.error("Error in posting class");

    // Send an error response with details about the error
    res.status(400).json(error);
  }
}

