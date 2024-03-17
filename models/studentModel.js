const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");


const studentModel = new mongoose.Schema({

    firstname: {
        type: String,
        required: [true, "first name is required"],
        minLength: [4, " first name should be atleast 4 character long"]
    },

    lastname: {
        type: String,
        required: [true, "last name is required"],
        minLength: [4, " last name should be atleast 4 character long"]
    },


    contact: {
        type: String,
        // required: [true, "contact is required"],
        maxLength: [10, "contact must not exceed 10 character"],
        minLength: [10, "contact should be atleast 10 character long"],

    },
    city: {
        type: String,
        // required: [true, "city name is required"],
        minLength: [4, " city should be atleast 4 character long"]

    },
    gender: {
        type: String,
        // enum: ["Male", "Female", "Other"],

    },

    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please fill a valid email address'
        ]
    },

    password: {
        type: String,
        select: false,
        maxLength: [15, "Password should not exceed more than 15 character"],
        minLength: [6, "Password should have atlest 6 character"],
    },

    resetPasswordToken: {
        type: String,
        default: "0",
    },

    
    avatar: {
        type: Object,
        default: {
            fileId: "",
            url: "https://images.unsplash.com/photo-1703889432174-3bd88a101b9a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEyfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",

        },
    },

    resume: {
        education: [],
        jobs: [],
        internships: [],
        responsibilities: [],
        courses: [],
        projects: [],
        skills: [],
        accomplishments: [],


    },
    internships: [
        { type: mongoose.Schema.Types.ObjectId, ref: "internships" }
    ],
    jobs: [
        { type: mongoose.Schema.Types.ObjectId, ref: "jobs" }
    ],

}, { timestamps: true });


studentModel.pre("save", function () {

    if (!this.isModified("password")) {
        return;
    }

    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
})

studentModel.methods.comparepassword = function (password) {
    return bcrypt.compareSync(password, this.password)
};

studentModel.methods.getjwttoken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}

const student = mongoose.model("student", studentModel);

module.exports = student;