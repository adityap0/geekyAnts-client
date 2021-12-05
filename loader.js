export function loader() {
  let div = document.createElement("div");
  div.innerHTML = `<div class="fixed z-10 inset-0 overflow-y-auto" id="loader">
  <div class="text-center">
    <div class="fixed inset-0 bg-gray-300 bg-opacity-75"></div>
    <div
      class="
            my-80
            transform
            transition-all
            flex
            flex-col
          "
    >
     <img src="./public/loader.png" class="w-8 h-8 mx-auto" alt="">
    <span>Fetching books</span>
    </div>
  </div>
</div>`;
  return div;
}
