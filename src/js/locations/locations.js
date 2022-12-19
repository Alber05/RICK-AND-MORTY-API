import {removeAllChilds} from '../index.js'

const main = document.querySelector("main");
const footer = document.getElementById("footer");
const characterMenu = document.getElementById("character-menu");
const locationMenu = document.getElementById("location-menu");

export function getAllLocations(url = "https://rickandmortyapi.com/api/location") {
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