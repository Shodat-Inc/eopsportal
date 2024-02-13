export const generateRandomAlphaNumeric = async ({
  length = 5,
  model = null,
  transaction = null,
  prefix = "", // Add a new parameter for prefix
}) => {
  const alphanumericChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id: string = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
    id += alphanumericChars.charAt(randomIndex);
  }

  id = `${prefix}-${id}`; // Use the provided prefix

  if (model) {
    id = await checkUniqueId(id, model, transaction, prefix);
  }
  return id;
};

// ...

// Use the prefix parameter in checkUniqueId function
async function checkUniqueId(
  generateSerialID: string,
  model: any,
  transaction: any,
  prefix: string
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let checkSerialID = await model.findOne({
        where: { serialID: generateSerialID },
      });
      while (checkSerialID) {
        generateSerialID = await generateRandomAlphaNumeric({});

        checkSerialID = await model.findOne(
          {
            where: { serialID: generateSerialID },
          },
          { transaction }
        );
      }

      resolve(generateSerialID);
    } catch (e) {
      reject(e);
    }
  });
}
