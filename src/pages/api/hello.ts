import type { NextApiRequest, NextApiResponse } from 'next'
import { loggerInfo } from "@/logger";

type Data = {
  name: string
}
/**
 * @swagger
 * /api/hello:
 *   get:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: hello world
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  loggerInfo.info(`GET /api/getUsers ${req}`);

  res.status(200).json({ name: 'John Doe' })
}
