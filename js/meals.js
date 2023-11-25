const loadMeals = (searchText) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMeals(data.meals));


}

const displayMeals = (meals) => {
    // console.log(meals);
    //Step 1: create melas Containter. 
    const mealsContainer = document.getElementById('meals-container');
    mealsContainer.innerHTML = ' ';

    meals.forEach(meal => {
        // console.log(meal);
        //Step 2: Create Chile For Each Element.
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');

        //Step 3: set content of the child
        mealDiv.innerHTML = `
        <div class="card h-100">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <!-- Button trigger modal -->
      <button onclick="loadMealDetails(${meal.idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mealDetails">
      Details
      </button>
        </div>
      </div>
        `;
        mealsContainer.appendChild(mealDiv);
    })

}


const searchMeal = () => {
    const searchText = document.getElementById('search-field').value;
    loadMeals(searchText);
    searchText = '';
}

const loadMealDetails = idMeal =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMealsDetails(data.meals[0]));
    // console.log(idMeal);
}

const displayMealsDetails = meal => {
    console.log(meal);
    document.getElementById('mealDetailsLabel').innerText = meal.strMeal;
    const mealsDetailsBody = document.getElementById('mealsDetailsBody');
    mealsDetailsBody.innerHTML =`
    <img class="img-fluid" src="${meal.strMealThumb}" alt="...">
    <p class="text-start"> ${meal.strInstructions} </p>
    `
}

loadMeals('a');
