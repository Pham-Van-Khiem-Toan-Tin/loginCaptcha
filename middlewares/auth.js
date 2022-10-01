const jwt = require('jsonwebtoken');
const ErrorHandle = require('../utils/errorHandle');
require('dotenv').config();

module.exports.isAuthenticatedUser = async (req, res, next) => {
    const {token} = req.cookies;
    if(!token) {
        return next(new ErrorHandle("Please login to access this resource"));
    }
    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    
}