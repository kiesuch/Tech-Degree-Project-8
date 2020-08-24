const createError = require("http-errors");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./routes/books");
const app = express();

// Set pug as the view engine
app.set("view engine", "pug");
app.use("/static", express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

// Respond to route resquest from books.js route
app.use("/", routes);


// Handler to catch undefined or non-existent route requests
app.use((req, res, next) => {
    const err = new Error("Requested page was not found.");
    err.status = 404;
    next(err);
});

// Global Error handler
app.use((err, req, res, next) => {
	if (err) {
		console.log("Global error handler: ", err);
	}

	if (err.status === 404) {
		res.render("page_not_found");
	} else {
		err.status = 500;
		res.render("error");
	}
});

app.listen(3000, () => console.log("Application is running on port 3000"));