const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course");
const auth = require("../auth");


//Route for creating a course
router.post("/", auth.verify, (req, res) => {

	const adminData = auth.decode(req.headers.authorization);
	
	courseController.addCourse(req.body, adminData).then(resultFromController => res.send(resultFromController));

})

module.exports = router;