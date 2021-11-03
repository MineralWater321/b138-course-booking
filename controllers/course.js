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