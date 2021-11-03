const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user")
const courseRoutes = require("./routes/course")

const app = express();

//Connect to MongoDB
mongoose.connect("mongodb+srv://dbedwardpaler:A9oJgn0nL4BAbIcf@wdc028-course-booking.tgio6.mongodb.net/b138_to-do?retryWrites=true&w=majority",
	{
		useNewUrlParser:true,
		useUnifiedTopology:true	
	}
);

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas'));


app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Defines the "/users" string to be included for all user routes defined in the "user" route file
app.use("/users", userRoutes);

//Defines the "/courses" string to be included for all course routes defined in the "course" route file
app.use("/courses", courseRoutes);

//Listening to port
app.listen(process.env.PORT || 4000, () => {
	console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
})