import { removeAllChilds} from "../index.js";

const main = document.querySelector("main");

const characterMenu = document.getElementById("character-menu");
const locationMenu = document.getElementById("location-menu");




export async function getDataCharacters(url = "https://rickandmortyapi.com/api/character?page=1") {

let datos = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data
    })
    
  return datos

};




export async function renderAllCharacters(data){
  
  main.className = "";
  main.classList.add("all-characters-main");

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
                        ? "./src/images/alive.png"
                        : characters.status == "Dead"
                        ? "./src/images/dead.png"
                        : "./src/images/desconocido.png"
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
  })


}

export function renderButtons(){
  const backward = document.getElementById("backward")
  const forward = document.getElementById("forward")

  const buttons = document.createRange().createContextualFragment(
            `
          <button id="backward"><img src="./src/images/backward.svg" alt=""></button>
          <button id="forward"><img src="./src/images/forward.svg" alt=""></button>
          `
          );
          footer.append(buttons);    
}


// export function getAllCharacters(url = "https://rickandmortyapi.com/api/character?page=1") {
//   main.className = "";
//   main.classList.add("all-characters-main");


//       removeAllChilds(main);
//       removeAllChilds(footer);

//       data.results.forEach((characters) => {
//         const article = document.createRange().createContextualFragment(
//           `
//       <article class="all-characters-container" id="${
//         characters.id
//       }" onclick="">
//         <div class="image-container">
//           <img src="${characters.image}" alt="Imagen de ${characters.name}">
//         </div>
//         <section class="all-characters-name">
//           <h2>${characters.name}</h2>          
//         </section>
//         <section class="all-characters-info"> 
//           <div class="status-info">
//             <span>Estado del personaje</span>
//             <div class="status">
//               <span>${characters.status}</span>
//               <img src="${
//                 characters.status == "Alive"
//                   ? "./src/images/alive.png"
//                   : characters.status == "Dead"
//                   ? "./src/images/dead.png"
//                   : "./src/images/desconocido.png"
//               }" alt="Icóno del estado ${characters.status}">
//             </div>        
//           </div>
//           <div class="especie">
//             <span>Especie del personaje</span
//             <span>${characters.species}</span>
//           </div>
//           <div class="origen">
//             <span>Origen del personaje</span>
//             <span>${
//               characters.origin.name.includes("Earth")
//                 ? "Earth"
//                 : characters.location.name
//             }</span>
//           </div>         
//         </section>
//       </article>
//       `
//         );
//         main.append(article);
//       });

//       const buttons = document.createRange().createContextualFragment(
//         `
//       <button id="backward" onclick= "prevUrl ? getAllCharacters(prevUrl) : ''"><img src="./src/images/backward.svg" alt=""></button>
//       <button id="forward" onclick= "nextUrl ? getAllCharacters(nextUrl) : ''"><img src="./src/images/forward.svg" alt=""></button>
//       `
//       );
//       footer.append(buttons);
//     });
// }