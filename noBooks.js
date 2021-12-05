export function noBooks() {
  let div = document.createElement("div");
  div.classList.add("my-28", "flex", "flex-col", "mx-auto", "w-2/12");
  div.id = "nobooks";
  let button = document.createElement("button");
  button.classList.add(
    "py-2",
    "px-4",
    "bg-blue-500",
    "text-white",
    "cursor-pointer",
    "rounded",
    "w-6/12",
    "mx-auto",
    "my-4"
  );
  button.innerText = "Add Book";
  let span = document.createElement("span");
  span.classList.add("text-center");
  span.innerText = `"No Books Available"`;
  div.append(span, button);
  return div;
}
