const { getDataForView } = require("./getDataForView");
const { hashPassword, comparePassword } = require("./getBcryptjs");


module.exports = {
    getDataForView,
    hashPassword, 
    comparePassword,
}