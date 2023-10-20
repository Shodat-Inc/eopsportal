import { apiHandler, objectRepo } from "@/helpers/api";

export default apiHandler({
  get: allhandler,
});

async function allhandler(req: any, res: any) {
  try {
    const objects = await objectRepo.get(req);
    if (!objects || (Array.isArray(objects) && objects.length === 0)) {
      res.status(404).json({ message: "No data found." });
      return;
    }
    res.status(200).json({ message: "Success", objects });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
    return;
  }
}
