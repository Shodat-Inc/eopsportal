// import { apiHandler, usersRepo } from "@/helpers/api";
// import { loggerError } from "@/logger";

// export default apiHandler({
//   get: handleGetRequest,
// });

// async function handleGetRequest(req: any, res: any) {
//   try {
//     const id = req.id;
//     if (!id) {
//       res.error(400).json("Id isn't in the database");
//     } else {
//       const user = await usersRepo.getById(id);
//       if (!user) {
//         return res.status(404).send({ message: "User not found" });
//       }
//       res.status(200).json(user);
//     }
//   } catch (error: any) {
//     loggerError.error("Cant fetch User", error);
//     res.status(500).send({ message: error.message });
//   }
// }

import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'json/users.json')

export default async function handler(req:any, res:any) {
    try {
        const jsonData:any = await fsPromises.readFile(dataFilePath);
        const objectData = JSON.parse(jsonData);
        res.status(200).json(objectData);

    } catch (error) {
        res.status(405).send({ message: `{error.message}` })
        return
    }
};