const env = {
  BASE_URL: "https://library-server2.herokuapp.com/api/books",
};
export function editBook(book) {
  let div = document.createElement("div");
  div.innerHTML = `<div class="fixed z-10 inset-0 overflow-y-auto hidden" id="editbookmodal">
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
        <h3 class="">Edit book details</h3>
          <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              id="close-editbookmodal"
              class="cursor-pointer close-editbookmodal"
            >
              <path
                d="M6.22505 4.81099C6.03645 4.62883 5.78384 4.52803 5.52165 4.53031C5.25945 4.53259 5.00864 4.63776 4.82323 4.82317C4.63782 5.00858 4.53265 5.25939 4.53037 5.52158C4.5281 5.78378 4.62889 6.03638 4.81105 6.22499L10.586 12L4.81005 17.775C4.71454 17.8672 4.63836 17.9776 4.58595 18.0996C4.53354 18.2216 4.50595 18.3528 4.5048 18.4856C4.50364 18.6184 4.52895 18.75 4.57923 18.8729C4.62951 18.9958 4.70376 19.1075 4.79765 19.2014C4.89155 19.2953 5.0032 19.3695 5.12609 19.4198C5.24899 19.4701 5.38067 19.4954 5.51345 19.4942C5.64623 19.4931 5.77745 19.4655 5.89945 19.4131C6.02146 19.3607 6.1318 19.2845 6.22405 19.189L12 13.414L17.775 19.189C17.9637 19.3711 18.2163 19.4719 18.4784 19.4697C18.7406 19.4674 18.9915 19.3622 19.1769 19.1768C19.3623 18.9914 19.4674 18.7406 19.4697 18.4784C19.472 18.2162 19.3712 17.9636 19.189 17.775L13.414 12L19.189 6.22499C19.3712 6.03638 19.472 5.78378 19.4697 5.52158C19.4674 5.25939 19.3623 5.00858 19.1769 4.82317C18.9915 4.63776 18.7406 4.53259 18.4784 4.53031C18.2163 4.52803 17.9637 4.62883 17.775 4.81099L12 10.586L6.22505 4.80999V4.81099Z"
                fill="black"
              />
            </svg>
      </div>
      <form id="editbookform">
        <ul class="flex flex-wrap my-4 justify-between">
          <li class="flex flex-col w-5/12 my-4">
            <span class="text-left">Name</span>
            <input
              type="text"
              placeholder="Enter a book name"
              name="name"
              class="border border-blue-300 p-2 rounded text-blue-300"
              value="${book.name}"
            />
          </li>
          <li class="flex flex-col w-5/12 my-4">
            <span class="text-left">Genre</span>
            <input
              type="text"
              placeholder="Enter genre"
              class="border border-blue-300 p-2 rounded text-blue-300"
              name="genre"
              value="${book.genre}"
            />
          </li>
          <li class="flex flex-col w-5/12 my-4">
            <span class="text-left">Edition</span>
            <input
              type="text"
              placeholder="Enter edition"
              class="border border-blue-300 p-2 rounded text-blue-300"
              name="edition"
              value="${book.edition}"
            />
          </li>
          <li class="flex flex-col w-5/12 my-4">
            <span class="text-left">Author</span>
            <input
              type="text"
              placeholder="Enter author"
              class="border border-blue-300 p-2 rounded text-blue-300"
              name="author"
              value="${book.author}"
            />
          </li>
        </ul>
        <div class="flex absolute right-4 bottom-4" id="cancel-save-div">
          <button
            class="bg-gray-500 p-2 mx-2 rounded text-white"
            id="cancel-editbookmodal"
          >
            Cancel
          </button>
          <button class="bg-blue-500 p-2 px-4 rounded text-white" type="submit" id="save">
            Save
          </button>
        </div>
        <div class="my-4 hidden" id="editbook-loader-div">
         <img src="./public/loader.png" class="w-6 h-6 mx-auto" alt="">
         <span>Saving changes</span>
        </div>
      </form>
    </div>
  </div>
</div>`;
  document.querySelector("body").append(div);
  //display modal
  document.getElementById("editbookmodal").classList.remove("hidden");
  //close the modal on 'cancel' button
  div
    .querySelector("#cancel-editbookmodal")
    .addEventListener("click", (event) => {
      event.preventDefault();
      document.getElementById("editbookmodal").classList.add("hidden");
    });
  //close the modal on 'X'
  div
    .querySelector("#close-editbookmodal")
    .addEventListener("click", (event) => {
      event.preventDefault();
      document.getElementById("editbookmodal").classList.add("hidden");
    });
  //get form data on 'save'
  div.querySelector("#save").addEventListener("click", (e) => {
    e.preventDefault();
    div.querySelector("#cancel-save-div").classList.add("hidden");
    div.querySelector("#editbook-loader-div").classList.remove("hidden");
    var formData = Array.from(
      document.querySelectorAll("#editbookform input")
    ).reduce(
      (acc, cv) => ({
        ...acc,
        [cv.name]: cv.value,
      }),
      {}
    );
    fetch(env.BASE_URL + `/${book._id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then(function (data) {
        div.querySelector("#editbookmodal").classList.add("hidden");
        window.location.reload();
      })
      .catch(function (err) {
        div
          .querySelector("#editbook-loader-div")
          .querySelector("span").innerText = err;
        div
          .querySelector("#editbook-loader-div")
          .querySelector("img")
          .classList.add("hidden");
        setInterval(() => {
          window.location.reload();
        }, 1000);
      });
  });
}
