import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";

export const contactSalesRepo = {
    create,
};

async function create(params: any) {
    loggerInfo.info("contact Sale Repo")
    try {
        const user = await db.ContactSales.findOne({
            where: { email: params.email }
        })
        if (user) {
            return sendResponseData(false, "Please wait, Sales Team will contact soon", [])
        }
        const saveData = new db.ContactSales(params)
        const response = await saveData.save()
        return sendResponseData(true, "Thanks For Contacting", response)

    } catch (error: any) {
        loggerError.error("Error in contact sale repo")
        return sendResponseData(false, "Error", [])
    }
}