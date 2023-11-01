import fsPromises from "fs/promises";
import path from "path";
import { loggerError, loggerInfo } from "@/logger";

const dataFilePath = path.join(process.cwd(), "json/alerts.json");

export default async function handler(req: any, res: any) {
  loggerInfo.info(`getAlert`);
  try {
    const jsonData: any = await fsPromises.readFile(dataFilePath);
    const objectData = JSON.parse(jsonData);
    res.status(200).json(objectData);
  } catch (error) {
    loggerError.error(error);
    res.status(405).send({ message: `{error.message}` });
    return;
  }
}
