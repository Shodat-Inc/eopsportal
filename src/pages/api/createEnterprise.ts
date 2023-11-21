import { apiHandler } from "@/helpers/api";
import { enterpriseRepo } from "@/helpers/api/repo/enterprise-repo";
import { enterpriseAddressRepo } from "@/helpers/api/repo/enterpriseAddress-repo";
import sendResponseData from "@/helpers/constant";
import { loggerError, loggerInfo } from "@/logger";
export default apiHandler({
  post: handler,
});
async function handler(req: any, res: any) {
  try {
    loggerInfo.info("Create Enterprise API");
    const reqData = req.body;
    const {
      enterpriseName,
      enterpriseIndustry,
      founderYear,
      website,
      description,
      employeeCount,
      superAdminName,
      roleId,
      ...resData
    } = reqData;
    const enterprise = await enterpriseRepo.create({
      enterpriseName,
      enterpriseIndustry,
      founderYear,
      website,
      description,
      employeeCount,
      superAdminName,
      roleId,
    });
    if (!enterprise.success) {
      return res.send(sendResponseData(false, enterprise.message, []));
    }
    const { city, state, pincode, address } = resData;
    const enterpriseAddress = await enterpriseAddressRepo.create({
      city,
      state,
      pincode,
      address,
      enterpriseId: enterprise.data.id,
    });
    res.status(200).json({ message: enterprise });
  } catch (error: any) {
    loggerError.error("Error in Enterprise API");
    res.status(400).json({ message: "Error in Saving Enterprise" });
  }
}
