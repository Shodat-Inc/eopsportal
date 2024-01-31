import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import message from "@/util/responseMessage";

export const ticketRepo = {
    create,
    getTicketByAlertId,
    update,
    delete: _delete
};

async function create(params: any) {
    try {
        loggerInfo.info("Creating POST API of ticket")
        const data = await db.Ticket.findOne({
            where: { raisedAlertId: params.raisedAlertId }
        })
        if (data) {
            return sendResponseData(false, "Data already exists", {})
        }
        const newTicket = new db.Ticket(params)
        const save = await newTicket.save()
        return sendResponseData(true, "Ticket created Successfully", save)

    } catch (error) {
        loggerError.error("Error in Ticket Repo while creating ticket", error)
        return sendResponseData(false, "Error in Ticket Repo while creating ticket", error)
    }
}

async function getTicketByAlertId(params: any) {
    try {
        const data = await db.Ticket.findAll({
            where: { raisedAlertId: params.raisedAlertId },
            attributes: ['id', 'subject', 'status', 'updatedAt', 'priority', 'assignedTo']
        })
        if (!data) {
            return sendResponseData(false, "Data Doesn't Exist", data)
        }
        return sendResponseData(true, "Data fetched Successfully", data)
    } catch (error) {
        loggerError.error("Error in getting tickets")
        return sendResponseData(false, "Error in getting tickets", error)
    }
}

async function update(params: any, reqData: any) {
    try {
        loggerInfo.info("Updating ticket")
        const data = await db.Ticket.findOne({
            where: { raisedAlertId: reqData.raisedAlertId },
        });
        if (!data) {
            return sendResponseData(false, "Data doesn't exist", []);
        }

        params["updatedAt"] = new Date();

        // Define the properties to update
        const propertiesToUpdate = [
            "id",
            "subject",
            "status",
            "priority",
            "assignedTo",
            "assignedBy",
            "ticketPoints",
            "isFlagged",
            "blockedBy",
            "linkedTicket",
            "completionDate",
            "comments",
            "raisedAlertId",
        ];

        propertiesToUpdate.forEach((property) => {
            if (params[property] !== undefined) {
                // Check if the property is an array and update accordingly
                if (
                    property === "linkedTicket" &&
                    Array.isArray(params[property])
                ) {
                    data.setDataValue(property, params[property]);
                } else {
                    data[property] = params[property];
                }
            }
        });

        const response = await data.save();

        return sendResponseData(true, "Data Updated Successfully", response);


    } catch (error) {
        loggerError.error("Error in updating data", error)
        return sendResponseData(false, "Error in updating data", error)
    }
}

async function _delete(params: any) {
    try {
        const ticket = await db.Ticket.findOne({
            where: { raisedAlertId: params.raisedAlertId },
        });
        if (!ticket) {
            return sendResponseData(false, "Ticket does not exist for raisedAlert id", {})
        }
        const deleteTicket = await ticket.destroy();
        return sendResponseData(true, "Ticket deleted Successfully", deleteTicket);
    } catch (error) {
        loggerError.error("Error in deleting Ticket", error)
        return sendResponseData(false, "Error in deleting Ticket", error)
    }
}