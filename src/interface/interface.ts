// validateMiddleware.js
import { createClassValidation,
  createObjectValidation,
  createUserValidation,
  deleteUserValidation,
  forgetPasswordValidation, 
  generateOTPValidation,
  updateClassValidation,
  updateObjectValidation,
  updatePasswordValidation,
  updateUserValidation, 
  verifyOTPValidation 
} from "../../validateSchema";

export function validateUser(req: any, res: any, next: any) {
  const reqData = req.body;
  createUserValidation(reqData);
  next();
}

export function updateUser(req: any, res: any, next: any) {
  const reqData = req.body;
  updateUserValidation(reqData);
  next();
}

export function generateOTP(req: any, res: any, next: any) {
  const reqData = req.body;
  generateOTPValidation(reqData);
  next();
}


export function verifyOTP(req: any, res: any, next: any) {
  const reqData = req.body;
  verifyOTPValidation(reqData);
  next();
}

export function forgetPassword(req: any, res: any, next: any) {
  const reqData = req.body;
  forgetPasswordValidation(reqData);
  next();
}

export function updatePassword(req: any, res: any, next: any) {
  const reqData = req.body;
  updatePasswordValidation(reqData);
  next();
}

export function deleteUser(req: any, res: any, next: any) {
  const reqData = req.body;
  deleteUserValidation(reqData);
  next();
}

export function createClass(req: any, res: any, next: any) {
  const reqData = req.body;
  createClassValidation(reqData);
  next();
}

export function createObject(req: any, res: any, next: any) {
  const reqData = req.body;
  createObjectValidation(reqData);
  next();
}

export function updateClass(req: any, res: any, next: any) {
  const reqData = req.body;
  updateClassValidation(reqData);
  next();
}

export function updateObject(req: any, res: any, next: any) {
  const reqData = req.body;
  updateObjectValidation(reqData);
  next();
}