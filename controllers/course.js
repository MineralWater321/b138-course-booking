const Course = require("../model/Course");
const auth = require("../auth");

//Create a new course
module.exports.addCourse = async (reqBody, adminData) => {
	//Creates a variable "newCourse" and instantiates a new "Course" object using the mongoose model

	//determines if user who accessed is admin or not
	if(adminData.isAdmin == true){
		let newCourse = new Course({
			name: reqBody.name,
			description: reqBody.description,
			price: reqBody.price
		});
		//Save the created object to the database
		return newCourse.save().then((course, error) => {
			if(error){
				return false;
			}
			else{
				return true;
			}
		})
	}
	else{
		//needs to return a promise with a value of false or else it will cause an error
		
		return (`You have no access`);
	}
}

//Controller method for retrieving all the courses
module.exports.getAllCourses = () => {
	return Course.find({}).then(result => {
		return result;
	})
}

//Retrieve all active courses
module.exports.getAllActive = () => {
	return Course.find({isActive: true}).then(result => {
		return result;
	})
}

//Retrieving a specific course
module.exports.getCourse = (reqParams) => {
	return Course.findById(reqParams.courseId).then(result => {
		return result;
	})
}

//Update a course
module.exports.updateCourse = async (reqParams, reqBody, user) => {
	//Validate if user is admin
	if(user.isAdmin){
		//Specify the fields/properties of the document to be updated
		let updatedCourse = {
			name: reqBody.name,
			description: reqBody.description,
			price: reqBody.price
		}
		return Course.findByIdAndUpdate(reqParams.courseId, updatedCourse).then((course, error) => {
			if(error){
				return false;
			}
			else{
				return true;
			}
		})
	}
	else{
		return(`You have no access`);
	}
}

//Archive a course
module.exports.archiveCourse = async (reqParams, reqBody, user) => {
	//Validate if user is admin
	if(user.isAdmin){
		
		return Course.findByIdAndUpdate(reqParams.courseId, {isActive: reqBody.isActive}).then((course, error) => {
			if(error){
				return false;
			}
			else{
				return true;
			}
		})
	}
	else{
		return(`You have no access`);
	}
}