import { removeAllChilds } from "../index.js";
import { renderButtons, pageButtons } from "../buttons/buttons.js";

const main = document.querySelector("main");

let prevUrl;
let nextUrl;

// Main de personajes
export async function getAllLocations(url) {
  let data = await getAllLocationsData(url);
  prevUrl = data.info.prev;
  nextUrl = data.info.next;
  renderAllLocations(data);
  renderButtons();
  pageButtons(prevUrl, nextUrl, getAllLocations);
}

// Menú superior de personajes
export function allLocationsMenu() {
  const locationsMenu = document.getElementById("locations-menu");

  locationsMenu.addEventListener("click", () => {
    getAllLocations();
  });
}

// Obtiene todas las localizaciones
export async function getAllLocationsData(
  url = "https://rickandmortyapi.com/api/location"
) {
  let datos = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  return datos;
}

// Pinta todas las localizaciones
export function renderAllLocations(data) {
  main.className = "";
  main.classList.add("all-characters-main");
  removeAllChilds(main);
  data.results.forEach((location) => {
    const article = document.createRange().createContextualFragment(
      `
      <article class="all-characters-container" id="${location.id}" onclick="">
        <div class="all-characters-name">
          <h2>${location.name}</h2>
        </div>
      </article>
      `
    );
    main.append(article);
  });
}
