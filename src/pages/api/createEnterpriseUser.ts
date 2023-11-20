import { apiHandler } from "@/helpers/api";
import { EnterpriseUsersRepo } from "@/helpers/api/repo/enterpriseUser-repo";
import { loggerError, loggerInfo } from "@/logger";
import { createEnterpriseUserValidation } from "../../../validateSchema";
import message from "@/util/responseMessage";

export default apiHandler({
    post: handler,
});

async function handler(req: any, res: any) {
    loggerInfo.info("Post Class");
    try {
        if (req.method !== "POST") {
            res.status(405).send(message.error.postMethodError);
            return;
          }
        const data = req.body;
        const validation = createEnterpriseUserValidation(data);
        if (validation.error) {
            // Handle validation errors
            res.status(400).json({
                success: false,
                message: "Validation error",
                errors: validation.error.details.map((detail) => detail.message),
            });
            return;
        }
        const user = await EnterpriseUsersRepo.create(validation.value);
        res.status(200).json({ message: user });
    } catch (error: any) {
        loggerError.error("error in posting class");
        res.status(400).json(error);
    }
}
