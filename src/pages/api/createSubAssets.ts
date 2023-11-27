import fsPromises from 'fs/promises';
import path from 'path';
const dataFilePath = path.join(process.cwd(), 'json/subassets.json')

export default async function handler(req: any, res: any) {
    try {
        
      // Read the existing data from the JSON file
      const jsonData: any = await fsPromises.readFile(dataFilePath);
      let objectData: any = {};
  
      // Parse the JSON data if it exists
      if (jsonData) {
        objectData = JSON.parse(jsonData);
      }
  
      // Get the data from the request body
      const {
        assetID,
        assetName,
        slug,
        parentAssetID,
        parentAssetName,
        tags,
        parentJoinKey,
        dateCreated,
        dateModified,
        geoScopeLink,
        tagsWithDataType,
        assetTypes,
      } = req.body;
  
      // Add the new data to the object
      const newData = {
        assetID,
        assetName,
        slug,
        parentAssetID,
        parentAssetName,
        tags,
        parentJoinKey,
        dateCreated,
        dateModified,
        geoScopeLink,
        tagsWithDataType,
        assetTypes,
      };
  
      // Push the new data into the array
      objectData.push(newData);
  
      // Convert the object back to a JSON string
      const updatedData = JSON.stringify(objectData);
  
      // Write the updated data to the JSON file
      await fsPromises.writeFile(dataFilePath, updatedData);
  
      // Log information about the success
      console.log({
        position: "Try Block",
        status: res.status,
        response: res,
      });
  
      // Send a success response
      res.status(200).json({ message: 'Data stored successfully' });
    } catch (error: any) {
      // Log information about the error
      console.log({
        position: "Catch Block",
        errorObject: error,
        errorStatus: error.response ? error.response.status : null,
        errorTextMessage: error.response ? error.response.statusText : null,
      });
  
      // Send an error response with the status and statusText from the error
      res.status(error.response ? error.response.status : 500).json({
        message: error.response ? error.response.statusText : 'Internal Server Error',
      });
    }
  }
  