// validateMiddleware.js
import { createUserValidation } from "../../validateSchema";

export function validateUser(req: any, res: any, next: any) {
  const reqData = req.body;
  createUserValidation(reqData);
  next();
}
