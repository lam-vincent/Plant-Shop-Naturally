function sendEmail() {
  var name = document.getElementById("name").value;
  var subjectInBody = document.getElementById("subjectInBody").value;
  var message = document.getElementById("message").value;

  // the content of the mail is written here
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
  // Add the confetti animation
  setTimeout(() => {
    jsConfetti.addConfetti();
  }, 500);

  // get the name
  const nameElement = document.getElementById("name");
  const name = nameElement.value;

  // get the address
  const addressElement = document.getElementById("address");
  const address = addressElement.value;

  // get the basket items
  const basketItemsContainer = document.getElementById("basket-items");
  const basketItems = Array.from(basketItemsContainer.children);

  // get the total price
  const totalPriceElement = document.getElementById("total-price");
  const totalPrice = totalPriceElement.textContent;

  // get the delivery date
  const deliveryDateElement = document.getElementById("delivery-date");
  const deliveryDate = deliveryDateElement.value;

  // get the delivery time
  const deliveryTimeElements = document.getElementsByName("delivery-time");
  let deliveryTime = "";
  for (const element of deliveryTimeElements) {
    if (element.checked) {
      deliveryTime = element.value;
      break;
    }
  }

  // the content of the mail is written here
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

  // the mailto URL
  const mailtoLink =
    "mailto:naturally.client.supp@gmail.com" +
    "?subject=" +
    encodeURIComponent(subject) +
    "&body=" +
    encodeURIComponent(body);

  // open the mail client
  window.location.href = mailtoLink;
}
