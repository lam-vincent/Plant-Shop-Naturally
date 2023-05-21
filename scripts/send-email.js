function sendEmail() {
  var name = document.getElementById("name").value;
  var subjectInBody = document.getElementById("subjectInBody").value;
  var message = document.getElementById("message").value;

  // The content of the mail is written here
  var subject = "Client Support Ticket from " + name;
  var body =
    "From: " +
    name +
    "\nSubject: " +
    subjectInBody +
    "\n\nMessage:\n" +
    message +
    "\n\n";

  // the mailto URL
  var mailtoLink =
    "mailto:naturally.client.supp@gmail.com" +
    "?subject=" +
    encodeURIComponent(subject) +
    "&body=" +
    encodeURIComponent(body);

  // to open the mail client
  window.location.href = mailtoLink;
}

function sendOrder() {
  // Get the name
  const nameElement = document.getElementById("name");
  const name = nameElement.value;

  // Get the address
  const addressElement = document.getElementById("address");
  const address = addressElement.value;

  // Get the basket items
  const basketItemsContainer = document.getElementById("basket-items");
  const basketItems = Array.from(basketItemsContainer.children);

  // Get the total price
  const totalPriceElement = document.getElementById("total-price");
  const totalPrice = totalPriceElement.textContent;

  // Get the delivery date
  const deliveryDateElement = document.getElementById("delivery-date");
  const deliveryDate = deliveryDateElement.value;

  // Get the delivery time
  const deliveryTimeElements = document.getElementsByName("delivery-time");
  let deliveryTime = "";
  for (const element of deliveryTimeElements) {
    if (element.checked) {
      deliveryTime = element.value;
      break;
    }
  }

  // The content of the mail is written here
  var subject = "New order from " + name;
  let body = "From: " + name + "\nAddress: " + address;

  body += "\n\nBasket Items:\n";
  for (const item of basketItems) {
    const plantName = item.dataset.plantName;
    const quantity = item.dataset.quantity;
    body += "- " + plantName + " (Quantity: " + quantity + ")\n";
  }

  body += "\nTotal Price: " + totalPrice + "\n";
  body += "Delivery Date: " + deliveryDate + "\n";
  body += "Delivery Time: " + deliveryTime + "\n\n";

  // The mailto URL
  const mailtoLink =
    "mailto:naturally.client.supp@gmail.com" +
    "?subject=" +
    encodeURIComponent(subject) +
    "&body=" +
    encodeURIComponent(body);

  // Open the mail client
  window.location.href = mailtoLink;
}
