const express = require("express");
const nanoid = require("nanoid").nanoid;
const app = express();

process.env.PORT = process.env.PORT || 8080;
process.env.LENGTH = process.env.LENGTH || 5;

let shorts = {};

const generateId = () => {
	let id = nanoid(process.env.LENGTH);
	return shorts[id] ? generateId() : id;
};

const exists = (url) => {
	for (let id in shorts) {
		if (shorts[id] === url) return id;
	}
	return null;
};

app.use(express.static("build"));
app.use(express.json());

app.get("/:id", (req, res) => {
	let id = req.params.id;
	if (shorts[id]) {
		return res.redirect(shorts[id]);
	}
	return res.sendStatus(404);
});

app.post("/", (req, res) => {
	let url = req.body.url;
	if (url) {
		let id = exists(url) || generateId();
		shorts[id] = url;
		return res.send(id);
	}
	return res.sendStatus(400);
});

app.listen(process.env.PORT, () => {
	console.log(`app listening at http://localhost:${process.env.PORT}`);
});
