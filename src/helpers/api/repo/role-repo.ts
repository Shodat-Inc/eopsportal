import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import message from "@/util/responseMessage";

// Repository for role-related operations.
export const roleRepo = {
  create,
  getAllRoles,
  update,
  delete: _delete,
};

/**
 * Asynchronously creates a new role entry in the database.
 *
 * @param {Object} params - The parameters containing information to save the role.
 * @returns {Object} - Response object indicating the success or failure of the operation.
 */
async function create(params: any) {
  // Log the initiation of role creation.
  loggerInfo.info("Role repo");

  try {
    const check = await db.Role.findOne({
      where: { name: params.name }
    })
    if (check) {
      return sendResponseData(false, message.error.roleExist, {});
    }
    // Create a new Role instance using the provided parameters.
    const role = new db.Role(params);

    // Save the new role to the database.
    const data = await role.save();

    // Return a successful response indicating the role was added.
    return sendResponseData(true, message.success.roleAdded, data);
  } catch (error) {
    // Log the error if there's an issue with the role creation.
    loggerError.error("Cant Save Role", error);
    // Return a response indicating the failure of the operation.
    return sendResponseData(false, message.error.error, error);
  }
}

async function getAllRoles() {
  loggerInfo.info("GET all roles");

  return await db.Role.findAll({
    attributes: ["id", "name", "isActive", "routeId"]
  });
}

async function update(params: any) {
  try {
    const roles = await db.Role.findOne({
      where: { id: params.id, }
    })
    if (!roles) {
      return sendResponseData(false, "No Role Exits", [])
    }
    roles.name = params.name
    roles.routeId = params.routeId
    roles.isActive = params.isActive
    const response = await roles.save()
    return sendResponseData(true, message.success.roleUpdated, response)
  } catch (error: any) {
    return sendResponseData(false, message.error.errorUpdation, [])
  }
}

async function _delete(params: any) {
  try {
    const role = await db.Role.findOne({
      where: { id: params.id },
    });
    if (!role) {
      return sendResponseData(false, "Role doesn't Exits", [])
    }
    await role.destroy();
    return sendResponseData(
      true,
      message.success.deleteRole,
      role.className
    );
  } catch (error: any) {
    return sendResponseData(false, message.error.errorDeleteRole, error);
  }
}