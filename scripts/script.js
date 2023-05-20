function isInViewport(element) {
  var rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

function handleScroll() {
  var elements = document.body.getElementsByTagName("*");
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    if (isInViewport(element)) {
      element.classList.add("visible");
    }
  }
}

window.addEventListener("scroll", handleScroll);
