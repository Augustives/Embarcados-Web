const mongoose = require("mongoose");
const connectionString = "url do mongo";
const Hour = require("./models/hours");


mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => {
		console.log("Connection Open!!")
	})
	.catch(err => {
		console.log("Error")
	})

const h = new Hour({
	hour: "18:00"
})

h.save().then(p => {
	console.log(h)
})
.catch(e => {
	console.log(e)
})