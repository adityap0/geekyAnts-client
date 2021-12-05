import { deleteBook } from "./deleteBook.js";
import { editBook } from "./editBook.js";
import { loader } from "./loader.js";
import { noBooks } from "./noBooks.js";
export function addBooks(allBooks) {
  document.querySelector("#loader").classList.add("hidden");
  if (allBooks.length < 1) {
    return document.getElementById("root").append(noBooks());
  }
  allBooks.forEach((book, id) => {
    let li = document.createElement("li");
    if (id % 2 !== 0) {
      li.classList.add(
        "flex",
        "justify-between",
        "my-2",
        "py-2",
        "bg-blue-200"
      );
    } else {
      li.classList.add("flex", "justify-between", "my-2", "py-2");
    }
    let div1 = document.createElement("div");
    div1.classList.add("w-1/12", "ml-3");
    div1.innerText = `${id + 1}.`;
    let div2 = document.createElement("div");
    div2.classList.add("w-3/12");
    div2.innerText = `${book.name}`;
    let div3 = document.createElement("div");
    div3.classList.add("w-2/12");
    div3.innerText = `${book.author}`;
    let div4 = document.createElement("div");
    div4.classList.add("w-2/12");
    div4.innerText = `${book.genre}`;
    let div5 = document.createElement("div");
    div5.classList.add("w-2/12");
    div5.innerText = `${book.edition}`;
    let div6 = document.createElement("div");
    div6.classList.add("w-2/12", "flex");
    let button1 = document.createElement("button");
    button1.classList.add(
      "px-2",
      "border",
      "border-blue-400",
      "rounded",
      "text-blue-500",
      "mr-2"
    );
    button1.innerText = "Edit";
    button1.addEventListener("click", (e) => {
      editBook(book);
    });
    let button2 = document.createElement("button");
    button2.classList.add(
      "px-2",
      "border",
      "border-red-500",
      "bg-red-400",
      "rounded",
      "text-white",
      "mr-2"
    );
    button2.innerText = "Delete";
    button2.addEventListener("click", (e) => {
      e.preventDefault();
      deleteBook(book);
    });
    div6.append(button1, button2);
    li.append(div1, div2, div3, div4, div5, div6);
    document.getElementById("root").append(li);
  });
}
