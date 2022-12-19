
export const main = document.querySelector("main");
export const footer = document.getElementById("footer");
export const characterMenu = document.getElementById("character-menu");
export const locationMenu = document.getElementById("location-menu");
let nextUrl;
let prevUrl;


personajes.getAllCharacters()

/* MENU PERSONAJES */
characterMenu.addEventListener("click", () => {
  getAllCharacters();
});

/* MENU LOCALIZACIONES */
locationMenu.addEventListener("click", () => {
  getAllLocations();
});



/* Obtener todos los personajes */
function getAllCharacters(
  url = "https://rickandmortyapi.com/api/character?page=1"
) {
  main.className = "";
  main.classList.add("all-characters-main");

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      nextUrl = data.info.next;
      prevUrl = data.info.prev;
      console.log(data)
      removeAllChilds(main);
      removeAllChilds(footer);

      data.results.forEach((characters) => {
        const article = document.createRange().createContextualFragment(
          `
      <article class="all-characters-container" id="${
        characters.id
      }" onclick="">
        <div class="image-container">
          <img src="${characters.image}" alt="Imagen de ${characters.name}">
        </div>
        <section class="all-characters-name">
          <h2>${characters.name}</h2>          
        </section>
        <section class="all-characters-info"> 
          <div class="status-info">
            <span>Estado del personaje</span>
            <div class="status">
              <span>${characters.status}</span>
              <img src="${
                characters.status == "Alive"
                  ? "images/alive.png"
                  : characters.status == "Dead"
                  ? "images/dead.png"
                  : "images/desconocido.png"
              }" alt="Icóno del estado ${characters.status}">
            </div>        
          </div>
          <div class="especie">
            <span>Especie del personaje</span
            <span>${characters.species}</span>
          </div>
          <div class="origen">
            <span>Origen del personaje</span>
            <span>${
              characters.origin.name.includes("Earth")
                ? "Earth"
                : characters.location.name
            }</span>
          </div>         
        </section>
      </article>
      `
        );
        main.append(article);
      });

      const buttons = document.createRange().createContextualFragment(
        `
      <button id="backward" onclick= "prevUrl ? getAllCharacters(prevUrl) : ''"><img src="images/backward.svg" alt=""></button>
      <button id="forward" onclick= "nextUrl ? getAllCharacters(nextUrl) : ''"><img src="images/forward.svg" alt=""></button>
    `
      );
      footer.append(buttons);
      
    });
}




/* OBTENER TODAS LOCALIZACIONES */

function getAllLocations(url = "https://rickandmortyapi.com/api/location") {
  main.className = "";
  main.classList.add("all-characters-main");
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      nextUrl = data.info.next;
      prevUrl = data.info.prev;

      removeAllChilds(main);
      removeAllChilds(footer);

      data.results.forEach((location) => {
        const article = document.createRange().createContextualFragment(
          `
    <article class="all-characters-container" id="${location.id}" onclick="">
      <div class="all-characters-name">
        <h2>${location.name}</h2>
        <span>${location.type}</span>
        <span>${location.dimenson}</span>
      </div>
    </article>
    `
        );
        main.append(article);
      });

      const buttons = document.createRange().createContextualFragment(
        `
    <button id="backward" onclick= "prevUrl ? getAllLocations(prevUrl) : ''"><img src="images/backward.svg" alt=""></button>
    <button id="forward" onclick= "nextUrl ? getAllLocations(nextUrl) : ''"><img src="images/forward.svg" alt=""></button>
  `
      );
      footer.append(buttons);
    });
}



/* ELIMINAR HIJOS */
function removeAllChilds(main) {
  while (main.hasChildNodes()) main.removeChild(main.firstChild);
}
