import message from "@/util/responseMessage";
import { apiHandler, usersRepo } from "../../helpers/api";
import sendResponseData from "../../helpers/constant";
import { signInValidation } from "../../../validateSchema";


// Default API handler for the POST method to handle user authentication.
export default apiHandler({
  post: handler,
});

/**
 * Handler function to process user authentication.
 *
 * @param {Object} req - The incoming request object containing user authentication details.
 * @param {Object} res - The response object to send back the results.
 */
async function handler(req: any, res: any) {
  try {
    // Ensure that the method used is POST, otherwise return a 405 Method Not Allowed error.
    if (req.method !== "POST") {
      return res
        .status(405)
        .send(sendResponseData(false, message.error.postMethodError, []));
    }
    
    const validation = signInValidation(req.body);
    if (validation.error) {
      // Handle validation errors
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validation.error.details.map((detail) => detail.message),
      });
      return;
    }

    // Attempt to authenticate the user using the usersRepo.
    const data = await usersRepo.authenticate(validation.value);

    // If successful, return a 200 OK response with the authentication data.
    return res.status(200).send(data);
  } catch (error: any) {
    // If there's an error during the authentication process, return the error's status and message.
    res
      .status(error.response.status)
      .json({ message: error.response.statusText });
  }
}
