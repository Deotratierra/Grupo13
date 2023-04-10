$(document).ready(function() {
    // Variables globales
    var currentStep = 1;
    var nombre, apellido, email, telefono, paquete, personas, fechaDesde, fechaHasta;
  
    // Ocultar todos los pasos excepto el primero
    $('#step-2, #step-3').hide();
  
    // Al hacer click en el botón de siguiente
    $('.next-btn').click(function() {
      // Validar los campos del paso actual
      if (currentStep === 1) {
        nombre = $('#nombre').val().trim();
        apellido = $('#apellido').val().trim();
        if (nombre === "" || apellido === "") {
          alert("Por favor, complete los campos de nombre y apellido.");
          return;
        }
      } else if (currentStep === 2) {
        email = $('#email').val().trim();
        telefono = $('#telefono').val().trim();
        if (email === "" || telefono === "") {
          alert("Por favor, complete los campos de email y teléfono.");
          return;
        }
      } else if (currentStep === 3) {
        paquete = $('#paquete').val();
        personas = parseInt($('#personas').val());
        fechaDesde = $('#fechaDesde').val().trim();
        fechaHasta = $('#fechaHasta').val().trim();
        if (paquete === "" || isNaN(personas) || fechaDesde === "" || fechaHasta === "") {
          alert("Por favor, complete todos los campos del formulario.");
          return;
        }
      }
  
      // Pasar al siguiente paso
      currentStep++;
      $('#step-' + (currentStep - 1)).hide();
      $('#step-' + currentStep).show();

      var nombreCompleto = nombre + " " + apellido;
      var fechaActual = new Date().toLocaleDateString();
  
      // Si estamos en el último paso, calcular el precio y mostrar resultado
      if (currentStep === 4) {
        var descripcion = "";
        var precio = 0;
        switch (paquete) {
          case "Bariloche":
            precio = 43397;
            descripcion = "Visite las hermosas montañas y lagos de Bariloche. Hotel Hampton, WiFi, televisión 4k, teléfono, jacuzzi, servicio de habitación, desayuno, almuerzo y cena incluídos. Excursiónes, paseos en barco, trecking, pista de esquí. Fiestas nocturnas.";
            break;
          case "Salta":
            precio = 43397;
            break;
          case "Mendoza":
            precio = 4000;
            break;
          case "Misiones":
            precio = 3500;
            break;
          case "Santa Cruz":
            precio = 5500;
            break;
          case "Jujuy":
            precio = 4200;
            break;
        }
        var duracion = (new Date(fechaHasta) - new Date(fechaDesde)) / (1000 * 60 * 60 * 24);
        var total = precio * personas * duracion;
  
        $('#resultado').html(`
          <h1>DREAM TRAVEL - Presupuesto</h1>
          <p><strong>Fecha:</strong> ${fechaActual}</p>
          <p><strong>Nombre y Apellido:</strong> ${nombreCompleto}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${telefono}</p>
          <p><strong>Paquete de viaje:</strong> ${paquete}</p>
          <p><strong>Descripción:</strong> ${descripcion}</p>
          <p><strong>Fecha de salida:</strong> ${fechaDesde}</p>
          <p><strong>Fecha de regreso:</strong> ${fechaHasta}</p>
          <p><strong>Cantidad de personas:</strong> ${personas}</p>
          <p><strong>Precio por persona y por día:</strong> $${precio}</p>
          <p><strong>Duración del viaje:</strong> ${duracion} días</p>
          <h2>Total: $${total}</h2>
        `);
      }
    });
  
    // Al hacer click en el botón de anterior
    $('.prev-btn').click(function() {
      // Volver al paso anterior
      currentStep--;
      $('#step-' + (currentStep + 1)).hide();
      $('#step-' + currentStep).show();
    });
  });

  // PDF

  $('#download-pdf').click(function(event) {
    event.preventDefault(); // Evita la acción predeterminada del botón
    
    // Crear un nuevo documento PDF
    var doc = new jsPDF();
      
    // Obtener el contenido HTML de la sección de resultados
    var html = $('#resultado').html();
      
    // Convertir el contenido HTML a texto plano para evitar problemas de formato
    var text = html2plaintext(html);
  
    // Dividir el texto en líneas para que quepa en el ancho de la página
    var lines = doc.splitTextToSize(text, doc.internal.pageSize.width - 20);
  
    // Agregar el contenido al documento PDF
    for (var i = 0; i < lines.length; i++) {
      doc.text(lines[i], 10, 10 + (i * 10));
    }
      
    // Descargar el documento PDF
    doc.save('Presupuesto-DreamTravel.pdf');
      
  });
  

  // Función para convertir el contenido HTML a texto plano
  function html2plaintext(html) {
    var tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  // Funciónes OnFocus/OnBlur de los label

  function borrarTexto(input) {
    input.value = "";
}

function restaurarTexto(input) {
    if (input.value === "") {
        input.value = input.defaultValue;
    }
}


$(document).ready(function() {
  // Variables globales
  var currentStep = 1;
  var steps = $('.step');

  // Ocultar todos los pasos excepto el primero
  steps.slice(1).removeClass('active');
  
  // Al hacer click en el botón de siguiente
  $('.next-btn').click(function() {
    // Validar los campos del paso actual
    if (currentStep === 1) {
      nombre = $('#nombre').val().trim();
      apellido = $('#apellido').val().trim();
      if (nombre === "" || apellido === "") {
        alert("Por favor, complete los campos de nombre y apellido.");
        return;
      }
    } else if (currentStep === 2) {
      email = $('#email').val().trim();
      telefono = $('#telefono').val().trim();
      if (email === "" || telefono === "") {
        alert("Por favor, complete los campos de email y teléfono.");
        return;
      }
    } else if (currentStep === 3) {
      paquete = $('#paquete').val();
      personas = parseInt($('#personas').val());
      fechaDesde = $('#fechaDesde').val().trim();
      fechaHasta = $('#fechaHasta').val().trim();
      if (paquete === "" || isNaN(personas) || fechaDesde === "" || fechaHasta === "") {
        alert("Por favor, complete todos los campos del formulario.");
        return;
      }
    }

    // Pasar al siguiente paso
    currentStep++;
    steps.eq(currentStep - 2).removeClass('active');
    steps.eq(currentStep - 1).addClass('active');
    
    
    // Si estamos en el último paso, calcular el precio y mostrar resultado

    if (currentStep === 4) {
      var precio = 0;
      switch (paquete) {
        case "Bariloche":
          precio = 5000;
          break;
        case "Salta":
          precio = 4500;
          break;
        case "Mendoza":
          precio = 4000;
          break;
        case "Misiones":
          precio = 3500;
          break;
        case "Santa Cruz":
          precio = 5500;
          break;
        case "Jujuy":
          precio = 4200;
          break;
      }
      var duracion = (new Date(fechaHasta) - new Date(fechaDesde)) / (1000 * 60 * 60 * 24);
      var total = precio * personas * duracion;
      

      $('#resultado').html(`
        <p><strong>Nombre y Apellido:</strong> ${nombreCompleto}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Fecha actual:</strong> ${fechaActual}</p>
        <p><strong>Paquete de viaje:</strong> ${paquete}</p>
        <p><strong>Descripción:</strong> ${descripcion}</p>
        <p><strong>Fecha de salida:</strong> ${fechaDesde}</p>
        <p><strong>Fecha de regreso:</strong> ${fechaHasta}</p>
        <p><strong>Cantidad de personas:</strong> ${personas}</p>
        <p><strong>Precio por persona y por día:</strong> $${precio}</p>
        <p><strong>Duración del viaje:</strong> ${duracion} días</p>
        <h2>Total: $${total}</h2>
      `);
    }
  });

  // Al hacer click en el botón de anterior
  $('.prev-btn').click(function() {
    // Volver al paso anterior
    currentStep--;
    steps.eq(currentStep).removeClass('active');
    steps.eq(currentStep - 1).addClass('active');
  });
});