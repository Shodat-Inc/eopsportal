import { loggerError, loggerInfo } from "@/logger";
import { db } from "../db";
import sendResponseData from "@/helpers/constant";
import { Sequelize } from "sequelize";
import message from "@/util/responseMessage";

/**
 * Repository for handling operations related to enterprise data.
 */
export const enterpriseDataRepo = {
  getAllEnterpriseData,
  // getEnterpriseById,
  // getEnterpriseObjectById,
  getEnterpriseObject,
  getEnterpriseClass,
};

/**
 * Retrieves classes of a specific enterprise from the database.
 *
 * @param {any} params - The parameters containing the enterprise ID for fetching classes.
 * @returns {Promise<object>} A promise that resolves with the result of the database query.
 */
async function getEnterpriseClass(params: any) {
  try {
    // Log information about the function execution
    loggerInfo.info("Get Classes Of One Enterprise");

    // Fetch classes of the specified enterprise from the database using Sequelize findAll method
    const data = await db.AddClasses.findAll({
      where: {
        enterpriseId: params.enterpriseId,
      },
      attributes: ["id", "className", "createdAt"],
      include: [
        {
          model: db.classTag,
          attributes: ["id", "tagName", "createdAt", "dataTypeId"],
          required: true, // Makes it an INNER JOIN
          include: [
            {
              model: db.tagDataType,
              attributes: ["name"],
              required: true, // Makes it an INNER JOIN
              where: {
                id: Sequelize.col("dataTypeId"),
              },
            },
          ],
        },
      ],
    });

    // Return a successful response with the fetched class data
    return sendResponseData(true, message.success.classData, data);
  } catch (error: any) {
    // Log error information in case of an exception
    loggerError.error("Error in Enterprise Class Repo");

    // Return an error response in case of an exception during data fetching
    return sendResponseData(false, message.error.error, error);
  }
}

/**
 * Retrieves objects, class tags, and object values data for a specific enterprise from the database.
 *
 * @param {any} params - The parameters containing the enterprise ID for fetching data.
 * @returns {Promise<Array<object>>} A promise that resolves with an array of retrieved data.
 */
async function getEnterpriseObject(params: any) {
  try {
    // Log information about the function execution
    loggerInfo.info("Fetching Objects, ClassTags, and ObjectValues data");

    // Fetch objects, class tags, and object values data from the database using Sequelize findAll method
    const result = await db.object.findAll({
      include: [
        {
          model: db.AddClasses,
          where: { enterpriseId: params.enterpriseId }, // This will filter by classId
          attributes: ["id", "superParentId", "parentId"],
          include: [
            {
              model: db.classTag,
              attributes: ["tagName"],
            },
          ],
        },
        {
          model: db.AddValues,
          attributes: ["values", "createdAt"],
        },
      ],
    });

    // Map and format the result array to include a serial number and convert Sequelize instance to plain JS object
    return result.map((item: any, index: any) => ({
      S_No: index + 1,
      ...item.get(), // Convert Sequelize instance to plain JS object
    }));

  } catch (error: any) {
    // Log error information in case of an exception
    loggerError.error("Error in Enterprise Data Repo");

    // Return an error response in case of an exception during data fetching
    return sendResponseData(
      false,
      message.error.errorGettingEnterpriseDataById,
      []
    );
  }
}

/**
 * Retrieves enterprise class data for a specific enterprise user from the database.
 *
 * @param {any} params - The parameters containing the enterprise user ID for fetching data.
 * @returns {Promise<object>} A promise that resolves with the result of the database query.
 */
async function getAllEnterpriseData(params: any) {
  try {
    // Log information about the function execution
    loggerInfo.info("Get Enterprise Data Repo");

    // Fetch enterprise class data for the specified enterprise user from the database using Sequelize findAll method
    const result = await db.AddClasses.findAll({
      where: {
        enterpriseUserId: params.enterpriseUserId,
        // parentId: null,
      },
      attributes: ["id", "className", "createdAt"],
      include: [
        {
          model: db.classTag,
          attributes: ["id", "tagName", "createdAt", "dataTypeId"],
          required: true, // Makes it an INNER JOIN
          include: [
            {
              model: db.tagDataType,
              attributes: ["name"],
              required: true, // Makes it an INNER JOIN
              where: {
                id: Sequelize.col("dataTypeId"),
              },
            },
          ],
        },
      ],
    });

    // If no data is found, return an error response
    if (!result.length) {
      return sendResponseData(false, "No Enterprise Class Data Found", []);
    }

    // Map and format the result array to include a serial number and convert Sequelize instance to plain JS object
    const response = result.map((item: any, index: any) => ({
      serialNumber: index + 1,
      ...item.get(), // Convert Sequelize instance to plain JS object
    }));

    // Return a successful response with the fetched enterprise class data
    return sendResponseData(true, message.success.enterpriseClassDataFetched, response);

  } catch (error) {
    // Log the error if fetching classes and tags fails.
    loggerError.error("Error fetching class", error);

    // Return an error response in case of an exception during data fetching
    return sendResponseData(false, message.error.errorFetchingClassData, error);
  }
}

// async function getEnterpriseById(params: any) {
//   try {
//     loggerInfo.info("Get Enterprise Data Repo by Id");

//     if (!params.id) {
//       throw "NO ID exist";
//     }
//     const result = await db.AddClasses.findAll({
//       where: {
//         id: params.id,
//         parentId: null,
//       },
//       attributes: ["id", "className", "createdAt"],
//       include: [
//         {
//           model: db.classTag,
//           attributes: ["id", "tagName", "createdAt", "dataTypeId"],
//           required: true, // Makes it an INNER JOIN
//           include: [
//             {
//               model: db.tagDataType,
//               attributes: ["name"],
//               required: true, // Makes it an INNER JOIN
//               where: {
//                 id: Sequelize.col("dataTypeId"),
//               },
//             },
//           ],
//         },
//       ],
//     });
//     if (result.length === 0) {
//       return sendResponseData(false, "Error in fetching data", []);
//     }

//     const response = result.map((item: any, index: any) => ({
//       serialNumber: index + 1,
//       ...item.get(), // Convert Sequelize instance to plain JS object
//     }));
//     return sendResponseData(true, "Data Fetched Successfully", response);
//   } catch (error: any) {
//     loggerError.error("Error in Enterprise Data Repo");
//     return sendResponseData(
//       false,
//       "Error in getting Enterprise Data by Id",
//       []
//     );
//   }
// }

// async function getEnterpriseObject(id: any) {
//   try {
//     loggerInfo.info("Fetching Objects, ClassTags, and ObjectValues data");

//     // Validate that an ID is provided.
//     if (!id) {
//       loggerError.error("NO Id is provided");
//       return sendResponseData(false, "No Id is provided", Error);
//     }
//     const result = await db.object.findAll({
//       include: [
//         {
//           model: db.AddClasses,
//           where: { id }, // This will filter by classId
//           attributes: ["id", "superParentId", "parentId"],
//           include: [
//             {
//               model: db.classTag,
//               attributes: ["tagName"],
//             },
//           ],
//         },
//         {
//           model: db.AddValues,
//           attributes: ["values", "createdAt"],
//         },
//       ],
//     });
//     return result.map((item: any, index: any) => ({
//       S_No: index + 1,
//       ...item.get(), // Convert Sequelize instance to plain JS object
//     }));
//   } catch (error: any) {
//     loggerError.error("Error in Enterprise Data Repo");
//     return sendResponseData(
//       false,
//       "Error in getting Enterprise Data by Id",
//       []
//     );
//   }
// }

// async function getEnterpriseObjectById(params: any) {
//   // Log the initiation of fetching Objects, ClassTags, and ObjectValues data By ObjectId.
//   loggerInfo.info("Fetching Objects, ClassTags, and ObjectValues data");
//   // Validate that an ID is provided.
//   if (!params.query.objectId && !params.query.classId) {
//     loggerError.error("No Id is provided");
//     return sendResponseData(false, "No Id is provided", Error);
//   }

//   try {
//     const result = await db.object.findAll({
//       where: { id: params.query.objectId }, // This will filter by classId
//       include: [
//         {
//           model: db.AddClasses,
//           where: { id: params.query.classId },
//           attributes: ["id", "superParentId", "parentId"],
//           include: [
//             {
//               model: db.classTag,
//               attributes: ["tagName"],
//             },
//           ],
//         },
//         {
//           model: db.AddValues,
//           attributes: ["values", "createdAt"],
//         },
//       ],
//     });
//     return result.map((item: any, index: any) => ({
//       S_No: index + 1,
//       ...item.get(), // Convert Sequelize instance to plain JS object
//     }));
//   } catch (error) {
//     // Log the error if there's an issue with fetching data.
//     loggerError.error("Error fetching Objects", error);
//     // Return a response indicating the failure of the operation.
//     return sendResponseData(false, "Error in fetching object", error);
//   }
// }
