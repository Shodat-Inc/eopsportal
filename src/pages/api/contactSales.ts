import { apiHandler, classRepo } from "@/helpers/api";
import { ContactSalesRepo } from "@/helpers/api/repo/contactSale-repo";
import { loggerError, loggerInfo } from "@/logger";
export default apiHandler({
  post: handler,
});

async function handler(req: any, res: any) {
  loggerInfo.info("Post Class");
  try {
    const contactSale = await ContactSalesRepo.create(req.body);

    res.status(200).json(contactSale);
  } catch (error: any) {
    loggerError.error("error in posting class");
    res.status(400).json(error);
  }
}
