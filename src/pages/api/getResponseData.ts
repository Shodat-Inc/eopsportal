import { apiHandler } from "@/helpers/api";
import { responseDataRepo } from "@/helpers/api";
import { saveResponseValidation } from "../../../validateSchema"

export default apiHandler({
  get: handler,
});
async function handler(req: any, res: any) {
  try {
    // if (req.method !== "") {
    //   res.status(405).send("Only Post Method Allowed");
    //   return;
    // }
    const data = req.query;
    //saveResponseValidation
    // const validation = saveResponseValidation(data);

    // // Check for validation errors
    // if (validation.error) {
    //   // Handle validation errors
    //   res.status(400).json({
    //     success: false,
    //     message: "Validation error",
    //     errors: validation.error.details.map((detail) => detail.message),
    //   });
    //   return;
    // }

    const result = await responseDataRepo.get(data);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json(error);
  }
}
