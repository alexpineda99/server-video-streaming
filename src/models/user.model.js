const {Schema, model} = require("mongoose");

const UserSchema = new Schema({
    username: {type: String, require: [true, "This field is required"], unique: true, 
        minLength: [4, "Username field must be at least 3 characters and no more than 20 characters"], 
        maxLength: [20, "Username field must be at least 3 characters and no more than 20 characters"],
        validate: {
            validator: function(username) {
                return /^(?=.{3,20}$)(?![])(?!.*[_.-]{2})[a-zA-Z0-9._-]+(?<![])$/gm.test(username)
            },
            message: props => `${props.value} Is not a valid username`
        }
    },
    email: {type: String, require: [true, "This field is required"], unique: true,
    validate: {
        validator: function(Email) {
            return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(Email)
        },
        message: props => `${props.value} Is not a valid email`
    }
},
    password: {type: String, require: [true, "This field is required"], minLength: [8, "Minimun 8 characters"], }
},{
    timestamps: true
});

module.exports = model("User", UserSchema);



// ************* validation password field backup ****

// password: {type: String, require: [true, "This field is required"], 
// minLength: [8, "Minimun 8 characters"], 
// maxLength: [16, "Maximun 16 characters"],
// validate: {
//     validator: function(pass) {
//         return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,16})/gm.test(pass)
//     },
//     message: props => `${props.value} Is not a valid password`
// }}
