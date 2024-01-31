import { apiHandler, mailTemplateRepo } from "@/helpers/api";
import { loggerError } from "@/logger";

// Default API handler for the GET method to retrieve all users.
export default apiHandler({
  get: getAllEmailTemplates,
});

async function getAllEmailTemplates(req: any, res: any) {
  try {

    const mail = await mailTemplateRepo.getAll();

    res.status(200).json(mail);
  } catch (error: any) {
    loggerError.error("Cant fetch Email(s)", error);
    res.status(500).send({ message: error.message });
  }
}
