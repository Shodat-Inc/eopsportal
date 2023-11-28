import { apiHandler, db } from "@/helpers/api";
import { generalizedSearch } from "@/helpers/api/search/search";
import { loggerError, loggerInfo } from "@/logger";

// Handle GET requests with the search function
export default apiHandler({
  get: search,  
});

async function search(req: any, res: any) {
  // Log information about the request
  loggerInfo.info("Search Class");

  try {
    // Extract the query parameter from the request
    const query = req.query.className;

    // Define the fields to search in (in this case, only "className")
    const field = ["className"];

    // Perform the search using generalizedSearch function
    const result = await generalizedSearch(db.AddClasses, field, query);

    // Return the result as a JSON response
    return res.status(200).json(result);
  } catch (error: any) {
    // Log the error
    loggerError.error("Error in searching class");

    // Return an error response
    return res.status(400).json(error);
  }
}
