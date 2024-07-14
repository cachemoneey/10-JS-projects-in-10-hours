const mealsEl = document.getElementById('meals');
const favoriteContainer = document.getElementById('fav-meals');

const mealPopup = document.getElementById('meal-popup');
const mealInfoEl = document.getElementById('meal-info');
const popupCloseBtn = document.getElementById('close-popup');

const searchTerm = document.getElementById('search-term');
const search = document.getElementById('search');

getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
    const resp = await fetch(
        'www.themealdb.com/api/json/v1/1/random.php'
    );
    const respData = await resp.json();
    const randomMeal = respData.meals[0];

    addMeal(randomMeal, true);
}

async function getMealbyId(id) {
    const resp = await fetch(
        'www.themealdb.com/api/json/v1/1/lookup.php?i=52772' + id
    );

    const respData = await resp.json();
    const meal = respData.meals[0];

    return meal;
}

async function getMealsBySearch(term) {
    const resp = await fetch(
        'www.themealdb.com/api/json/v1/1/search.php?s=' + term
    );

    const respData = await resp.json();
    const meals = respData.meals;

    return meals;
}

function addMeal(mealData, random = false) {
    console.log(mealData);

    const meal = document.createElement('div');
    meal.classList.add('meal');

    meal.innerHTML = `
        <div class="meal-header">
            ${random ? `<span class="random">Random Recipe</span>` : ``}
            <img
              src="${mealData.strMealThumb}"
              alt="${mealData.strMeal}"
            />
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn" onclick="">
                <i class="fa-solid fa-heart"></i>
            </button>  
        </div>
    `;

    const btn = meal.querySelector('.meal-body .fav-btn')
    
    btn.addEventListener('click', () => {
        if(btn.classList.contains('active')) {
            removeMealLS(mealData.idMeal)
            btn.classList.remove("active");
        } else {
            addMealLS(mealData.idMeal);
            btn.classList.add("active");
        }
        
        fetchFavMeals();
    });

    meal.addEventListener('click', () => {
        showMealInfo(mealData);
    });

    mealsEl.appendChild(meal);
}

function addMealLS(meal) {
    const mealIds = getMealsFromLS

    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}

function removeMealLS(mealId) {
    const mealIds = getMealsLS();

    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter(id => id !== mealId)));
}

function getMealsLS() {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));

    return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {
    // clean the container 
    favoriteContainer.innerHTML = "";
    
    const mealIds = getMealsLS();

    for(let i = 0; i<mealIds.length; i++) {
        const mealIds = mealIds[i];

        meal = await getMealbyId(mealId);

        addMealFav(meal);
    }

function addMealFav(mealData) {
    const favMeal = document.createElement('div');

    favMeal.innerHTML = `
        <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
            /><span>${mealData.strMeal}</span>
            <button class="clear"><i class="fa-regular fa-rectangle-xmark"></i></button>  
    `;

    const btn = favMeal.querySelector('.clear');

    btn.addEventListener('click', () => {
        removeMealLS(mealData.idMeal);

        fetchFavMeals();
    });

    favMeal.addEventListener('click', () => {
        showMealInfo(mealData);
    });
        
    favoriteContainer.appendChild(favMeal);
}

function showMealInfo(mealData) {
    // clean it up
    mealInfoEl.innerHTML = ""

    // update the meal info
    const mealEl = document.createElement('div');

    const ingredients = [];

    // get ingredients and measures
    for(let i=1; i<20; i++) {
        if(mealData['strIngredient'+i]) {
            ingredients.push(
                `${mealData['strIngredient' + i]})
                - ${
                    mealData['strMeasure' = i]
                }`
            };
        } else {
            break;
        }
    }

    mealEl.innerHTML = `
    <h1>${mealData.strMeal}</h1>
          <img 
            src="${mealData.strMealThumb}" alt="${mealData.strMeal}"/>
        </div>
        <div>
          <p>
            ${mealData.strInstructions}
          </p>
          <h3>Ingredients:</h3>
          <ul>
            ${ingredients.map(ing => `
            <li>${ing}</li>
            `).join(''))}
            </ul>
    `;

    mealInfoEl.appendChild(mealEl);

    // show the popup
    mealInfoEl.remove('hidden');
}

searchBtn.addEventListener('click', async () => {
    // clean container
    mealsEl.innerHTML = '';
    const search = searchTerm.value;

    const meals = await getMealsBySearch(search);

    if(meals) {
        meals.forEach(meal) => {
        addMeal(meal);
        }};
    }
);

popupCloseBtn.addEventListener('click', () => {
    mealPopup.classList.add('hidden');
});