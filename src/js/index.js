import { getAllCharacters, allCharactersMenu} from "./personajes/allcharacters.js";
import { allLocationsMenu } from "./locations/allLocations.js";
import { renderButtons,  } from "./buttons/buttons.js";



getAllCharacters();

allCharactersMenu();

allLocationsMenu();







/* ELIMINAR HIJOS */
export function removeAllChilds(main) {
  while (main.hasChildNodes()) main.removeChild(main.firstChild);
}
