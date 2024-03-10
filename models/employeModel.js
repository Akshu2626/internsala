const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");


const employeModel = new mongoose.Schema({

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
        required: [true, "contact is required"],
        maxLength: [10, "contact must not exceed 10 character"],
        minLength: [10, "contact should be atleast 10 character long"],

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
    organizationname: {
        type: String,
        // required: [true, "organization name is required"],
        minLength: [4, " organization name should be atleast 4 character long"]
    },

    organizationdescription: {
        type: String,
        // required: [true, "organization description is required"],
        minLength: [4, " organization name should be atleast 4 character long"]
    },
    organizationcity: {
        type: String,
        // required: [true, "organization city is required"],
        minLength: [4, " organization name should be atleast 4 character long"]
    },
    industry: {
        type: String,
        // required: [true, "industry is required"],
        minLength: [4, " organization name should be atleast 4 character long"]
    },

    organizationlogo: {
        type: Object,
        default: {
            fileId: "",
            url: "https://images.unsplash.com/photo-1703889432174-3bd88a101b9a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEyfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",

        },
    },

    internships: [
        { type: mongoose.Schema.Types.ObjectId, ref: "internships" }
    ],
    jobs: [
        { type: mongoose.Schema.Types.ObjectId, ref: "jobs" }
    ],

}, { timestamps: true });


employeModel.pre("save", function () {

    if (!this.isModified("password")) {
        return;
    }

    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
})

employeModel.methods.comparepassword = function (password) {
    return bcrypt.compareSync(password, this.password)
};

employeModel.methods.getjwttoken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}

const Employe = mongoose.model("employe", employeModel);

module.exports = Employe;