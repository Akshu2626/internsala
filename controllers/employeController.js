const { catchAsyncErrors } = require("../middlewares/catchAsyncError");
const Employe = require("../models/employeModel");
const Internship = require("../models/internshipModel");
const Job = require("../models/jobModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");
const { sendmail } = require("../utils/nodemailer");
const path = require("path")
const imagekit = require("../utils/imagekit").initImageKit();



exports.homepage = catchAsyncErrors(async (req, res, next) => {
    res.json({ message: " secure employe homepage" });
});


exports.currentEmploye = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.id).exec();
    res.json({ employe });
});

exports.employesignup = catchAsyncErrors(async (req, res, next) => {
    const employe = await new Employe(req.body).save();
    sendtoken(employe, 201, res)

});

exports.employesignin = catchAsyncErrors(async (req, res, next) => {
    //  res.json(req.body)

    const employe = await Employe.findOne({ email: req.body.email })
        .select("+password")
        .exec()

    if (!employe) return next(new ErrorHandler("user not found", 404));

    const isMatch = employe.comparepassword(req.body.password);
    if (!isMatch) return next(new ErrorHandler("wrong credientials", 500))

    sendtoken(employe, 200, res)


});

exports.employesignout = catchAsyncErrors(async (req, res, next) => {

    res.clearCookie("token");
    res.json({ message: "successfully signout" });

});


exports.employesendmail = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findOne({ email: req.body.email }).exec()

    if (!employe)
        return next(
            new ErrorHandler("user not found", 404)
        );


    const url = `http://localhost:5173/EmployeVerifyPassword/${employe._id}`;

    sendmail(req, res, next, url);

    employe.resetPasswordToken = "1";
    await employe.save();

    res.json({ employe, url });
});


exports.employeforgetlink = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.params.id).exec()

    if (!employe)
        return next(
            new ErrorHandler("user not found", 404)
        );

    if (employe.resetPasswordToken == "1") {
        employe.resetPasswordToken = "0"
        employe.password = req.body.password;
    }
    else {
        return next(
            new ErrorHandler("invalid reset password link try again", 500)
        );
    }
    await employe.save();


    res.status(200).json({
        message: "password has been changed successfully"
    })
});



exports.employeresetpassword = catchAsyncErrors(async (req, res, next) => {


    const employe = await Employe.findById(req.id).exec();

    employe.password = req.body.password;
    await employe.save();


    sendtoken(employe, 201, res);
});


exports.employeupdate = catchAsyncErrors(async (req, res, next) => {
    await Employe.findByIdAndUpdate(req.params.id, req.body).exec();
    res.status(200).json({
        success: true,
        message: "employe updated successfully!",

    })

});



exports.employeavatar = catchAsyncErrors(async (req, res, next) => {

    const employe = await Employe.findById(req.params.id).exec();

    const file = req.files.organizationlogo;

    const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(file.name)}`;

    if (employe.organizationlogo.fileId !== "") {
        await imagekit.deleteFile(employe.organizationlogo.fileId);
    };


    const { fileId, url } = await imagekit.upload({
        file: file.data,
        fileName: modifiedFileName,
    });


    employe.organizationlogo = { fileId, url };
    await employe.save();


    res.status(200).json({
        success: true,
        message: "profile uploaded!",

    });


});


// --------------------------internshipModel----------------------------------


exports.createinternship = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.id).exec();
    const internships = await new Internship(req.body).save();
    internships.employe = employe._id;

    employe.internships.push(internships._id)
    await internships.save();
    await employe.save();

    res.status(201).json({
        success: true,
        internships,
    });
});


//delete Internship

exports.deleteInternship = catchAsyncErrors(async (req, res, next) => {
    const { internships } = await Employe.findByIdAndDelete(req.id).populate("internships").exec();
    res.status(200).json({
        success: true,
        internships
    });
});





exports.readinternship = catchAsyncErrors(async (req, res, next) => {
    const { internships } = await Employe.findById(req.id).populate("internships").exec();
    res.status(200).json({
        success: true,
        internships
    });
});


exports.readsingleinternship = catchAsyncErrors(async (req, res, next) => {
    const internship = await Internship.findById(req.params.id).exec();


    res.status(200).json({
        success: true,
        internship,
    });
});

// --------------------------jobsModel----------------------------------


exports.createjob = catchAsyncErrors(async (req, res, next) => {
    const employe = await Employe.findById(req.id).exec();
    const jobs = await new Job(req.body).save();
    jobs.employe = employe._id;

    employe.jobs.push(jobs._id)
    await jobs.save();
    await employe.save();

    res.status(201).json({
        success: true,
        jobs,
    });
});


exports.readjob = catchAsyncErrors(async (req, res, next) => {
    const { jobs } = await Employe.findById(req.id).populate("jobs").exec();

    res.status(200).json({
        success: true,
        jobs
    });
});


exports.readsinglejob = catchAsyncErrors(async (req, res, next) => {
    const job = await Job.findById(req.params.id).exec();


    res.status(200).json({
        success: true,
        job,
    });
});


