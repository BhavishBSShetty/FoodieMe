const navMenu = document.getElementById("nav-menu");
const toggleMenu = document.getElementById("nav-toggle");
const closeMenu = document.getElementById("nav-close");

toggleMenu.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

closeMenu.addEventListener("click", () => {
  navMenu.classList.remove("show");
});

document.addEventListener("mousemove", move);

function move(e) {
  this.querySelectorAll(".move").forEach((layer) => {
    const speed = layer.getAttribute("data-speed");

    const x = (window.innerWidth - e.pageX * speed) / 120;
    const y = (window.innerHeight - e.pageY * speed) / 120;

    layer.style.transform = `translateX(${x}px) translateY(${y}px) `;
  });
}

gsap.from(".nav_logo, .nav_toggle", {
  opacity: 0,
  duration: 1,
  delay: 2,
  y: 10,
});
gsap.from(".nav_item", {
  opacity: 0,
  duration: 1,
  delay: 2.1,
  y: 30,
  stagger: 0.2,
});

gsap.from(".home_title", {
  opacity: 0,
  duration: 1,
  delay: 1.6,
  y: 30,
});
gsap.from(".home_description", { opacity: 0, duration: 1, delay: 1.8, y: 30 });
gsap.from(".home_button", { opacity: 0, duration: 1, delay: 2.1, y: 30 });
gsap.from(".home_img", { opacity: 0, duration: 1, delay: 1.3, y: 30 });

const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search_result");
const container = document.querySelector(".container_recipe");
const searchButton = document.getElementById("search_button");
let searchQuery = "";
const APP_ID = "2a9cace3";
const APP_KEY = "74efed78be6e4664e0ed971d156e7a2c";

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI(searchQuery);
});
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  searchQuery = searchForm.querySelector("input").value;
  fetchAPI(searchQuery);
});

async function fetchAPI(item) {
  const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${item}&app_id=${APP_ID}&app_key=${APP_KEY}`;
  const response = await fetch(baseURL);
  const data = await response.json();
  console.log(data.hits);
  generateHTML(data.hits);
}

function generateHTML(results) {
  container.classList.remove("initial");
  let generatedHTML = "";
  console.log(results);
  results.map((result) => {
    generatedHTML += `
    <div class="card">
        <div class="card-image-container">
            <img src="${
              result.recipe.image
            }" alt="" class="card-image" onerror="this.src='./images/noimg.jpeg'" >
        </div>

        <div class="card-info-container">
            <h1 class="card-info-heading">${result.recipe.label}</h1>
            <br/>
            

            <div class="card-stats-container">
                <div class="card-stats">
                    <h1 class="stats-heading">
                        Calories
                    </h1>
                    <p class="stats-para">
                    ${result.recipe.calories.toFixed(0)}
                    </p>
                </div>
                <div class="card-stats">
                    <h1 class="stats-heading">
                        Fats
                    </h1>
                    <p class="stats-para">
                    ${result.recipe.digest[0].total.toFixed(0)}
                    </p>
                </div>
                <div class="card-stats">
                    <h1 class="stats-heading">
                        Carbs
                    </h1>
                    <p class="stats-para">
                    ${result.recipe.digest[1].total.toFixed(0)}
                    </p>
                </div>

                <div class="card-stats">
                    <h1 class="stats-heading">
                        Protien
                    </h1>
                    <p class="stats-para">
                    ${result.recipe.digest[2].total.toFixed(0)}
                    </p>
                </div>

                
            </div>
            <br/>
            <button class="btn">
            <a href="${
              result.recipe.url
            }" target="_blank" class="">View recipe</a>
                
                </button>
        </div>

    </div>`;
  });
  searchResultDiv.innerHTML = generatedHTML;
}
