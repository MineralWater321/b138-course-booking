const Course = require("../model/Course");
const auth = require("../auth");

//Create a new course
module.exports.addCourse = (reqBody, adminData) => {
	//Creates a variable "newCourse" and instantiates a new "Course" object using the mongoose model

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
		//needs to return a promise with a value of false
		let falsePromise = Promise.resolve(false);
		return falsePromise;
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