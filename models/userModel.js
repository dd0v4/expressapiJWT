const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Le livre doit avoir un titre"]
    },
    date: {
        type: Number,
        required: [true, "Le livre doit avoir une date"]
    },
    genre: {
        type: String,
        required: [true, "Le livre doit avoir un genre"]
    }
});

const userSchema = mongoose.Schema({
    books: [bookSchema],
    name: {
        type: String,
        required: [true, "L'utilisateur doit avoir un nom"]
    },
    age: {
        type: Number,
        required: [true, "L'utilisateur doit avoir un âge."]
    },
    token: {
        type: String
    }
});

userSchema.pre("save", (next) => {
    const user = this;
    if (!user.isModified("token")) {
        return next();
    }
    user.token = jwt.sign({ name: user.name, age: user.age }, "yo");
    next();
});

const userModel = mongoose.model("User", userSchema); 
module.exports = userModel;
