const Joi = require('joi');
const fs = require('fs');

 module.exports.listingSchema = Joi.object({
    title : Joi.string().required().min(3).max(30),
    description:Joi.string().required().min(10).max(200),
    location:Joi.string().required(),
    country:Joi.string().required(),
    price:Joi.number().required().min(0),
})