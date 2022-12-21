import { removeAllChilds } from "../index.js";
import { renderButtons, pageButtons } from "../buttons/buttons.js";

const main = document.querySelector("main");

let nextUrl;
let prevUrl;

// Main de personajes
export async function getAllCharacters(url) {
  let data = await getCharactersData(url);
  prevUrl = data.info.prev;
  nextUrl = data.info.next;
  renderAllCharacters(data);
  renderButtons();
  pageButtons(prevUrl, nextUrl, getAllCharacters);
  expandCard()
}

// Menú superior de personajes
export function allCharactersMenu() {
  const charactersMenu = document.getElementById("characters-menu");

  charactersMenu.addEventListener("click", () => {
    getAllCharacters();
  });
}

// Fetch de todos los personajes
async function getCharactersData(
  url = "https://rickandmortyapi.com/api/character?page=1"
) {
  let datos = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  return datos;
}

// Función para pintar todos los personajes
function renderAllCharacters(data) {
  main.className = "";
  main.classList.add("all-characters-main");

  removeAllChilds(main);

  data.results.forEach((characters) => {
    const article = document.createRange().createContextualFragment(    `
      <article class="all-characters__container" id="${characters.id}">
        <div class="all-characters__image-container">
          <img src="${characters.image}" alt="Imagen de ${characters.name}">
        </div>
        <section class="all-characters__name">
          <h2>${characters.name}</h2>          
        </section>
        <section class="all-characters__info"> 
          <div class="info__wrapper status__wrapper">
            <span>Estado del personaje</span>
              <div class="status">
                <span>${characters.status}</span>
                <img src="${
                    characters.status == "Alive"
                    ? "./src/images/alive.png"
                    : characters.status == "Dead"
                    ? "./src/images/dead.png"
                    : "./src/images/desconocido.png"
                }" alt="Icóno del estado ${characters.status}">
              </div>        
          </div>
          <div class="info__wrapper especie__wrapper">
            <span>Especie del personaje</span
            <span>${characters.species}</span>
          </div>
          <div class="info__wrapper origen__wrapper ">
            <span>Origen del personaje</span>
              <span>${
                characters.origin.name.includes("Earth")
                ? "Earth"
                : characters.location.name
                }
              </span>
          </div>         
        </section>
        </article>
      `
    );
    main.append(article);
  });

  


}

// Expandir tarjetas

function expandCard() {
  const articulo = document.querySelectorAll(".all-characters__container");
  const info = document.getElementsByClassName("all-characters_info");

  articulo.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("expand")
    })
  })
 
}



