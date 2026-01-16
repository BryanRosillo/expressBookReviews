const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  let username = req.body.username;
  let password = req.body.password;
  if(users.find(user => user.username === username)){
    return res.status(400).json({message: "User already exists!"});
  }else if(username.length === 0 || password.length === 0){
    return res.status(400).json({message: "Username and password are required"});
  }else{
    users.push({username: username, password: password});
    return res.status(201).json({message: "User registered successfully"});
  }
});
// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let isbn = req.params.isbn;
  let book = books[isbn];
  if(book){
    return res.status(200).json(book);
  }else{
    return res.status(404).json({message: "Book not found"});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let author = req.params.author;
  let results = [];
  results = Object.values(books).filter(book => book.author.toLowerCase() === author.toLowerCase());
  if(results.length > 0){
    return res.status(200).json(results);
  }else{
    return res.status(404).json({message: "No books found by this author"});
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let title = req.params.title;
  let results = [];
  results = Object.values(books).filter(book => book.title.toLowerCase() === title.toLowerCase());
  if(results.length > 0){
    return res.status(200).json(results);
  }else{
    return res.status(404).json({message: "No books found with this title"});
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  let isbn = req.params.isbn;
  let book = books[isbn];
  if(book){
    return res.status(200).json(book.reviews);
  }else{
    return res.status(404).json({message: "Book not found"});
  }
});

module.exports.general = public_users;
