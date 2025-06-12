document.addEventListener("DOMContentLoaded", () => {
  const days = ["Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota", "Nedelja"];
  const meals = ["Doručak", "Ručak", "Večera"];
  const goalSelect = document.getElementById("goal-select");
  const planContainer = document.getElementById("meal-plan");

  const recipesURL = "SMP/data/recipes.json";
  let recipes = [];
  let goal = localStorage.getItem("goal") || "gubitak";

  goalSelect.value = goal;

  goalSelect.addEventListener("change", () => {
    goal = goalSelect.value;
    localStorage.setItem("goal", goal);
    renderMealPlanner();
  });

  function renderMealPlanner() {
    planContainer.innerHTML = "";
    const plan = JSON.parse(localStorage.getItem("mealPlan")) || {};

    days.forEach(day => {
      const dayDiv = document.createElement("div");
      dayDiv.classList.add("day-column");
      const title = document.createElement("h3");
      title.textContent = day;
      dayDiv.appendChild(title);

      meals.forEach(meal => {
        const label = document.createElement("label");
        label.textContent = `${meal}: `;

        const select = document.createElement("select");
        select.innerHTML = `<option value="">--Izaberi recept--</option>`;

        const relevantRecipes = recipes.filter(r =>
          r.goal === goal && r.meal === meal
        );

        relevantRecipes.forEach(r => {
          const option = document.createElement("option");
          option.value = r.name;
          option.textContent = r.name;
          select.appendChild(option);
        });

        const key = `${day}-${meal}`;
        select.value = plan[key] || "";

        select.addEventListener("change", () => {
          plan[key] = select.value;
          localStorage.setItem("mealPlan", JSON.stringify(plan));
        });

        label.appendChild(select);
        dayDiv.appendChild(label);
      });

      planContainer.appendChild(dayDiv);
    });
  }

  fetch(recipesURL)
    .then(res => res.json())
    .then(data => {
      recipes = data;
      renderMealPlanner();
    });
});
