const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const { catchAsyncErrors } = require("./catchAsyncError");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
        return next(new ErrorHandler("Please provide a valid token", 401));
    }

    const token = authorizationHeader.split(" ")[1];


    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(new ErrorHandler('Invalid or expired token', 401));
        }
        // Token is valid, set user ID in request object
        req.userId = decoded.id;
        next();
    });



});
