const { catchAsyncErrors } = require("../middlewares/catchAsyncError");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { v4: uuidv4 } = require('uuid');



exports.resume = catchAsyncErrors(async (req, res, next) => {

    const { resume } = await Student.findById(req.id).exec();

    res.json({ message: " secure resume page", resume });
});


// ---------------Education----------------

exports.addeducation = catchAsyncErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    student.resume.education.push({ ...req.body, id: uuidv4() });
    await student.save();

    res.json({ message: "Education Added!" });
});


exports.editeducation = catchAsyncErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();

    const eduIndex = student.resume.education.findIndex((i) => i.id === req.params.eduid);


    student.resume.education[eduIndex] = {
        ...student.resume.education[eduIndex],
        ...req.body,
    };


    await student.save();

    res.json({ message: "Education uptaded!" });
});


exports.deleteeducation = catchAsyncErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();

    const filterededu = student.resume.education.filter((i) => i.id !== req.params.eduid);


    student.resume.education = filterededu;


    await student.save();

    res.json({ message: "Education deleted!" });
});

// -------------------------Jobs--------------------------

exports.addjob = catchAsyncErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    student.resume.jobs.push({ ...req.body, id: uuidv4() });
    await student.save();

    res.json({ message: "job Added!" });
});


exports.editjob = catchAsyncErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();

    const eduIndex = student.resume.jobs.findIndex((i) => i.id === req.params.jobid);


    student.resume.jobs[eduIndex] = {
        ...student.resume.jobs[eduIndex],
        ...req.body,
    };


    await student.save();

    res.json({ message: "job uptaded!" });
});


exports.deletejob = catchAsyncErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();

    const filterededu = student.resume.jobs.filter((i) => i.id !== req.params.jobid);


    student.resume.jobs = filterededu;


    await student.save();

    res.json({ message: "job deleted!" });
});

// -------------------------internships--------------------------


exports.addinternships = catchAsyncErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    student.resume.internships.push({ ...req.body, id: uuidv4() });
    await student.save();

    res.json({ message: "internship Added!" });
});


exports.editinternships = catchAsyncErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();

    const eduIndex = student.resume.internships.findIndex((i) => i.id === req.params.internid);


    student.resume.internships[eduIndex] = {
        ...student.resume.internships[eduIndex],
        ...req.body,
    };


    await student.save();

    res.json({ message: "intern uptaded!" });
});

exports.deleteinternships = catchAsyncErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();

    const filterededu = student.resume.internships.filter((i) => i.id !== req.params.internid);


    student.resume.internships = filterededu;


    await student.save();

    res.json({ message: "internship deleted!" });
});

// -------------------------responsibilities--------------------------


exports.addresponsibilities = catchAsyncErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    student.resume.responsibilities.push({ ...req.body, id: uuidv4() });
    await student.save();

    res.json({ message: "responsiblity Added!" });
});

exports.editresponsibilities = catchAsyncErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();

    const eduIndex = student.resume.responsibilities.findIndex((i) => i.id === req.params.respoid);


    student.resume.responsibilities[eduIndex] = {
        ...student.resume.responsibilities[eduIndex],
        ...req.body,
    };


    await student.save();

    res.json({ message: "responsiblity uptaded!" });
});

exports.deleteresponsibilities = catchAsyncErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();

    const filterededu = student.resume.responsibilities.filter((i) => i.id !== req.params.respoid);


    student.resume.responsibilities = filterededu;


    await student.save();

    res.json({ message: "responsiblity deleted!" });
});


// ---------------------courses----------------------


exports.addcourse = catchAsyncErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    student.resume.courses.push({ ...req.body, id: uuidv4() });
    await student.save();

    res.json({ message: "course successfully Added!" });
});

exports.editcourse = catchAsyncErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();

    const eduIndex = student.resume.courses.findIndex((i) => i.id === req.params.courseid);


    student.resume.courses[eduIndex] = {
        ...student.resume.courses[eduIndex],
        ...req.body,
    };


    await student.save();

    res.json({ message: "course successfully uptaded!" });
});

exports.deletecourse = catchAsyncErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();

    const filterededu = student.resume.courses.filter((i) => i.id !== req.params.courseid);


    student.resume.courses = filterededu;


    await student.save();

    res.json({ message: "course successfully deleted!" });
});


// -----------------------projects----------------



exports.addproject = catchAsyncErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    student.resume.projects.push({ ...req.body, id: uuidv4() });
    await student.save();

    res.json({ message: "projects successfully Added!" });
});

exports.editproject = catchAsyncErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();

    const eduIndex = student.resume.projects.findIndex((i) => i.id === req.params.projectid);


    student.resume.projects[eduIndex] = {
        ...student.resume.projects[eduIndex],
        ...req.body,
    };


    await student.save();

    res.json({ message: "project successfully uptaded!" });
});

exports.deleteproject = catchAsyncErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();

    const filterededu = student.resume.projects.filter((i) => i.id !== req.params.projectid);


    student.resume.projects = filterededu;


    await student.save();

    res.json({ message: "projects successfully deleted!" });
});

// ----------------- skills----------------------------



exports.addskill = catchAsyncErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    student.resume.skills.push({ ...req.body, id: uuidv4() });
    await student.save();

    res.json({ message: "skills successfully Added!" });
});

exports.editskill = catchAsyncErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();

    const eduIndex = student.resume.skills.findIndex((i) => i.id === req.params.skillid);


    student.resume.skills[eduIndex] = {
        ...student.resume.skills[eduIndex],
        ...req.body,
    };


    await student.save();

    res.json({ message: "project successfully uptaded!" });
});

exports.deleteskill = catchAsyncErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();

    const filterededu = student.resume.skills.filter((i) => i.id !== req.params.skillid);


    student.resume.skills = filterededu;


    await student.save();

    res.json({ message: "skills successfully deleted!" });
});

// ----------------- accomplishments--------------------


exports.addaccomplishments = catchAsyncErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();
    student.resume.accomplishments.push({ ...req.body, id: uuidv4() });
    await student.save();

    res.json({ message: "accomplishments successfully Added!" });
});

exports.editaccomplishments = catchAsyncErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();

    const eduIndex = student.resume.accomplishments.findIndex((i) => i.id === req.params.accomid);


    student.resume.accomplishments[eduIndex] = {
        ...student.resume.accomplishments[eduIndex],
        ...req.body,
    };


    await student.save();

    res.json({ message: "accomplishments successfully uptaded!" });
});

exports.deleteaccomplishments = catchAsyncErrors(async (req, res, next) => {

    const student = await Student.findById(req.id).exec();

    const filterededu = student.resume.accomplishments.filter((i) => i.id !== req.params.accomid);


    student.resume.accomplishments = filterededu;


    await student.save();

    res.json({ message: "accomplishments successfully deleted!" });
});