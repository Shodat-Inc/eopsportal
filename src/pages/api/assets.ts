// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fsPromises from 'fs/promises';
import path from 'path';
import { apiHandler, assetRepo } from "../../helpers/api";

// const dataFilePath = path.join(process.cwd(), 'json/assets.json')
const dataFilePath = path.resolve(process.cwd(), "json/assets.json")
export default apiHandler({
    post: handler,
  });
  
async function handler(req:any, res:any) {
    try {
        if (req.method !== 'POST') {
            res.status(405).send({ message: 'Only POST requests allowed' })
            return
        }
        // Get the data from the request body
        const { assetID, assetName, slug, assetkey, dateModified, dateCreated, assetTypes, tags } = req.body;
        const data = await assetRepo.create(req.body);

        // Send a success response
        res.status(200).json({ message: 'Data stored successfully' });
    } catch (error) {
        console.error(error);
        // Send an error response
        res.status(500).json({ message: 'Error storing data' });
    }
};