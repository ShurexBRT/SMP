document.addEventListener("DOMContentLoaded", () => {
  const recipeContainer = document.getElementById("recipe-container");
  const categoryFilter = document.getElementById("category-filter");
  const goal = localStorage.getItem("goal") || "gubitak"; // default ako nema

  function loadRecipes() {
    fetch("data/recipes.json")
      .then((response) => response.json())
      .then((recipes) => {
        const selectedCategory = categoryFilter.value;
        displayRecipes(recipes, selectedCategory);
      })
      .catch((error) => {
        console.error("Greška prilikom učitavanja recepata:", error);
      });
  }

  function displayRecipes(recipes, category) {
    recipeContainer.innerHTML = "";

    const filtered = recipes.filter(
      (r) => r.category === category && r.goal === goal
    );

    if (filtered.length === 0) {
      recipeContainer.innerHTML = "<p>Nema recepata za izabranu kategoriju.</p>";
      return;
    }

    filtered.forEach((recipe) => {
      const card = document.createElement("div");
      card.classList.add("recipe-card");

      card.innerHTML = `
        <h3>${recipe.name}</h3>
        <p><strong>Opis:</strong> ${recipe.description}</p>
        <p><strong>Sastojci:</strong> ${recipe.ingredients.join(", ")}</p>
        <p><strong>Nutritivne vrednosti:</strong><br>
        Kalorije: ${recipe.nutrition.calories} kcal, 
        Proteini: ${recipe.nutrition.protein}g, 
        Ugljeni hidrati: ${recipe.nutrition.carbs}g, 
        Masti: ${recipe.nutrition.fat}g</p>
      `;

      recipeContainer.appendChild(card);
    });
  }

  categoryFilter.addEventListener("change", loadRecipes);

  loadRecipes(); // učitavanje pri pokretanju
});
