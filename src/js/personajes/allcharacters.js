import { removeAllChilds } from "../index.js";
import { renderButtons, pageButtons } from "../buttons/buttons.js";


const main = document.querySelector("main");
const browser = document.getElementById("browser");

let nextUrl;
let prevUrl;

// Main de personajes
export async function getAllCharacters(url) {
  let data = await getCharactersData(url);
  prevUrl = data.info.prev;
  nextUrl = data.info.next;

  renderAllCharacters(data.results);
  renderButtons();
  pageButtons(prevUrl, nextUrl, getAllCharacters);
  filterCharacters(data);
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
async function getCharactersData(url = "https://rickandmortyapi.com/api/character?page=1") {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
}

// Función para pintar todos los personajes
function renderAllCharacters(data) {


  removeAllChilds(main);

  data.forEach((characters) => {
    const article = document.createRange().createContextualFragment(`
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
          <button class="info__wrapper more-info">More Info</button>         
        </section>
        </article>
      `);
    main.append(article);
  });
}

// Expandir tarjetas

export function expandCard() {
  const tarjetas = document.querySelectorAll(".all-characters__container");

  tarjetas.forEach((tarjeta) => {
    const info = tarjeta.querySelector(".all-characters__info");

    tarjeta.addEventListener("click", () => {
      info.classList.toggle("visible");
      tarjeta.classList.toggle("expand");
    });
  });
}

function filterCharacters(data) {
  browser.addEventListener("input", (e) => {
    const filteredCharacters = data.results.filter((character) =>
      character.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    renderAllCharacters(filteredCharacters);
    expandCard()
  });
}
