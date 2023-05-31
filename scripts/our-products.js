// function does four thing: add item to basket, update Total Price, update stock in table and store basket to the localStorage
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

  // the type of existingItem is either an HTML element (if a match is found) or undefined.
  const existingItem = Array.from(basketItemsContainer.children).find(
    (item) => item.dataset.plantName === plantNameSelect.value
  );

  // if true, update quantity, else create new basketItem
  if (existingItem) {
    const existingQuantity = parseInt(existingItem.dataset.quantity);
    const newQuantity = existingQuantity + quantity;
    existingItem.dataset.quantity = newQuantity; // for the table
    existingItem.querySelector(".basket-item-quantity").textContent =
      newQuantity; // for the basketItems
  } else {
    const basketItem = document.createElement("div");
    basketItem.className = "basket-item";
    // dataset is an object that contains key-value pairs
    // we use .dataset instead of .item to retrieve data like this item.dataset.plantName
    basketItem.dataset.plantName = plantNameSelect.value;
    basketItem.dataset.quantity = quantity;

    const itemName = document.createElement("span");
    itemName.className = "basket-item-name";
    // textContent is a property that represents the text content of an HTML element as a string.
    // the string will be retrieve and update like this .textContent
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

  // store the basket in localStorage
  storeBasketAndStockInLocalStorage();
}

// function to calculate the total price and store the totalPrice to the localStorage
function calculateTotalPrice() {
  const basketItemsContainer = document.getElementById("basket-items");
  const basketItems = basketItemsContainer.children;

  let totalPrice = 0;

  if (basketItems.length > 0) {
    Array.from(basketItems).forEach((item) => {
      const plantName = item.dataset.plantName;
      // by default, the values of custom data attributes are treated as strings
      // so we need to convert it to a integer
      const quantity = parseInt(item.dataset.quantity);
      const plantPrice = getPlantPrice(plantName);
      const itemPrice = quantity * plantPrice;
      totalPrice += itemPrice;
    });
  }

  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.textContent = `$${totalPrice}`;

  // store the total price in localStorage
  localStorage.setItem("totalPrice", totalPrice);
}

function getPlantPrice(plantName) {
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

  return plantPrices[plantName] || 0; // return 0 if the plant price is not found
}

// get the number of stock of a plant so that we know if we can add item to basket
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

  return 0; // if plant name not found, return 0 stock
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

// function to store the basket and stock in localStorage
function storeBasketAndStockInLocalStorage() {
  const basketItemsContainer = document.getElementById("basket-items");
  // put basket items divs in an array
  const basketItems = Array.from(basketItemsContainer.children);

  // create the object basket
  const basket = basketItems.map((item) => ({
    plantName: item.dataset.plantName,
    quantity: item.dataset.quantity,
  }));

  // get the stock information from the table
  const table = document.querySelector("#our-products table");
  const rows = table.querySelectorAll("tbody tr");

  const stock = {};

  for (const row of rows) {
    const name = row.querySelector("td:first-child").textContent;
    const stockValue = parseInt(
      row.querySelector("td:nth-child(3)").textContent
    );
    stock[name] = stockValue;
  }

  const data = {
    basket,
    stock,
  };

  localStorage.setItem("data", JSON.stringify(data));
}

// function to retrieve the basket and stock from localStorage
// and update totalPrice
function retrieveBasketAndStockFromLocalStorage() {
  const basketItemsContainer = document.getElementById("basket-items");

  // get the data from localStorage
  const data = JSON.parse(localStorage.getItem("data"));

  if (data) {
    const basket = data.basket;
    const stock = data.stock;

    if (basket.length > 0) {
      basket.forEach((item) => {
        const basketItem = document.createElement("div");
        basketItem.className = "basket-item";
        // we use .dataset instead of .item to retrieve data like this item.dataset.plantName
        basketItem.dataset.plantName = item.plantName;
        basketItem.dataset.quantity = item.quantity;

        const itemName = document.createElement("span");
        itemName.className = "basket-item-name";
        // the string will be retrieve and update like this .textContent
        itemName.textContent = item.plantName;
        basketItem.appendChild(itemName);

        const itemQuantity = document.createElement("span");
        itemQuantity.className = "basket-item-quantity";
        itemQuantity.textContent = item.quantity;
        basketItem.appendChild(itemQuantity);

        basketItemsContainer.appendChild(basketItem);
      });
    }

    // update the stock information in the table
    const table = document.querySelector("#our-products table");
    const rows = table.querySelectorAll("tbody tr");

    for (const row of rows) {
      const name = row.querySelector("td:first-child").textContent;
      const stockValue = stock[name];
      row.querySelector("td:nth-child(3)").textContent = stockValue;
    }
  }

  calculateTotalPrice();
}

// call the function after DOM loaded
document.addEventListener(
  "DOMContentLoaded",
  retrieveBasketAndStockFromLocalStorage
);
