const env = {
  BASE_URL: "https://library-server2.herokuapp.com/api/books",
};
export function addBook() {
  let div = document.createElement("div");
  div.innerHTML = `<div class="fixed z-10 inset-0 overflow-y-auto hidden" id="addbookmodal">
  <div class="text-center">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
    <div
      class="
            my-56
            inline-block
            bg-white
            shadow-xl
            transform
            transition-all
            sm:align-middle
            sm:max-w-lg
            sm:w-full
            p-4
            h-96
          "
    >
      <div class="flex justify-between border-b border-black my-1">
        <h3 class="mb-1">Add a new book</h3>
        <img
          src="./public/Close_icon.png"
          alt="close"
          class="cursor-pointer mb-1"
          id="close-addbookmodal"
        />
      </div>
      <form id="newbookform">
        <ul class="flex flex-wrap my-4 justify-between">
          <li class="flex flex-col w-5/12 my-4">
            <span class="text-left">Name</span>
            <input
              type="text"
              placeholder="Enter a book name"
              name="name"
              class="border border-blue-300 p-2 rounded"
            />
          </li>
          <li class="flex flex-col w-5/12 my-4">
            <span class="text-left">Genre</span>
            <input
              type="text"
              placeholder="Enter genre"
              class="border border-blue-300 p-2 rounded"
              name="genre"
            />
          </li>
          <li class="flex flex-col w-5/12 my-4">
            <span class="text-left">Edition</span>
            <input
              type="text"
              placeholder="Enter edition"
              class="border border-blue-300 p-2 rounded"
              name="edition"
            />
          </li>
          <li class="flex flex-col w-5/12 my-4">
            <span class="text-left">Author</span>
            <input
              type="text"
              placeholder="Enter author"
              class="border border-blue-300 p-2 rounded"
              name="author"
            />
          </li>
        </ul>
        <div class="flex absolute right-4 bottom-4" id="cancel-add-btn-div">
          <button
            class="bg-gray-500 p-2 mx-2 rounded text-white"
            id="cancel-addbookmodal"
          >
            Cancel
          </button>
          <button class="bg-blue-500 p-2 rounded text-white" type="submit">
            Add Book
          </button>
        </div>
        <div class="hidden" id="addbook-loader-div">
         <img src="./public/loader.png" class="w-6 h-6 mx-auto" alt="">
         <span>Adding book to the library</span>
        </div>
      </form>
    </div>
  </div>
</div>`;
  document.querySelector("body").append(div);
  //add new book
  document.getElementById("addbook").addEventListener("click", (e) => {
    //display modal
    document.getElementById("addbookmodal").classList.remove("hidden");
    //close the modal on cancel button
    div
      .querySelector("#cancel-addbookmodal")
      .addEventListener("click", (event) => {
        event.preventDefault();
        document.getElementById("addbookmodal").classList.add("hidden");
      });
    //close the modal on X
    div
      .querySelector("#close-addbookmodal")
      .addEventListener("click", (event) => {
        event.preventDefault();
        document.getElementById("addbookmodal").classList.add("hidden");
      });
    //get form data
    document.getElementById("newbookform").addEventListener("submit", (e) => {
      e.preventDefault();
      div.querySelector("#cancel-add-btn-div").classList.add("hidden");
      div.querySelector("#addbook-loader-div").classList.remove("hidden");
      var formData = Array.from(
        document.querySelectorAll("#newbookform input")
      ).reduce(
        (acc, cv) => ({
          ...acc,
          [cv.name]: cv.value,
        }),
        {}
      );
      fetch(env.BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(formData),
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(response);
        })
        .then(function (data) {
          document.getElementById("addbookmodal").classList.add("hidden");
          window.location.reload();
        })
        .catch(function (err) {
          console.warn("Something went wrong.", err);
        });
    });
  });
}
