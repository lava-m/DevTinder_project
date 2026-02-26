
import mongoose from "mongoose";
import validator from "validator";


const userSchema = new mongoose.Schema({

    emailId:{
        type: String,
        lowercase: true,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address."+ value);
            }
        }
    },
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName:{
        type: String
    },

    password:{
        type: String,
        required: true,
        validate(value){
            if(!validator(value).isStrongPassword(value)){
                throw new error("Password is not strong");
            }
        }
    },
    age: {
        type: Number,
        minLength: 18,
    },
    gender:{
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Gender is not valid")
            }
        },
        type: String
    },
    photoUrl: {
        type: String,
        validate(value){
            if(!validator.isURL(value)){
                throw new error("PhotoURL not correct.")
            }
        }

    },
    about:{
        type: String,
        default: "https://www.google.com/imgres?q=user%20profile%20pictures&imgurl=https%3A%2F%2Fmedia.istockphoto.com%2Fid%2F1337144146%2Fvector%2Fdefault-avatar-profile-icon-vector.jpg%3Fs%3D612x612%26w%3D0%26k%3D20%26c%3DBIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI%3D&imgrefurl=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fuser-profile&docid=TMbHzRmYG8eIVM&tbnid=ryd4rpzUCi1AcM&vet=12ahUKEwjH5qCkyfKSAxVS3jQHHdXSMlsQnPAOegQILBAB..i&w=612&h=612&hcb=2&ved=2ahUKEwjH5qCkyfKSAxVS3jQHHdXSMlsQnPAOegQILBAB",
    },
    skills:{
        type: [String],
    },
},   
   { 
    timestamps: true,
   }
);

const User = mongoose.model("User", userSchema);

export default User;