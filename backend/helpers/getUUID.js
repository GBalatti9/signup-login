const { v4: uuidv4 } = require('uuid');

const newId = () => {
    return uuidv4();
}

module.exports = {
    newId,
}
