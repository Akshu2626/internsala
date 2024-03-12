const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const { catchAsyncErrors } = require("./catchAsyncError");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("please login to access the resources", 401))
    }
    req.id = id;
    const { id } = jwt.verify(token, req.id, process.env.JWT_SECRET);


    next()
})