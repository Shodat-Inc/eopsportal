export const generateRandomAlphaNumeric = async ({
    length = 5,
    model = null,
}) => {
    const alphanumericChars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id: string = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
        id += alphanumericChars.charAt(randomIndex);
    }
    if (model) {
        id = await checkUniqueId(id, model);
    }
    return id;
};

async function checkUniqueId(
    generateSerialID: string,
    model: any
): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            let checkSerialID = await model.findOne({
                where: { serialID: generateSerialID },
            });
            while (checkSerialID) {
                generateSerialID = await generateRandomAlphaNumeric({});
                checkSerialID = await model.findOne({
                    where: { serialID: generateSerialID },
                });
            }
            resolve(generateSerialID);
        } catch (e) {
            reject(e);
        }
    });
}