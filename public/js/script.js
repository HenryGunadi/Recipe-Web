// API LINKS
const links = [
  "https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata",
  "https://www.themealdb.com/api/json/v1/1/search.php?f=a",
  "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772",
  "https://www.themealdb.com/api/json/v1/1/random.php",
  "https://www.themealdb.com/api/json/v1/1/categories.php",
  "https://www.themealdb.com/api/json/v1/1/list.php?c=list",
  "https://www.themealdb.com/api/json/v1/1/list.php?a=list",
  "https://www.themealdb.com/api/json/v1/1/list.php?i=list",
  "https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast",
  "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood",
  "https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian",
];

const fetchAPIS = (linkList) => {
  linkList.forEach(async (link) => {
    try {
      const response = await fetch(link);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      const form = document.querySelector("#form");
    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
    }
  });
};

fetchAPIS(links);

// Meal categories
const categoryLink = "https://www.themealdb.com/api/json/v1/1/categories.php";

const arrayCategories = [];

const fetchCategory = async (link) => {
  try {
    const response = await fetch(link);

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();

    const array = data.categories;

    array.forEach((index) => {
      arrayCategories.push(index.strCategory);
    });
  } catch (error) {
    console.error(`Fecth failed with error: ${error.message}`);
  }
};

fetchCategory(categoryLink);
console.log(arrayCategories);

// Default Main Display
const foodByCategories = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken"; // food bt categories
const foodByName = "https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata"; // food by name

const main = document.querySelector("#grid"); //grid
const body = document.querySelector(".body"); //body
const mainSection = document.querySelector(".main-section"); //main-section
const mainContainer = document.querySelector("#mainContainer"); // main-container

const defaultPage = async (img, foodName, idMeal) => {
  const mealIdLink = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;

  const createDiv = document.createElement("div");
  createDiv.classList.add("w-full", "rounded-xl", "p-5", "outline", "outline-1", "mt-5", "hover:cursor-pointer", "hover:scale-105", "duration-200", "card");
  createDiv.innerHTML = `<img src="${img}" class="cover rounded-xl">
  <h3 class="text-center pt-2 text-lg">${foodName}</h3>
  `;

  main.appendChild(createDiv);

  try {
    const response = await fetch(mealIdLink);

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Meal details", data);
    const instructions = data.meals[0].strInstructions;
    const youtubeLink = data.meals[0].strYoutube;

    // console.log(`${instructions}\n${youtubeLink}`);
    const listIngredients = [];
    const meausure = [];
    const arrayObject = Object.keys(data.meals[0]);

    arrayObject.forEach((content) => {
      if (content.startsWith("strIngredient")) {
        listIngredients.push(content);
      } else if (content.startsWith("strMeasure")) {
        meausure.push(content);
      }
    });

    let rawIngredients = []; // MEAL INGREDIENTS
    let rawMeasure = []; // MEAL MEASURE

    listIngredients.forEach((element) => {
      rawIngredients.push(data.meals[0][element]);
    });

    meausure.forEach((element) => {
      rawMeasure.push(data.meals[0][element]);
    });

    // filtering ingredients and measure array
    rawIngredients = rawIngredients.filter((ingredient) => ingredient !== null && ingredient !== undefined && ingredient.trim() !== "");

    rawMeasure = rawMeasure.filter((measure) => measure !== null && measure !== undefined && measure.trim() !== "");

    console.log("Meal Ingredients : ", rawIngredients);
    console.log("Meal Measure : ", rawMeasure);

    const rawIngredientsText = document.createElement("p");
    const rawMeasureText = document.createElement("p");

    rawIngredients.forEach((content) => {
      rawIngredientsText.innerHTML += `${content}, `;
    });

    rawMeasure.forEach((content) => {
      rawMeasureText.innerHTML += `${content}, `;
    });

    // console.log("LIST INGREDIENTS : ", listIngredients);

    // ADD EVENT LISTENERS
    createDiv.addEventListener("click", () => {
      const displayRecipeContainer = document.createElement("div");
      displayRecipeContainer.classList.add("z-40", "w-1/2-screen", "h-90vh", "card", "fixed", "block", "top-1/2", "left-1/2", "transform", "-translate-x-1/2", "-translate-y-1/2");

      const displayRecipe = document.createElement("div");
      displayRecipe.classList.add("flex", "flex-col", "justify-center", "items-center", "w-full", "bg-white", "outline", "outline-1", "rounded-xl", "p-5", "h-full");

      displayRecipe.innerHTML += `
      <div class="overflow-y-scroll overflow-x-hidden">
        <div class="w-full flex justify-end close-button">
          <img src="img/x.svg" class="transform hover:scale-125 duration-100">
        </div>

        <div class="w-full flex justify-center">
          <img src="${img}" class="cover rounded-xl w-1/2 pb-2">
        </div>
        
        <h5 class="text-center font-semibold">${foodName}</h5>

        <p>${instructions}</p>
        <p class="font-semibold">Ingredients: </p>
        <p>${rawIngredientsText.textContent}</p>
        <p class="font-semibold">Measures: </p>
        <p>${rawMeasureText.textContent} </p>

        <div class= "w-full flex justify-center">
            <a href="${youtubeLink}" target="_blank" class="text-blue-500 underline underline-offset-2 py-2">Video Tutorial</a>
        </div>
      </div>
      `;

      const closeButton = displayRecipe.querySelector(".close-button");

      displayRecipeContainer.appendChild(displayRecipe);
      document.body.appendChild(displayRecipeContainer);
      mainSection.classList.add("blur-sm", "pointer-events-none"); // Blur effect

      closeButton.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("Close button clicked");

        displayRecipeContainer.remove();

        mainSection.classList.remove("blur-sm", "pointer-events-none");
      });
    });
  } catch (error) {
    console.error(`Fetch failed with error: ${error.message}`);
  }
};

// CLOSE BUTTON EVENT LISTENER

const fetchMain = async (link) => {
  try {
    const response = await fetch(link);

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log("This is fetchMain", data);
    data.meals.forEach((index) => {
      let imgSrc = index.strMealThumb;
      let title = index.strMeal;
      let idMeal = index.idMeal;

      defaultPage(imgSrc, title, idMeal);
    });
  } catch (error) {
    console.error(`Fetch failed with error: ${error.message}`);
  }
};

fetchMain(foodByCategories);

// Search Bar
const title = document.querySelector("#title");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  main.innerHTML = "";

  const searchBar = document.querySelector("#search-bar");
  let name = searchBar.value;
  let searchMealByName = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;

  title.textContent = name.toUpperCase();

  const displayMealByName = async (link) => {
    try {
      const response = await fetch(link);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log("THIS IS THE DATA", data);

      data.meals.forEach((index) => {
        let foodImg = index.strMealThumb;
        let foodDesc = index.strMeal;
        let idMeal = index.idMeal;

        defaultPage(foodImg, foodDesc, idMeal);
      });
    } catch (error) {
      console.error(`Fetch error with error: ${error.message}`);
    }
  };

  displayMealByName(searchMealByName);
  searchBar.value = "";
});
