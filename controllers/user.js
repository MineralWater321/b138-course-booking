const User = require("../model/User")

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
}