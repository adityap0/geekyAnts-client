export function noBooks() {
  let div = document.createElement("div");
  div.classList.add("my-28", "flex", "flex-col", "mx-auto", "w-2/12");
  div.id = "nobooks";
  let span = document.createElement("span");
  span.classList.add("text-center");
  span.innerText = `"No Books Available"`;
  div.append(span);
  return div;
}
