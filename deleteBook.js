const env = {
  BASE_URL: "https://library-server2.herokuapp.com/api/books",
};

export function deleteBook(book) {
  let div = document.createElement("div");
  div.innerHTML = `<div class="fixed z-10 inset-0 overflow-y-auto" id="deletebookmodal">
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
            h-64
          "
        >
          <div class="flex justify-between border-b border-black">
            <div></div>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              id="close-deletebookmodal"
              class="m-2 cursor-pointer close-deletebookmodal"
            >
              <path
                d="M6.22505 4.81099C6.03645 4.62883 5.78384 4.52803 5.52165 4.53031C5.25945 4.53259 5.00864 4.63776 4.82323 4.82317C4.63782 5.00858 4.53265 5.25939 4.53037 5.52158C4.5281 5.78378 4.62889 6.03638 4.81105 6.22499L10.586 12L4.81005 17.775C4.71454 17.8672 4.63836 17.9776 4.58595 18.0996C4.53354 18.2216 4.50595 18.3528 4.5048 18.4856C4.50364 18.6184 4.52895 18.75 4.57923 18.8729C4.62951 18.9958 4.70376 19.1075 4.79765 19.2014C4.89155 19.2953 5.0032 19.3695 5.12609 19.4198C5.24899 19.4701 5.38067 19.4954 5.51345 19.4942C5.64623 19.4931 5.77745 19.4655 5.89945 19.4131C6.02146 19.3607 6.1318 19.2845 6.22405 19.189L12 13.414L17.775 19.189C17.9637 19.3711 18.2163 19.4719 18.4784 19.4697C18.7406 19.4674 18.9915 19.3622 19.1769 19.1768C19.3623 18.9914 19.4674 18.7406 19.4697 18.4784C19.472 18.2162 19.3712 17.9636 19.189 17.775L13.414 12L19.189 6.22499C19.3712 6.03638 19.472 5.78378 19.4697 5.52158C19.4674 5.25939 19.3623 5.00858 19.1769 4.82317C18.9915 4.63776 18.7406 4.53259 18.4784 4.53031C18.2163 4.52803 17.9637 4.62883 17.775 4.81099L12 10.586L6.22505 4.80999V4.81099Z"
                fill="black"
              />
            </svg>
          </div>
          <svg
            width="50"
            height="50"
            viewBox="0 0 80 80"
            fill="none"
            class="mx-auto mt-5 mb-4"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.375 77.5C3.25 77.5 1.375 74.5 3.25 70.875L36.625 5.24997C38.5 1.62497 41.5 1.62497 43.375 5.24997L76.75 70.875C78.625 74.5 76.75 77.5 72.625 77.5H7.375Z"
              fill="#FFCE31"
            />
            <path
              d="M34.75 29.5001L38.25 52.6251C38.625 54.8751 41.5 54.8751 41.875 52.6251L45.25 29.5001C45.875 20.5001 34.125 20.5001 34.75 29.5001"
              fill="#231F20"
            />
            <path
              d="M40 67.2501C42.8995 67.2501 45.25 64.8996 45.25 62.0001C45.25 59.1006 42.8995 56.7501 40 56.7501C37.1005 56.7501 34.75 59.1006 34.75 62.0001C34.75 64.8996 37.1005 67.2501 40 67.2501Z"
              fill="#231F20"
            />
          </svg>
          <h2>Are you sure you want to delete</h2>
          <h2>"${book.name}" ?</h2>
          <div class="flex align-middle justify-between w-3/12 mx-auto my-4" id="yes-no-btn-div">
            <button class="bg-gray-500 text-white py-1 px-4 rounded" id="no-deletebookmodal">No</button>
            <button class="bg-blue-500 text-white py-1 px-4 rounded" id="yes-deletebookmodal">
              Yes
            </button>
          </div>
          <div class="my-4 hidden" id="deletebook-loader-div">
         <img src="./public/loader.png" class="w-6 h-6 mx-auto" alt="">
         <span>Deleting book</span>
        </div>
        </div>
      </div>
      </div>`;
  document.querySelector("body").append(div);
  //close modal on 'close' click
  div.querySelector("#close-deletebookmodal").addEventListener("click", (e) => {
    div.querySelector("#deletebookmodal").classList.add("hidden");
  });
  //close modal on 'no' button click
  div.querySelector("#no-deletebookmodal").addEventListener("click", (e) => {
    div.querySelector("#deletebookmodal").classList.add("hidden");
  });
  //delete book on 'yes' button click
  div.querySelector("#yes-deletebookmodal").addEventListener("click", () => {
    div.querySelector("#yes-no-btn-div").classList.add("hidden");
    div.querySelector("#deletebook-loader-div").classList.remove("hidden");
    fetch(env.BASE_URL + `/${book._id}`, {
      method: "DELETE",
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then(function (data) {
        div.querySelector("#deletebookmodal").classList.add("hidden");
        window.location.reload();
      })
      .catch(function (err) {
        div
          .querySelector("#deletebook-loader-div")
          .querySelector("span").innerText = err;
        div
          .querySelector("#deletebook-loader-div")
          .querySelector("img")
          .classList.add("hidden");
        console.warn("Something went wrong.", err);
      });
  });
}
