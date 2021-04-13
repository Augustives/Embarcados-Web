const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const connectionString = "url do mongo";
const Hour = require("./models/hours");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));
app.set("view engine", "ejs");


mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => {
		console.log("Connection Open!!")
	})
	.catch(err => {
		console.log("Error")
	})

app.get("/", async (req, res) => {
	const hours = await Hour.find({});
	res.render("home.ejs", { hours })
});

app.post("/", async (req, res) => {
	const {hora} = req.body;
	const x = await Hour.find({hour: hora.toString()});
	if (x.length == 0) {
		const newHour = new Hour({hour: hora});
		await newHour.save();
	}
	res.redirect("/");
})

app.get("/selecionaHorario", (req, res) => {
	res.render("selecionaHorario.ejs")
})

app.delete("/delete/:hora", async (req, res) => {
	const { hora } = req.params;
	await Hour.deleteOne({hour: hora.toString()});
	res.redirect("/");
})

app.listen(8000, () => {
	console.log("Listening on port 8000.")
});