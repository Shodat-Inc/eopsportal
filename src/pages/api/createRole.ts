import { apiHandler, classRepo } from "@/helpers/api";
import { roleRepo } from "@/helpers/api/repo/role-repo";
import { loggerError, loggerInfo } from "@/logger";
import { createRoleValidation } from "../../../validateSchema";

export default apiHandler({
  post: handler,
});

async function handler(req: any, res: any) {
  loggerInfo.info("Post Class");
  try {
    const data = req.body;
    const validation = createRoleValidation(data);
    if (validation.error) {
      // Handle validation errors
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validation.error.details.map((detail) => detail.message),
      });
      return;
    }
    const role = await roleRepo.create(validation.value);
    // const role = await roleRepo.create(data);
    res.status(200).json(role);
  } catch (error: any) {
    loggerError.error("Error in Creating Role");
    res.status(400).json(error);
  }
}
