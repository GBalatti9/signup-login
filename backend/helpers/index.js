const { getDataForView } = require("./getDataForView");
const { hashPassword, comparePassword } = require("./getBcryptjs");
const { newId } = require('./getUUID');


module.exports = {
    getDataForView,
    hashPassword, 
    comparePassword,
    newId,
}