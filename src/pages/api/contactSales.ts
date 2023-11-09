import { apiHandler, classRepo } from "@/helpers/api";
import { contactSalesRepo } from "@/helpers/api/repo/contactSales-repo";
import { loggerError, loggerInfo } from "@/logger";
export default apiHandler({
  post: handler,
});
  loggerInfo.info("Post Class");
  try {
    const contactSale = await contactSalesRepo.create(req.body);
    
    res.status(200).json(contactSale);
  } catch (error: any) {
    loggerError.error("error in posting class");
    res.status(400).json(error);
  }
}
