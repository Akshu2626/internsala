const express = require("express");
const router = express.Router();

const {

    resume,
    addeducation,
    editeducation,
    deleteeducation,
    addjob,
    editjob,
    deletejob,
    addinternships,
    editinternships,
    deleteinternships,
    addresponsibilities,
    editresponsibilities,
    deleteresponsibilities,
    addcourse,
    editcourse,
    deletecourse,
    addproject,
    editproject,
    deleteproject,
    addskill,
    editskill,
    deleteskill,
    addaccomplishments,
    editaccomplishments,
    deleteaccomplishments,




} = require("../controllers/resumeController");

const { isAuthenticated } = require("../middlewares/auth");






// GET  / route
router.get("/", isAuthenticated, resume);

// ----------------------------Education------------------------

// POST  / addeducation
router.post("/add-edu", isAuthenticated, addeducation);

// POST  / editeducation/eduid
router.post("/edit-edu/:eduid", isAuthenticated, editeducation);

// POST  / deleteeducation/eduid
router.post("/delete-edu/:eduid", isAuthenticated, deleteeducation);

// --------------------------Job-------------------------------


// POST  / addjob
router.post("/add-job", isAuthenticated, addjob);

// POST  / editjob/jobid
router.post("/edit-job/:jobid", isAuthenticated, editjob);

//POST  / deletejob/jobid
router.post("/delete-job/:jobid", isAuthenticated, deletejob);

// --------------------------internship-------------------------------

// POST  / addintern
router.post("/add-intern", isAuthenticated, addinternships);

// POST  / editintern/internid
router.post("/edit-intern/:internid", isAuthenticated, editinternships);

//POST  / deleteintern/:internid
router.post("/delete-intern/:internid", isAuthenticated, deleteinternships);


// ---------------responsibilities----------------------

// POST  / addrespo
router.post("/add-respo", isAuthenticated, addresponsibilities);

// POST  / editrespo/respoid
router.post("/edit-respo/:respoid", isAuthenticated, editresponsibilities);

//POST  / deleterespo/:respoid
router.post("/delete-respo/:respoid", isAuthenticated, deleteresponsibilities);

// ---------------------courses----------------------

// POST  / addcourse
router.post("/add-course", isAuthenticated, addcourse);

// POST  / editcourse/courseid
router.post("/edit-course/:courseid", isAuthenticated, editcourse);

//POST  / deletercourse/:courseid
router.post("/delete-course/:courseid", isAuthenticated, deletecourse);


// ---------------------projects-----------------

// POST  / addproject
router.post("/add-project", isAuthenticated, addproject);

// POST  / editproject/projectid
router.post("/edit-project/:projectid", isAuthenticated, editproject);

//POST  / deleteproject/:projectid
router.post("/delete-project/:projectid", isAuthenticated, deleteproject);

// -----------------------skills----------------------------


// POST  / addskill
router.post("/add-skill", isAuthenticated, addskill);

// POST  / editskill/skillid
router.post("/edit-skill/:skillid", isAuthenticated, editskill);

//POST  / deleteskill/:skillid
router.post("/delete-skill/:skillid", isAuthenticated, deleteskill);


// ----------------- accomplishments--------------------

// POST  / addaccom
router.post("/add-accom", isAuthenticated, addaccomplishments);

// POST  / editaccom/accomid
router.post("/edit-accom/:accomid", isAuthenticated, editaccomplishments);

//POST  / deleteaccom/:accomid
router.post("/delete-accom/:accomid", isAuthenticated, deleteaccomplishments);




module.exports = router;