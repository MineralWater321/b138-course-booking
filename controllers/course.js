const Course = require("../model/Course");
const auth = require("../auth");

//Create a new course
module.exports.addCourse = (reqBody, adminData) => {
	//Creates a variable "newCourse" and instantiates a new "Course" object using the mongoose model
	if(adminData.isAdmin !== false){
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
		return false;
	}
}



/*const Course = require("../model/Course");

//Create a new course
module.exports.addCourse = (reqBody) => {
	//Creates a variable "newCourse" and instantiates a new "Course" object using the mongoose model
	let newCourse = new Course({
		name: reqBody.name,
		description: reqBody.description,
		price: reqBody.price
	});
	//Save the created object tot he database
	return newCourse.save().then((course, error) => {
		if(error){
			return false;
		}
		else{
			return false
		}
	})
}*/