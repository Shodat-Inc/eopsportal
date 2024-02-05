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
        // Log information about the creation of the POST API for a ticket
        loggerInfo.info("Creating POST API of ticket");

        // Check if a ticket already exists for the provided raisedAlertId
        // const existingTicket = await db.Ticket.findOne({
        //     where: { ticketRaisedAlertLinkId: params.raisedAlertId }
        // });

        // if (existingTicket) {
        //     // Return response if a ticket already exists
        //     return sendResponseData(false, "Ticket already exists for the provided raisedAlertId", {});
        // }

        // Extract raisedAlertId from params and store the remaining properties in ticketParams
        const { raisedAlertId, ...ticketParams } = params;

        // Create a new Ticket instance with the extracted ticketParams
        const newTicket = new db.Ticket(ticketParams);

        // Save the new ticket in the database
        const savedTicket = await newTicket.save();

        // Create or update the LinkTable with the relationship between the ticket and raisedAlertId
        const linkData = {
            raisedAlertId: params.raisedAlertId,
            ticketId: savedTicket.dataValues.id
        };
        const savedLink = await db.Link.create(linkData);

        // Update ticketRaisedAlertLinkId in the Ticket table with the ID of the created Link
        await db.Ticket.update(
            { ticketRaisedAlertLinkId: savedLink.id },
            { where: { id: savedTicket.dataValues.id } }
        );

        // Update ticketRaisedAlertLinkId in the RaisedAlert table with the ID of the created Link
        await db.RaisedAlert.update(
            { ticketRaisedAlertLinkId: savedLink.id },
            { where: { id: params.raisedAlertId } }
        );

        // Return success response along with the created Ticket and Link
        return sendResponseData(true, "Ticket and Link created Successfully", {
            ticket: savedTicket,
            link: savedLink
        });

    } catch (error) {
        // Log an error if there's an issue during the ticket creation process
        loggerError.error("Error in Ticket Repo while creating ticket", error);

        // Return an error response
        return sendResponseData(false, "Error in Ticket Repo while creating ticket", error);
    }
}

async function getTicketByAlertId(params: any) {
    try {
        // Query the database to find a Link with the provided raisedAlertId
        const data = await db.Link.findOne({
            where: { raisedAlertId: params.raisedAlertId },
            attributes: [], // Exclude unnecessary attributes from the result
            include: [{
                model: db.Ticket,
                attributes: ['id', 'subject', 'status', 'updatedAt', 'priority', 'assignedTo'],
                include: [
                    {
                        model: db.Comment,
                        attributes: ['comment'],
                    },
                    {
                        model: db.Attachment,
                        attributes: ['fileURL'],
                    }
                ]
            }]
        });

        // Check if the data exists
        if (!data) {
            // Return response if no data is found
            return sendResponseData(false, "Data Doesn't Exist", data);
        }

        // Return success response with the fetched data
        return sendResponseData(true, "Data fetched Successfully", data);
    } catch (error) {
        // Log an error if there's an issue during the retrieval of tickets
        loggerError.error("Error in getting tickets", error);

        // Return an error response
        return sendResponseData(false, "Error in getting tickets", error);
    }
}

async function update(params: any, reqData: any) {
    try {
        // Log information about the ticket update
        loggerInfo.info("Updating ticket");

        // Find the Link associated with the provided raisedAlertId
        const link = await db.Link.findOne({
            where: { raisedAlertId: reqData.raisedAlertId }
        });

        // Check if the Link exists
        if (!link) {
            return sendResponseData(false, "Link Doesn't Exist for the provided raisedAlertId", null);
        }

        // Find the Ticket associated with the Link
        const data = await db.Ticket.findOne({
            where: { ticketRaisedAlertLinkId: link.dataValues.id },
        });

        // Check if the Ticket data exists
        if (!data) {
            return sendResponseData(false, "Data doesn't exist", []);
        }

        // Set the 'updatedAt' property to the current date and time
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

        // Iterate over the properties and update the Ticket data accordingly
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

        // Save the updated Ticket data
        const response = await data.save();

        // Return success response with the updated data
        return sendResponseData(true, "Data Updated Successfully", response);

    } catch (error) {
        // Log an error if there's an issue during the data update
        loggerError.error("Error in updating data", error);

        // Return an error response
        return sendResponseData(false, "Error in updating data", error);
    }
}

async function _delete(params: any) {
    try {
        // Find the Link associated with the provided raisedAlertId
        const link = await db.Link.findOne({
            where: { raisedAlertId: params.raisedAlertId }
        });

        // Check if the Link exists
        if (!link) {
            return sendResponseData(false, "Link Doesn't Exist for the provided raisedAlertId", null);
        }

        // Find the Ticket associated with the Link
        const ticket = await db.Ticket.findOne({
            where: { ticketRaisedAlertLinkId: link.id },
        });

        // Check if the Ticket exists
        if (!ticket) {
            return sendResponseData(false, "Ticket does not exist for raisedAlert id", {});
        }

        // Check if there are related records in the RaisedAlerts table
        const relatedRaisedAlerts = await db.RaisedAlert.findAll({
            where: { ticketRaisedAlertLinkId: link.id }
        });

        // Update the ticketRaisedAlertLinkId to null for related records in the RaisedAlerts table
        if (relatedRaisedAlerts.length > 0) {
            await db.RaisedAlert.update(
                { ticketRaisedAlertLinkId: null },
                { where: { ticketRaisedAlertLinkId: link.id } }
            );
        }

        // Safely delete the record from the TicketRaisedAlertLinks table
        await db.Link.destroy({
            where: { ticketId: ticket.id }
        });

        // Finally, delete the Ticket record
        const deleteTicket = await ticket.destroy();

        // Return success response with the deleted Ticket data
        return sendResponseData(true, "Ticket deleted Successfully", deleteTicket);
    } catch (error) {
        // Log an error if there's an issue during the deletion of the Ticket
        loggerError.error("Error in deleting Ticket", error);

        // Return an error response
        return sendResponseData(false, "Error in deleting Ticket", error);
    }
}
