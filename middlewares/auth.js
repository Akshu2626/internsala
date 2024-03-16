// const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const { catchAsyncErrors } = require("./catchAsyncError");

const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const authorizationHeader = req.headers['authorization'];

    if (authorizationHeader) {
        // Token ko split karo
        const tokenParts = authorizationHeader.split(' ');

        if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
            const token = tokenParts[1];

            // Token verify karo
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: 'Unauthorized' });
                } else {
                    // Token verified, decoded information ko request object me add karo
                    req.user = decoded;
                    next();
                }
            });
        } else {
            // Invalid token format
            return res.status(401).json({ message: 'Unauthorized' });
        }
    } else {
        // Authorization header missing
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = verifyToken;

// exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
//     const { token } = req.headers['authorization'];
//     if (!token) {
//         return next(new ErrorHandler("please login to access the resources", 401))
//     }
//     const { id } = jwt.verify(token, req.id, process.env.JWT_SECRET);

//     req.id = id;


//     next()
// })