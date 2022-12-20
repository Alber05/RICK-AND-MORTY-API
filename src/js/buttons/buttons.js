import {removeAllChilds } from "../index.js";



// Renderiza los botones
export function renderButtons() {
  removeAllChilds(footer);
  const buttons = document.createRange().createContextualFragment(
    `
      <button id="backward"><img src="./src/images/backward.svg" alt=""></button>
      <button id="forward"><img src="./src/images/forward.svg" alt=""></button>
    `
  );
  footer.append(buttons);
}


// Botones de paginación
export function pageButtons(prevUrl, nextUrl, func) {
  const backward = document.getElementById("backward");
  const forward = document.getElementById("forward");
  backward.addEventListener("click", () => {
    prevUrl ? func(prevUrl) : "";
  });

  forward.addEventListener("click", () => {
    nextUrl ? func(nextUrl) : "";
  });
}

