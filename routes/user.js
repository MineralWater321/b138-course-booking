const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

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
router.post("/details", (req, res) => {
	userController.getProfile(req.body).then(resultFromController => res.send(resultFromController));
})





//Allows us to export the "router" object that will be accessed in "index.js"
module.exports = router;