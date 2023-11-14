import Joi from 'joi';

export const signInValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    return schema.validate(data);
};

export const createUserValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        password: Joi.string().min(6).required(),
        companyName: Joi.string().required(),
        countryCodeId: Joi.number().required(),
        phoneNumber: Joi.number().required(),
        roleId: Joi.number().required(),
        parentId: Joi.number().required(),
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
        email: Joi.string().email().required(),
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