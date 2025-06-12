document.addEventListener("DOMContentLoaded", () => {
  const shoppingListEl = document.getElementById("shopping-list");
  const recipesURL = "recipes.json";

  const mealPlan = JSON.parse(localStorage.getItem("mealPlan")) || {};
  let allIngredients = [];

  fetch(recipesURL)
    .then(res => res.json())
    .then(recipes => {
      Object.values(mealPlan).forEach(recipeName => {
        const recipe = recipes.find(r => r.name === recipeName);
        if (recipe) {
          allIngredients = allIngredients.concat(recipe.ingredients);
        }
      });

      const uniqueIngredients = [...new Set(allIngredients)].sort();
      renderShoppingList(uniqueIngredients);
    })
    .catch(err => {
      console.error("Greška pri učitavanju recepata:", err);
      shoppingListEl.innerHTML = "<li>Greška pri učitavanju podataka.</li>";
    });

  function renderShoppingList(items) {
    shoppingListEl.innerHTML = "";

    if (items.length === 0) {
      shoppingListEl.innerHTML = "<li>Nema sastojaka za prikaz.</li>";
      return;
    }

    items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      shoppingListEl.appendChild(li);
    });
  }
});
