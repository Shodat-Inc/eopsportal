import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import message from "@/util/responseMessage";

export const ticketRepo = {
    create,
};

async function create(params: any) {
    try {
        loggerInfo.info("Creating POST API of ticket")
        const data = new db.Ticket(params)
        const save = await data.save()
        return sendResponseData(true, "Ticket created Successfully", save)

    } catch (error) {
        loggerError.error("Error in Ticket Repo while creating ticket", error)
        return sendResponseData(false, "Error in Ticket Repo while creating ticket", error)
    }
}