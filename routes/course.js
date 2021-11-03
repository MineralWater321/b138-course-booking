const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course");
const auth = require("../auth");


//Route for creating a course
router.post("/", auth.verify, (req, res) => {

	const adminData = auth.decode(req.headers.authorization);
	courseController.addCourse(req.body, adminData).then(resultFromController => res.send(resultFromController));

})

//Route for retrieving all the courses
router.get("/all", (req,res) => {
	courseController.getAllCourses().then(resultFromController => res.send(resultFromController));
})

//Route for retrieving all active courses
router.get("/", (req, res) => {
	courseController.getAllActive().then(resultFromController => res.send(resultFromController));
})

//Route for retrieving a specific course
router.get("/:courseId", (req,res) => {
	console.log(req.params.courseId);
	courseController.getCourse(req.params).then(resultFromController => res.send(resultFromController));
})

//Route for updating a course
router.put("/:courseId", auth.verify, (req, res) => {
	const userData = auth.decode(req.headers.authorization);
	courseController.updateCourse(req.params, req.body, userData).then(resultFromController => res.send(resultFromController));
})

//Route for archiving course
router.put("/:courseId/archive", auth.verify, (req, res) => {

	const userData = auth.decode(req.headers.authorization);
	courseController.archiveCourse(req.params, req.body, userData).then(resultFromController => res.send(resultFromController));
})

module.exports = router;