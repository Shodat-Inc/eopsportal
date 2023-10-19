// import { apiHandler, classRepo } from "@/helpers/api";

// export default apiHandler({
//   get: handler,
// });

// async function handler(req: any, res: any) {
//   try {
//     const classes = await classRepo.getAllClassNames();
//     res.status(200).json(classes);
//   } catch (error: any) {
//     res.status(500).send({ message: error.message });
//     return;
//   }
// }

import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'json/assets.json')

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