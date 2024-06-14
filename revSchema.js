const Joi = require('joi');
const fs = require('fs');

module.exports.reviewSchema= Joi.object({
    review:{
    rating:Joi.number().min(1).max(5),
    comment:Joi.string().required().min(10),
    }
})