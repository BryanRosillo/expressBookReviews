const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const axios = require('axios');
const public_users = express.Router();


const BOOKS_API = "http://localhost:5000"; 

// Task 10: Get the book list available in the shop
public_users.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${BOOKS_API}/books`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Unable to fetch book list", error: error.message });
  }
});

// Task 11: Get book details based on ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
  const isbn = req.params.isbn;
  try {
    const response = await axios.get(`${BOOKS_API}/books/${isbn}`);
    if (response.data) {
      return res.status(200).json(response.data);
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error fetching book by ISBN", error: error.message });
  }
});

// Task 12: Get book details based on author
public_users.get('/author/:author', async (req, res) => {
  const author = req.params.author;
  try {
    const response = await axios.get(`${BOOKS_API}/books`);
    const results = Object.values(response.data).filter(
      book => book.author.toLowerCase() === author.toLowerCase()
    );
    if (results.length > 0) {
      return res.status(200).json(results);
    } else {
      return res.status(404).json({ message: "No books found by this author" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books by author", error: error.message });
  }
});

// Task 13: Get book details based on title
public_users.get('/title/:title', async (req, res) => {
  const title = req.params.title;
  try {
    const response = await axios.get(`${BOOKS_API}/books`);
    const results = Object.values(response.data).filter(
      book => book.title.toLowerCase() === title.toLowerCase()
    );
    if (results.length > 0) {
      return res.status(200).json(results);
    } else {
      return res.status(404).json({ message: "No books found with this title" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books by title", error: error.message });
  }
});

// Task 14: Get book reviews (no change, no need for Axios)
public_users.get('/review/:isbn', async (req, res) => {
  const isbn = req.params.isbn;
  try {
    const response = await axios.get(`${BOOKS_API}/books/${isbn}`);
    const book = response.data;
    if (book) {
      return res.status(200).json(book.reviews);
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error fetching book reviews", error: error.message });
  }
});

module.exports.general = public_users;
