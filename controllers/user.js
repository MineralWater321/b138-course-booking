const User = require("../model/User");
const bcrypt = require("bcrypt");
const auth = require("../auth");

//Check if email already exists
module.exports.checkEmailExists = (reqBody) => {
	return User.find({email: reqBody.email}).then(result => {

		if(result.length > 0){
			return true;
		}
		else{
			return false;
		}
	})
};

//User Registration
module.exports.registerUser = (reqBody) => {
	//Creates a variable "newUser" and instantiates a new "User" object using the mongoose module
	//Uses the information from the request body to provide all the necessary information
	let newUser = new User({
		firstName : reqBody.firstName,
		lastName: reqBody.lastName,
		email: reqBody.email,
		mobileNo: reqBody.mobileNo,
		password: bcrypt.hashSync(reqBody.password, 10)
	})

	return newUser.save().then((user, error) => {
		if(error){
			return false;
		}
		else{
			return true;
		}
	})
};

//User authentication
module.exports.loginUser = (reqBody) => {

	return User.findOne({email: reqBody.email}).then(result => {
		if(result == null){
			return false;
		}
		else{
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);
			if(isPasswordCorrect){
				return { access: auth.createAccessToken(result) }
			}
			else{
				return false;
			}
		}
	})
}

//Get user
module.exports.getProfile = (reqBody) => {
	return User.findOne({_id: reqBody.id}).then((result) => {
		result.password = "";
		return result;
	})
}