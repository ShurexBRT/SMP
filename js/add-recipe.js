document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("add-recipe-form");
  const ingredientsContainer = document.getElementById("ingredients-container");
  const addIngredientBtn = document.getElementById("add-ingredient");

  // Dodavanje novog polja za sastojak
  addIngredientBtn.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.name = "ingredient";
    input.placeholder = "Sastojak";
    input.required = true;
    ingredientsContainer.appendChild(input);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("recipe-name").value.trim();
    const category = document.getElementById("recipe-category").value;
    const meal = document.getElementById("recipe-meal").value;
    const goal = document.getElementById("recipe-goal").value;
    const description = document.getElementById("recipe-description").value.trim();

    const ingredients = Array.from(document.querySelectorAll("input[name='ingredient']"))
      .map(input => input.value.trim())
      .filter(val => val !== "");

    const nutrition = {
      calories: parseInt(document.getElementById("calories").value),
      protein: parseFloat(document.getElementById("protein").value),
      carbs: parseFloat(document.getElementById("carbs").value),
      fat: parseFloat(document.getElementById("fat").value),
    };

    const newRecipe = {
      name,
      category,
      meal,
      goal,
      description,
      ingredients,
      nutrition,
    };

    const customRecipes = JSON.parse(localStorage.getItem("customRecipes")) || [];
    customRecipes.push(newRecipe);
    localStorage.setItem("customRecipes", JSON.stringify(customRecipes));

    alert("Recept uspešno dodat!");
    form.reset();
    ingredientsContainer.innerHTML = ""; // Reset polja za sastojke
  });
});
