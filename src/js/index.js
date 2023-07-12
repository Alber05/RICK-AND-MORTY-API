import {
  getAllCharacters,
} from "./personajes/allcharacters.js";

getAllCharacters();


expandCard();

/* ELIMINAR HIJOS */
export function removeAllChilds(main) {
  while (main.hasChildNodes()) main.removeChild(main.firstChild);
}


