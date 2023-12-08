import { apiHandler } from "@/helpers/api";
import { ModelRepo } from "@/helpers/api/repo/model-repo";

// Default API handler for the GET method to handle retrieval of subclasses.
export default apiHandler({
    get: allhandler,
});

/**
 * Handler function to process GET requests for retrieving subclasses.
 *
 * @param {Object} req - The incoming request object which may contain filtering criteria.
 * @param {Object} res - The response object to send back the results.
 */
async function allhandler(req: any, res: any) {
    try {
        const reqData = req.query
        const getObject = await ModelRepo.getObjectBySerialId(reqData);
        res.status(200).json(getObject);
    } catch (error: any) {
        res.status(500).send({ message: error.message });
        return;
    }
}
