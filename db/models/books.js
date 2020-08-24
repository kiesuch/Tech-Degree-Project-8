const Sequelize = require("sequelize");

// Define the book model for the database info

module.exports = (sequelize) => {
	class Book extends Sequelize.Model {}
	Book.init({
		
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		
		title: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Book title is required.",
				},
				notEmpty: {
					msg: "Book title is required.",
				},
			},
		},
		
		author: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notNull: {
					msg: "Author is required.",
				},
				notEmpty: {
					msg: "Author is required.",
				},
			},
		},
		
		genre: {
			type: Sequelize.STRING,
		},
		
		year: {
			type: Sequelize.INTEGER,
		},
	}, { sequelize });

	return Book;
};