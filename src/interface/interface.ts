// validateMiddleware.js
import { createClassValidation,
  createObjectValidation,
  createRoleValidation,
  createUserValidation,
  contactSales,
  deleteRoleValidation,
  deleteUserValidation,
  forgetPasswordValidation, 
  generateOTPValidation,
  inviteValidation,
  updateClassValidation,
  updateObjectValidation,
  updatePasswordValidation,
  updateRoleValidation,
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

export function createRole(req: any, res: any, next: any) {
  const reqData = req.body;
  createRoleValidation(reqData);
  next();
}

export function updateRole(req: any, res: any, next: any) {
  const reqData = req.body;
  updateRoleValidation(reqData);
  next();
}

export function deleteRole(req: any, res: any, next: any) {
  const reqData = req.body;
  deleteRoleValidation(reqData);
  next();
}

export function contactSalesTeam(req: any, res: any, next: any) {
  const reqData = req.body;
  contactSales(reqData);
  next();
}

export function inviteEnterpUser(req: any, res: any, next: any){
  const reqData = req.body;
  inviteValidation(reqData);
  next();  
}