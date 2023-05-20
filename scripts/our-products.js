// Function to handle adding a plant to the basket
function addToBasket() {
  const plantNameSelect = document.getElementById("plant-name");
  const quantityInput = document.getElementById("quantity");
  const stock = getStock(plantNameSelect.value);
  const quantity = parseInt(quantityInput.value);

  if (quantity > stock) {
    alert("The selected quantity exceeds the available stock.");
    return;
  }

  const basketItemsContainer = document.getElementById("basket-items");

  const existingItem = Array.from(basketItemsContainer.children).find(
    (item) => item.dataset.plantName === plantNameSelect.value
  );

  if (existingItem) {
    const existingQuantity = parseInt(existingItem.dataset.quantity);
    const newQuantity = existingQuantity + quantity;
    existingItem.dataset.quantity = newQuantity;
    existingItem.querySelector(".basket-item-quantity").textContent =
      newQuantity;
  } else {
    const basketItem = document.createElement("div");
    basketItem.className = "basket-item";
    basketItem.dataset.plantName = plantNameSelect.value;
    basketItem.dataset.quantity = quantity;

    const itemName = document.createElement("span");
    itemName.className = "basket-item-name";
    itemName.textContent = plantNameSelect.value;
    basketItem.appendChild(itemName);

    const itemQuantity = document.createElement("span");
    itemQuantity.className = "basket-item-quantity";
    itemQuantity.textContent = quantity;
    basketItem.appendChild(itemQuantity);

    basketItemsContainer.appendChild(basketItem);
  }

  updateStock(plantNameSelect.value, quantity);
  calculateTotalPrice();

  // Store the basket in localStorage
  storeBasketInLocalStorage();
}

// Function to calculate the total price
function calculateTotalPrice() {
  const basketItemsContainer = document.getElementById("basket-items");
  const basketItems = Array.from(basketItemsContainer.children);

  let totalPrice = 0;

  basketItems.forEach((item) => {
    const plantName = item.dataset.plantName;
    const quantity = parseInt(item.dataset.quantity);
    const plantPrice = getPlantPrice(plantName);
    const itemPrice = quantity * plantPrice;
    totalPrice += itemPrice;
  });

  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.textContent = `$${totalPrice}`;

  // Store the total price in localStorage
  localStorage.setItem("totalPrice", totalPrice);
}

// Function to get the price of a plant
function getPlantPrice(plantName) {
  // Define the prices for each plant (replace with actual prices if available)
  const plantPrices = {
    Succulent: 10,
    "Fiddle Leaf Fig": 50,
    "Snake Plant": 15,
    Monstera: 30,
    "Peace Lily": 25,
    "Spider Plant": 12,
    "Aloe Vera": 18,
    Pothos: 20,
    "Rubber Tree": 60,
    "English Ivy": 13,
  };

  return plantPrices[plantName] || 0; // Return 0 if the plant price is not found
}

function getStock(plantName) {
  const table = document.querySelector("#our-products table");
  const rows = table.querySelectorAll("tbody tr");

  for (const row of rows) {
    const name = row.querySelector("td:first-child").textContent;
    if (name === plantName) {
      const stock = parseInt(row.querySelector("td:nth-child(3)").textContent);
      return stock;
    }
  }

  return 0; // If plant name not found, return 0 stock
}

function updateStock(plantName, quantity) {
  const table = document.querySelector("#our-products table");
  const rows = table.querySelectorAll("tbody tr");

  for (const row of rows) {
    const name = row.querySelector("td:first-child").textContent;
    if (name === plantName) {
      const stockCell = row.querySelector("td:nth-child(3)");
      const currentStock = parseInt(stockCell.textContent);
      const newStock = currentStock - quantity;
      stockCell.textContent = newStock;
      break;
    }
  }
}

// Function to store the basket in localStorage
function storeBasketInLocalStorage() {
  const basketItemsContainer = document.getElementById("basket-items");
  const basketItems = Array.from(basketItemsContainer.children);

  const basket = basketItems.map((item) => ({
    plantName: item.dataset.plantName,
    quantity: item.dataset.quantity,
  }));

  localStorage.setItem("basket", JSON.stringify(basket));
}

// Function to retrieve the basket from localStorage
function retrieveBasketFromLocalStorage() {
  const basketItemsContainer = document.getElementById("basket-items");

  // Get the basket from localStorage
  const basket = JSON.parse(localStorage.getItem("basket"));

  if (basket) {
    basket.forEach((item) => {
      const basketItem = document.createElement("div");
      basketItem.className = "basket-item";
      basketItem.dataset.plantName = item.plantName;
      basketItem.dataset.quantity = item.quantity;

      const itemName = document.createElement("span");
      itemName.className = "basket-item-name";
      itemName.textContent = item.plantName;
      basketItem.appendChild(itemName);

      const itemQuantity = document.createElement("span");
      itemQuantity.className = "basket-item-quantity";
      itemQuantity.textContent = item.quantity;
      basketItem.appendChild(itemQuantity);

      basketItemsContainer.appendChild(basketItem);
    });
  }

  calculateTotalPrice();
}

// Retrieve the basket from localStorage on page load
retrieveBasketFromLocalStorage();
