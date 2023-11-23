import fsPromises from "fs/promises";
import path from "path";
import { loggerError, loggerInfo } from "@/logger";

const dataFilePath = path.join(process.cwd(), "json/alerts.json");

export default async function handler(req: any, res: any) {
  // Log information about the request
  loggerInfo.info(`getAlert`);

  try {
    // Read the existing data from the JSON file using fsPromises
    const jsonData: any = await fsPromises.readFile(dataFilePath);

    // Parse the JSON data
    const objectData = JSON.parse(jsonData);

    // Send the JSON data as a response
    res.status(200).json(objectData);
  } catch (error) {
    // Log the error
    loggerError.error(error);

    // Send an error response
    res.status(405).send({ message: `{error.message}` });
    return;
  }
}
