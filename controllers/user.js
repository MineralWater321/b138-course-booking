const User = require("../model/User");
const Course = require("../model/Course")
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
module.exports.getProfile = (data) => {

	return User.findById(data.userId).then(result => {

		// Changes the value of the user's password to an empty string when returned to the frontend
		// Not doing so will expose the user's password which will also not be needed in other parts of our application
		// Unlike in the "register" method, we do not need to call the mongoose "save" method on the model because we will not be changing the password of the user in the database but only the information that we will be sending back to the frontend application
		result.password = "";

		// Returns the user information with the password as an empty string
		return result;
	});
};

//Another method without using findById
/*module.exports.getProfile = (reqBody) => {
	return User.findOne({_id: reqBody.id}).then((result) => {
		result.password = "";
		return result;
	})
}*/

//Enroll user to a class
//Async await will be used in enrolling the user because we will need to update two separate documents
module.exports.enroll = async (data, userData) => {
	if(userData.isAdmin){
		// Add the course ID in the enrollments array of the user
		let isUserUpdated = await User.findById(data.userId).then(user => {
			// Adds the courseId in the user's enrollment array
			user.enrollments.push({courseId : data.courseId});

			// Saves the updated user information in the database
			return user.save().then((user, error) => {
				if(error){
					return false;
				}
				else{
					return true;
				}
			})
		})

		// Add the user ID in the enrollees array of the course
		let isCourseUpdated = await Course.findById(data.courseId).then(course => {
			// Adds the userId in the course's enrollees array
			course.enrollees.push({userId : data.userId});

			// Save the updated course information in the database
			return course.save().then((course, error) => {
				if(error){
					return false;
				}
				else{
					return true;
				}
			})
		})
		// Condition that will check if the user and course documents have been updated
		if(isUserUpdated && isCourseUpdated){
			return true;
		}
		else{
			return false;
		}
	}
	else {
		return false;
	}
	
	
}
