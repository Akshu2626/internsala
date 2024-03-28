const { catchAsyncErrors } = require("../middlewares/catchAsyncError");
const Student = require("../models/studentModel");
const Employe=require('../models/employeModel')
const Internship = require("../models/internshipModel");
const Job = require("../models/jobModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");
const { sendmail } = require("../utils/nodemailer");
const path = require("path")
const imagekit = require("../utils/imagekit").initImageKit();
const jwt = require('jsonwebtoken');



exports.homepage = catchAsyncErrors(async (req, res, next) => {
    res.json({ message: " secure homepage" });
});


exports.currentUser = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    res.json({ student });
});

exports.studentsignup = catchAsyncErrors(async (req, res, next) => {
    const student = await new Student(req.body).save();
    sendtoken(student, 201, res)

});

exports.studentsignin = catchAsyncErrors(async (req, res, next) => {
    //  res.json(req.body)

    const student = await Student.findOne({ email: req.body.email })
        .select("+password")
        .exec()

    if (!student) return next(new ErrorHandler("user not found", 404));

    const isMatch = student.comparepassword(req.body.password);
    if (!isMatch) return next(new ErrorHandler("wrong credientials", 500))

    sendtoken(student, 200, res)


});


exports.studentsignout = catchAsyncErrors(async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]; // Token ko extract karein

    // JWT token ko verify karein
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            // Agar token verify nahi ho paata hai, unauthorized error bhejein
            return res.status(401).json({ message: 'Unauthorized' });
        } else {
            // Token verify hota hai, ab expiration time ko kam karein
            const expirationTime = 0; // 0 kar dena token ko immediately expire kar dega
            const newToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: expirationTime });
            // Expire hone wala token ko client ko bhejein
            res.setHeader('Authorization', 'Bearer ' + newToken);
            res.json({ message: "Successfully signout" });
        }
    });
});


exports.studentsendmail = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findOne({ email: req.body.email }).exec()

    if (!student)
        return next(
            new ErrorHandler("user not found", 404)
        );


    const url = `http://localhost:5173/VerifyPassword/${student._id}`;

    sendmail(req, res, next, url);

    student.resetPasswordToken = "1";
    await student.save();

    res.json({ student, url });
});


exports.studentforgetlink = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.params.id).exec()

    if (!student)
        return next(
            new ErrorHandler("user not found", 404)
        );

    if (student.resetPasswordToken == "1") {
        student.resetPasswordToken = "0"
        student.password = req.body.password;
    }
    else {
        return next(
            new ErrorHandler("invalid reset password link try again", 500)
        );
    }
    await student.save();


    res.status(200).json({
        message: "password has been changed successfully"
    })
});



exports.studentresetpassword = catchAsyncErrors(async (req, res, next) => {


    const student = await Student.findById(req.id).exec();

    student.password = req.body.password;
    await student.save();


    sendtoken(student, 201, res);
});


exports.studentupdate = catchAsyncErrors(async (req, res, next) => {
    await Student.findByIdAndUpdate(req.params.id, req.body).exec();
    res.status(200).json({
        success: true,
        message: "student updated successfully!",

    })

});



exports.studentavatar = catchAsyncErrors(async (req, res, next) => {

    const student = await Student.findById(req.params.id).exec();

    const file = req.files.avatar;

    const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(file.name)}`;

    if (student.avatar.fileId !== "") {
        await imagekit.deleteFile(student.avatar.fileId);
    };


    const { fileId, url } = await imagekit.upload({
        file: file.data,
        fileName: modifiedFileName,
    });


    student.avatar = { fileId, url };
    await student.save();


    res.status(200).json({
        success: true,
        message: "profile uploaded!",

    });


});





// ------------------apply internship-------------------


exports.applyinternship = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const internship = await Internship.findById(req.params.internshipid).exec();

    student.internships.push(internship._id);
    internship.students.push(student._id);

    await student.save();
    await internship.save();

    res.json({ student, internship });
});


// ------------------apply job-------------------


exports.applyjob = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const job = await Job.findById(req.params.jobid).exec();

    student.jobs.push(job._id);
    job.students.push(student._id);

    await student.save();
    await job.save();

    res.json({ student, job });
});






exports.studentreadjob=catchAsyncErrors(async (req,res,next)=>{

    try {
        // Fetching data from your schema
        const data = await Job.find(); // Assuming you are using Mongoose for MongoDB
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }


})


// studentreadinternship

exports.studentreadinternship=catchAsyncErrors(async (req,res,next)=>{
    try {
        // Fetching data from your schema
        const data = await Internship.find(); // Assuming you are using Mongoose for MongoDB
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }

})
