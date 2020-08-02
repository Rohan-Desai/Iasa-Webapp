// Imports
const express = require('express');
const ejs = require('ejs');
const bodyParser = require("body-parser");
const app = express();

require('dotenv').config();

// Express Settings
app.set('view engine', 'ejs');
const port = process.env.PORT || 3000;

// MiddleWare
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

// Connnect to database
var mongoose = require("mongoose");
const db = mongoose.connection;
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true
});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("connected");
});


// Schema and model
var memberSchema = new mongoose.Schema({
	name: String,
	grade: String,
	school: String,
	dances: [String]
});

var Member = mongoose.model("Member", memberSchema);


// Routes
app.get("/", (req, res) => {
	Member.find({}, function(err, docs) {
		res.render("index", {
			memberArray: docs
		});
	});
});

app.get("/memberdata", (req, res) => {
	Member.find({}, function(err, docs) {
		res.send(docs);
	});
});

app.post("/", (req, res) => {
	const newMember = new Member(req.body);
	newMember.save(function(err) {
		if (err) {
			console.log(err);
			return;
		}
		console.log("saved");
		res.sendStatus(200);
	});

});

// Start Server
app.listen(port, () => {
	console.log("Server listening on port " + port);
});