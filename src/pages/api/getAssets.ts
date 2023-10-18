import { apiHandler, classRepo } from "@/helpers/api";

export default apiHandler({
  get: handler,
});

async function handler(req: any, res: any) {
  try {
    const classes = await classRepo.getAllClassNames();
    res.status(200).json(classes);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
    return;
  }
}
