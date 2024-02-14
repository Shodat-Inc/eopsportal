import { apiHandler, usersRepo } from "@/helpers/api";
import { loggerError, loggerInfo } from "@/logger";
import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

// Default API handler for the GET method to retrieve enterprise user by Id.
export default apiHandler({
  get: getEnterpriseUser,
});

/**
 * Handler function to process GET requests for retrieving Enterprise User by Id.
 *
 * @param {Object} req - The incoming request object.
 * @param {Object} res - The response object to send back the results.
 */
async function getEnterpriseUser(req: NextApiRequest, res: NextApiResponse) {
  loggerInfo.info("GET Enterprise User");
  try {
    //Get the id from query params
    const userId: Partial<{
      [key: string]: string | string[];
    }> = req.query;

    // Retrieve Enterprise User by id using the EnterpriseUsers Repo.
    const users = await usersRepo.getEnterpriseUserById(userId);
    // If Enterprise User is successfully retrieved, send back a 200 OK response with the Enterprise User's data.
    res.status(200).json(users);
  } catch (error: any) {
    // If there's an error during the retrieval, log the error and send back a 500 Internal Server Error response with the error message.
    loggerError.error("Cant fetch User(s)", error);
    res.status(500).send({ message: error.message });
  }
}
