const jwt = require("jsonwebtoken");

const secret = "CourseBookingAPI";

//Token creation

module.exports.createAccessToken = (user) => {
	//The data will be received from the resignation form
	//When the user logs in, a token will be created with the user's information
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	};

	//Generates a JSON web token using the jwt's sign method
	return jwt.sign(data, secret, {});
}