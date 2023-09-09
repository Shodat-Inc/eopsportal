import fsPromises from 'fs/promises';
import path from 'path';
const dataFilePath = path.join(process.cwd(), 'json/subassets.json')

export default async function handler(req:any, res:any) {
    try {
        // if (req.method !== 'POST') {
        //     res.status(405).send({ message: 'Only POST requests allowed' })
        //     return
        // }
        // Read the existing data from the JSON file
        const jsonData:any = await fsPromises.readFile(dataFilePath);
        let objectData:any = {}
        if (jsonData) {
            objectData = JSON.parse(jsonData);
        }

        // Get the data from the request body
        const { assetID, assetName, slug, parentAssetID, parentAssetName, tags, parentJoinKey,  dateCreated, dateModified, geoScopeLink, tagsWithDataType, assetTypes   } = req.body;

        // Add the new data to the object
        const newData = {
            assetID, assetName, slug, parentAssetID, parentAssetName, tags, parentJoinKey, dateCreated, dateModified, geoScopeLink, tagsWithDataType, assetTypes 
        };
        objectData.push(newData);

        // Convert the object back to a JSON string
        const updatedData = JSON.stringify(objectData);

        // Write the updated data to the JSON file
        await fsPromises.writeFile(dataFilePath, updatedData);

        console.log({
            position: "Try Block",
            status : res.status,
            response: res
        })

        // Send a success response
        res.status(200).json({ message: 'Data stored successfully' });
    } catch (error:any) {
        console.log({
            position: "Catch Block",
            errorObject:error, 
            errorStatus: error.response.status, 
            errorTextMessage: error.response.statusText
        });
        // Send an error response
        res.status(error.response.status).json({ message: error.response.statusText });
    }
};