// null check function
exports.nullCheckWithDataValues = (data) => {
    if (data == null) {
        return null;
    } else {
        return data.dataValues;
    }
};

exports.nullCheckWithOutDataValues = (data) => {
    if (data == null) {
        return null;
    } else {
        return data;
    }
}

