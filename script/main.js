// Header sticky

const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (!document.body.classList.contains('modo-oscuro')) {
    if (window.pageYOffset > 0) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  } else {
    header.classList.remove('sticky');
    header.style.position = 'fixed';
  }
});


// Modal Formulario de Contacto

// Obtener el botón para abrir la ventana modal
var btnModal = document.getElementById("btn-modal");

// Obtener el contenedor de la ventana modal
var modal = document.getElementById("modal");

// Obtener el enlace para cerrar la ventana modal
var enlaceCerrar = document.querySelector(".cerrar");

// Abrir la ventana modal cuando se hace clic en el botón
btnModal.addEventListener("click", function() {
  modal.style.display = "block";
});

// Cerrar la ventana modal cuando se hace clic en el enlace "Cerrar"
enlaceCerrar.addEventListener("click", function() {
  modal.style.display = "none";
});

// Cerrar la ventana modal cuando se hace clic fuera de ella
window.addEventListener("click", function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});


// Control modo dark/white

function cambiarModo() {
  var modo = document.getElementById("modo");
  var body = document.body;
  if (body.classList.contains("modo-oscuro")) {
    body.classList.remove("modo-oscuro");
    modo.classList.remove("fa-sun");
    modo.classList.add("fa-moon");
  } else {
    body.classList.add("modo-oscuro");
    modo.classList.remove("fa-moon");
    modo.classList.add("fa-sun");
  }
}