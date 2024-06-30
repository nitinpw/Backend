import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true,
            index: true
        },
            email: {
                type: String,
                required: true,
                unique: true,
                lowecase: true,
                trim: true
            },
            fullName: {
                type: String,
                required: true,
                trim: true,
                index: true
            },
            avatar: {
                type: String, // cloudinary url
                required: true,
            },
            coverImage: {
                type: String, //cloudinary url
            },
            watchHistory:[
                {
                    type: Schema.types.ObjectTd,
                    ref: "Video"
                }
            ],
            password: {
                type: String,
                required: [true, 'Password is required']
            },
            refreshToken: {
                type: String
            }
    },
    {
        timestamps: true
    }
)


userSchema.pre("save", async function (next){
    if(!this.isModifed("password")) return next()
    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.Schema.method.generateAcessToken = function(){
    return jwt.sign(
        {
            _id: this.id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.Schema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id: this.id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_ID
        }
    )
}

export const User = mongoose.model("User", userSchema)