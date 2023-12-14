import { apiHandler } from "@/helpers/api";
import { ImageObjectRepo } from "@/helpers/api/repo/image-object-repo";
import { loggerError, loggerInfo } from "@/logger";
import message from "@/util/responseMessage";

// Define the handler function for the API route
export default apiHandler({
    // Specify the POST method handler
    post: async function handler(req: any, res: any) {
        try {
            // Log information about the request
            loggerInfo.info("Post Class");

            // Check if the request method is not POST
            if (req.method !== "POST") {
                // Send a response indicating method not allowed
                res.status(405).send(message.error.postMethodError);
                return;
            }
            const id = req.auth.sub;  

            // Extract data from the request body
            const data = req.body;
            const user = await ImageObjectRepo.create(id, data);

            // Send a success response
            res.status(200).json({ message: user });
        } catch (error: any) {
            // Log the error to the console
            loggerError.error("error in posting class");

            // Send an error response
            res.status(400).json(error);
        }
    },
});

