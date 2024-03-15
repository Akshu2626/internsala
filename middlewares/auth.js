const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const { catchAsyncErrors } = require("./catchAsyncError");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.headers.Authorization;

    if (!token) {
        return next(new ErrorHandler("please login to access the resources", 401))
    }
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    req.id = id;

    // res.status(200).json({status:true,token:token})

    next()
})
