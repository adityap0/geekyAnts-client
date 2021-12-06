import { addBook } from "./addBook.js";
import { loader } from "./loader.js";
import { addBooks } from "./addBooks.js";
const env = {
  BASE_URL: "https://library-server2.herokuapp.com/api/books",
};

const getAllbooks = () => {
  document.querySelector("body").append(loader());
  fetch(env.BASE_URL)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then(function (books) {
      addBooks(books);
      addBook(books);
    })
    .catch(function (err) {
      console.warn("Something went wrong.", err);
    });
};

//GET all books
getAllbooks();
