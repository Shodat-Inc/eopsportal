import { trainModel } from "./trainModel";

export default function repoName(inputData: string) {
  return new Promise(async (resolve, reject) => {
    try {
      let name: string = "";
      for (let key in trainModel) {
        if (key == inputData) {
          const modelName = trainModel[key];
          const modelModule = await import(
            `../helpers/api/repo/${modelName}.ts`
          );
          name = modelModule;
        }
      }
      resolve(name);
    } catch (error) {
      reject(error);
    }
  });
}
