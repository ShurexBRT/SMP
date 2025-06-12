// inventory.js

document.addEventListener("DOMContentLoaded", () => {
  const inventoryList = document.getElementById("inventory-list");
  const ingredientInput = document.getElementById("ingredient");
  const addBtn = document.getElementById("add-ingredient");

  function loadInventory() {
    const data = JSON.parse(localStorage.getItem("inventory")) || [];
    inventoryList.innerHTML = "";
    data.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${item}
        <button class="remove-btn" data-index="${index}">🗑️</button>
      `;
      inventoryList.appendChild(li);
    });
  }

  function saveInventory(items) {
    localStorage.setItem("inventory", JSON.stringify(items));
  }

  addBtn.addEventListener("click", () => {
    const val = ingredientInput.value.trim();
    if (!val) return;
    const data = JSON.parse(localStorage.getItem("inventory")) || [];
    data.push(val);
    saveInventory(data);
    ingredientInput.value = "";
    loadInventory();
  });

  inventoryList.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const idx = e.target.dataset.index;
      const data = JSON.parse(localStorage.getItem("inventory")) || [];
      data.splice(idx, 1);
      saveInventory(data);
      loadInventory();
    }
  });

  loadInventory();
  
  document.getElementById("clear-inventory").addEventListener("click", function () {
  if (confirm("Da li si siguran da želiš da isprazniš frižider?")) {
    localStorage.removeItem("inventory");
    location.reload();
  }
});

});
