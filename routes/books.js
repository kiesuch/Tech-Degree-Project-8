const express = require("express");
const db = require("../db");
const router = express.Router();
const { Book } = db.models;

// Async/await middleware
function asyncHandler(cb) {
	return async (req, res, next) => {
		try {
			await cb(req, res, next);
		} catch (err) {
			err = new Error();
			err.status = 500;
			next(err);
		}
	};
}

router.get(
	"/",
	asyncHandler(async (req, res) => {
		res.redirect("/books");
	})
);

// Get the book info from the database
router.get(
	"/books",
	asyncHandler(async (req, res) => {
		const books = await Book.findAll({order: [["title", "ASC"]]});
		res.render("index", { books, title: "SQL Library Manager" });
	})
);

// render the form for new book info
router.get(
	"/books/new",
	asyncHandler(async (req, res, next) => {
		res.render("new-book", { title: "Enter New Book" });
	})
);

// Post the new book info
router.post(
	"/books/new",
	asyncHandler(async (req, res, next) => {
		let book;
		try {
			book = await Book.create(req.body);
			res.redirect("/books");
		} catch (error) {
			if (error.name === "SequelizeValidationError") {
				book = await Book.build(req.body);
				res.render("new-book", {
					book,
					errors: error.errors,
					title: "Enter New Book",
				});
			} else {
				throw error;
				next(err);
			}
		}
	})
);

// Get the book info by the id
router.get(
	"/books/:id",
	asyncHandler(async (req, res, next) => {
		const book = await Book.findByPk(req.params.id);
		if (book) {
			res.render("update-book", { book, title: "Update Book Detail" });
		} else {
			next(err);
		}
	})
);

// Update a book's info
router.post(
	"/books/:id",
	asyncHandler(async (req, res) => {
		let book;
		try {
			book = await Book.findByPk(req.params.id);
			if (book) {
				await book.update(req.body);
				res.redirect("/books");
			}
		} catch (error) {
			if (error.name === "SequelizeValidationError") {
				book = await Book.build(req.body);
				book.id = req.params.id;
				res.render("update-book", {
					book,
					errors: error.errors,
					title: "Update book detail",
				});
			} else {
					next(err);
			}
		}
	})
);

// Delete a book and all its info
router.get(
	"/books/:id/delete",
	asyncHandler(async (req, res) => {
		const book = await Book.findByPk(req.params.id);
		if (book) {
			res.render("/books", { book });
		} else {
			res.sendStatus(404);
		next(err);
		}
	})
);

router.post(
	"/books/:id/delete",
	asyncHandler(async (req, res) => {
		const book = await Book.findByPk(req.params.id);
		if (book) {
			await book.destroy();
			res.redirect("/books");
		} else {
			res.sendStatus(404);
			next(err);
		}
	})
);

module.exports = router;