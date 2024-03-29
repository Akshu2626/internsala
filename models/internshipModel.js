const mongoose = require("mongoose")



const internshipModel = new mongoose.Schema({

    employe:{ type: mongoose.Schema.Types.ObjectId, ref: "employe" } ,
    students:[{ type: mongoose.Schema.Types.ObjectId, ref: "student" } ],


    profile: String,

    skill: String,

    internshiptype: {

        type: String,
        enum: ["In office", "Remote"]

    },

    openings: String,
    from: String,
    to: String,
    duration: String,
    responsibility: String,

    stipend: {
        status: {
            type: String,
            enum: ["Fixed", "Negotiable", "Performance based", "Unpaid"]
        },

        amount: Number,

    },

    perks: String,
    assesments: String,



}, { timestamps: true });


const Internship = mongoose.model("internships", internshipModel);

module.exports = Internship;