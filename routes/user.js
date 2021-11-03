const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const auth = require("../auth");

//Route for checking if the user's email already exists in the database
router.post("/checkEmail", (req, res) => {
	userController.checkEmailExists(req.body).then(resultFromController => res.send(resultFromController));
});

//Route for registering a user
router.post("/register", (req,res) => {
	userController.registerUser(req.body).then(resultFromController => res.send(resultFromController));
});

//Route for authenticating a user
router.post("/login", (req, res) => {
	userController.loginUser(req.body).then(resultFromController => res.send(resultFromController));
});

//Route for retrieving user details
//auth.verify method acts as a middleware to ensure that a user is logged in before they access specific app features
router.get("/details", auth.verify, (req, res) => {

	const userData = auth.decode(req.headers.authorization);
	
	//Provides the user's ID for getprofile controller method
	userController.getProfile({userId : userData.id}).then(resultFromController => res.send(resultFromController));

})

//Another method
/*router.get("/details", (req, res) => {
	
	const userData = auth.decode(req.headers.authorization);

	userController.getProfile(userData).then(resultFromController => res.send(resultFromController));
})*/




//Allows us to export the "router" object that will be accessed in "index.js"
module.exports = router;