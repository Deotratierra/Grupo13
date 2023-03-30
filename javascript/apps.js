window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  const main = document.querySelector("main");
  const headerHeight = header.offsetHeight;
  const scrollPosition = window.scrollY;

  if (scrollPosition >= headerHeight) {
    header.classList.add("sticky");
    main.style.paddingTop = headerHeight + "px";
  } else {
    header.classList.remove("sticky");
    main.style.paddingTop = 0;
  }
});
