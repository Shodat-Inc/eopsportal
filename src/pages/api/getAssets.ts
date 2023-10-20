import { apiHandler, classRepo } from "@/helpers/api";

export default apiHandler({
  get: allhandler,
});

// async function handler(req: any, res: any) {
//   try {
//     const classes = await classRepo.getAllClassNames();
//     res.status(200).json(classes);
//   } catch (error: any) {
//     res.status(500).send({ message: error.message });
//     return;
//   }
// }
async function allhandler(req: any, res: any) {
  try {
    const classes = await classRepo.getClassData(req);
    res.status(200).json({ message: "Success",classes });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
    return;
  }
}
