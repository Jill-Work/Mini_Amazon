// null check function
exports.nullCheck = (data) => {
    if (data == null) {
        return null;
    } else {
        return data.dataValues;
    }
};