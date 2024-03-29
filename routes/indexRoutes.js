const express = require("express");
const router = express.Router();
const {
    homepage,
    currentUser,
    studentsignup,
    studentsignin,
    studentsignout,
    studentsendmail,
    studentforgetlink,
    studentresetpassword,
    studentupdate,
    studentavatar,
    applyinternship,
    applyjob,
    studentreadjob,
    studentreadinternship
} = require("../controllers/indexController");
const { isAuthenticated } = require("../middlewares/auth");


// GET  / route
router.get("/", homepage);

// POST / student
router.post("/student/currentuser", isAuthenticated, currentUser);

// POST / student/signup
router.post("/student/signup", studentsignup);

// POST / student/signin
router.post("/student/signin", studentsignin);

// GET / student/signout
router.get("/student/signout", isAuthenticated, studentsignout);

// POST / student/send-mail
router.post("/student/send-mail", studentsendmail);

// POST / student/forget-link/:studentid
router.post("/student/forget-link/:id", studentforgetlink);

// POST / student/reset-password/studentid
router.post("/student/reset-password/:id", isAuthenticated, studentresetpassword);


// POST / student/update/studentid
router.post("/student/update/:id", isAuthenticated, studentupdate);

// POST / student/avatar/studentid
router.post("/student/avatar/:id", isAuthenticated, studentavatar);



//GET /student/read/job 
router.get('/student/read/job', studentreadjob);


//Get  /student/read/internship
router.get('/student/read/internship',studentreadinternship)



// ------------------apply internship-------------------


// POST / student/apply/internship/:internshipid
router.post("/student/apply/internship/:internshipid", isAuthenticated, applyinternship);


// ------------------apply job-------------------


// POST / student/apply/job/:jobid
router.post("/student/apply/job/:jobid", isAuthenticated, applyjob);

module.exports = router;