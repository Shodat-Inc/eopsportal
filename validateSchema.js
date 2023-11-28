import Joi from "joi";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const usernameRegex = /^([a-zA-Z0-9]|[-._](?![-._])){4,14}$/;

export const signInValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(passwordRegex)
      .min(6)
      .max(10)
      .required()
      .messages({
        "string.pattern.base":
          "Password should be between 6 to 10 characters long and must contain atleast one uppercase character, lowercase character and digit.",
        "string.empty": "Password cannot be empty",
        "any.required": "Password is required",
      }),
  });

  return schema.validate(data);
};

export const createUserValidation = (data) => {
  const schema = Joi.object({
    roleId: Joi.number(),
    username: Joi.string(),
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string()
      .regex(passwordRegex)
      .min(6)
      .max(10)
      .required()
      .messages({
        "string.pattern.base":
          "Password should be between 6 to 10 characters long and must contain atleast one uppercase character, lowercase character and digit.",
        "string.empty": "Password cannot be empty",
        "any.required": "Password is required",
      }),
    companyName: Joi.string().required(),
    countryCodeId: Joi.number().required(),
    phoneNumber: Joi.number().required(),
    isPrimary: Joi.boolean().required(),
    primary: Joi.boolean().required(),
  });

  return schema.validate(data);
};

export const updateUserValidation = (data) => {
  const schema = Joi.object({
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    pincode: Joi.number().required(),
    countryId: Joi.number().required(),
  });

  return schema.validate(data);
};

export const generateOTPValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  return schema.validate(data);
};

export const verifyOTPValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.number().required(),
  });

  return schema.validate(data);
};

export const forgetPasswordValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  return schema.validate(data);
};

export const updatePasswordValidation = (data) => {
  const schema = Joi.object({
    password: Joi.string()
      .regex(passwordRegex)
      .min(6)
      .max(10)
      .required()
      .messages({
        "string.pattern.base":
          "Password should be between 6 to 10 characters long and must contain atleast one uppercase character, lowercase character and digit.",
        "string.empty": "Password cannot be empty",
        "any.required": "Password is required",
      }),
  });

  return schema.validate(data);
};

export const deleteUserValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    message: Joi.string().required(),
    reasonId: Joi.number().required(),
    deleteAction: Joi.boolean().required(),
  });

  return schema.validate(data);
};

export const createClassValidation = (data) => {
  const schema = Joi.object({
    userId: Joi.number(),
    enterpriseId: Joi.number(),
    enterpriseUserId: Joi.number(),
    superParentId: Joi.number(),
    parentId: Joi.number(),
    parentJoinKey: Joi.array(),
    className: Joi.string().required(),
    tags: Joi.array().items({
      tagName: Joi.string().required(),
      dataTypeId: Joi.number().required(),
    }),
  });

  return schema.validate(data);
};

export const createObjectValidation = (data) => {
  const schema = Joi.object({
    classId: Joi.number().required(),
    values: Joi.array().items({
      classTagId: Joi.number().required(),
      value: Joi.string().required(),
    }),
  });

  return schema.validate(data);
};

export const updateClassValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    className: Joi.string().required(),
    deleteTagId: Joi.array().items(Joi.number()),
    addTag: Joi.array().items({
      tagName: Joi.string().required(),
      dataTypeId: Joi.number().required(),
    }),
  });

  return schema.validate(data);
};

export const updateObjectValidation = (data) => {
  const schema = Joi.object({
    objectId: Joi.number().required(),
    deleteValueId: Joi.array().items(Joi.number()),
    updatedValues: Joi.array().items({
      classTagId: Joi.number().required(),
      values: Joi.string().required(),
    }),
  });

  return schema.validate(data);
};

export const createRoleValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    isActive: Joi.boolean().required(),
    routeId: Joi.array().items(Joi.number()),
  });

  return schema.validate(data);
};

export const updateRoleValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string(),
    routeId: Joi.array().items(Joi.number()),
    isActive: Joi.boolean(),
  });

  return schema.validate(data);
};

export const deleteRoleValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  return schema.validate(data);
};

export const createEnterpriseUserValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().regex(usernameRegex).min(4).max(10).messages({
      "string.pattern.base":
        "Username should be atleast 4 and maximum 10 characters long.",
      "string.empty": "Username cannot be empty",
    }),
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string()
      .regex(passwordRegex)
      .min(6)
      .max(10)
      .required()
      .messages({
        "string.pattern.base":
          "Password should be between 6 to 10 characters long and must contain atleast one uppercase character, lowercase character and digit.",
        "string.empty": "Password cannot be empty",
        "any.required": "Password is required",
      }),
    enterpriseId: Joi.number(),
    roleId: Joi.number(),
    status: Joi.number()
  });

  return schema.validate(data);
};

export const updateEnterpriseUserValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    username: Joi.string(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    password: Joi.string(),
    enterpriseId: Joi.number(),
    roleId: Joi.number(),
  });
  return schema.validate(data);
};

export const deleteEnterpriseUserValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });
  return schema.validate(data);
};

export const updateEnterpriseValidation = (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    enterpriseName: Joi.string(),
    enterpriseIndustry: Joi.string(),
    founderYear: Joi.number(),
    website: Joi.string(),
    description: Joi.string(),
    employeeCount: Joi.number(),
    superAdminName: Joi.string(),
    status: Joi.number()
  });
  return schema.validate(data);
};

