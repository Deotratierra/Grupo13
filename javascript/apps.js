// Evento Sticky del header

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


// Controlador del botón hamburger

const check = document.querySelector('#check');
  const menu = document.querySelector('.cont_resp_menu');

  check.addEventListener('click', () => {
    if (check.checked) {
      menu.style.display = 'block';
      setTimeout(() => menu.classList.add('show'), 0);
    } else {
      menu.classList.remove('show');
      setTimeout(() => menu.style.display = 'none', 300);
    }
  });


  // Controlador que elimina el menú desplegable cuando el usuario toca una opción del <li>

  const menuItems = document.querySelectorAll('.cont_resp_menu li a');
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      menu.classList.remove('show');
      setTimeout(() => {
        menu.style.display = 'none';
        check.checked = false;
      }, 300);
    });
  });


// Ocultar el menú si la pantalla tiene un ancho mayor o igual a 640px y el menú está visible
function hideMenuOnLargeScreens() {
  const respContMenu = document.querySelector('.cont_resp_menu');
  if (window.innerWidth >= 640 && respContMenu.classList.contains('show')) {
    respContMenu.classList.remove('show');
    setTimeout(() => respContMenu.style.display = 'none', 300);
    check.checked = false;
  }
}

// Ejecutar la función al cargar la página
hideMenuOnLargeScreens();

// Ejecutar la función cada vez que se cambie el tamaño de la pantalla
window.addEventListener('resize', hideMenuOnLargeScreens);


  