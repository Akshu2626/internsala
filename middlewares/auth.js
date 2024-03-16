const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const { catchAsyncErrors } = require("./catchAsyncError");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer')) {
        return next(new ErrorHandler("Please provide a valid token in Authorization header", 401));
    }

    const token = authorizationHeader.split(' ')[1];

    try {
        // JWT verify ke liye secret key ki zarurat hai, isliye aapko JWT_SECRET ko use karna chahiye
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        req.id = id;
        next();
    } catch (error) {
        // JWT verify fail hone par, unauthorized error throw karo
        return next(new ErrorHandler("Invalid or expired token", 401));
    }
});
