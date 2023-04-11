// Seleccionamos los elementos HTML que vamos a utilizar
let rate1 = document.querySelector('.rate1'); /*no es necesario solo muestra la tasa de cambio en el html*/
let rate2 = document.querySelector('.rate2'); /*no es necesario solo muestra la tasa de cambio en el html*/
let resultBtn = document.querySelector('.result'); /*boton para convertir*/
let selects = document.querySelectorAll('select'); /*selecciona los select*/
let sel1 = selects[0];
let sel2 = selects[1];
let inputs = document.querySelectorAll('.input input'); /*selecciona los input  */
let inpt1 = inputs[0];
let inpt2 = inputs[1];

// Objeto para almacenar los tipos de cambio
let rates = {};

// URL de la API que vamos a utilizar para obtener los tipos de cambio 
// documentación: https://exchangerate.host/#/#docs.
let requestURL = 'https://api.exchangerate.host/latest?base=USD&symbols=USD,ARS';

// Llamamos a la función para obtener los tipos de cambio
//--------------------------------------------------------------------------------------------------------------//
//  fetchRates es una función asíncrona que utiliza la API Fetch para realizar una solicitud GET a la API       //
//  de conversión de moneda(https://api.exchangerate.host/latest). Una vez que la respuesta es recibida, se     //
//  convierte a formato JSON y se almacena en la variable rates.Luego, se llama a la función populateOptions    //
//  para llenar las opciones en los elementos select con las monedas disponibles.Esta función se llama          //
//  al inicio del programa para cargar las tasas de conversión.                                                 //
//--------------------------------------------------------------------------------------------------------------//
fetchRates();

async function fetchRates() {
  // Hacemos una petición a la API para obtener los tipos de cambio
  let res = await fetch(requestURL);
  // Convertimos la respuesta a un objeto JSON
  res = await res.json();
  // Almacenamos los tipos de cambio en el objeto rates
  rates = res.rates;
  // Llamamos a la función para actualizar las opciones de los select
  populateOptions();
}

function populateOptions() {
  let val = "";
  // Iteramos sobre las monedas que queremos mostrar
  ['USD', 'ARS'].forEach(code => {
    // Creamos un option para cada moneda
    let str = `<option value="${code}">${code}</option>`;
    val += str;
  })
  // Actualizamos los select con las nuevas opciones
  selects.forEach((s) => (s.innerHTML = val));
}

function convert(val, from, toCurr) {
  // Convertimos el valor de una moneda a otra
  let v = (val / rates[from]) * rates[toCurr];
  let v1 = v.toFixed(3);
  return v1 == 0.0 ? v.toFixed(5) : v1;
}

function displayRate() {
  // Obtenemos las monedas seleccionadas en los select
  let v1 = sel1.value;
  let v2 = sel2.value;
  // Obtenemos el valor de 1 unidad de la moneda de origen en la moneda de destino
  let val = convert(1, v1, v2);
  
  // Actualizamos los elementos HTML con los valores obtenidos
  rate1.innerHTML = `1 ${v1} `;  /*se puede agregar texto por ej  rate1.innerHTML = `1 ${v1} Equivale`;  y en el div rate1 se mostrara el texto  se puede agregar codigo css dentro de este mismo codigo por ej <br> font, tamaño,color etc*/
  rate2.innerHTML = `${val} ${v2}`;/*misma explicacion que el anterior  se puede agregar codigo css dentro de este mismo codigo por ej <br> font, tamaño,color etc*/
}

// Añadimos un listener al botón para convertir valores
resultBtn.addEventListener('click', () => {
  // Obtenemos los valores ingresados en los input y los select
  let fromCurr = sel1.value;
  let fromVal = parseFloat(inpt1.value);
  let toCurr = sel2.value;
  // Verificamos que el valor ingresado sea un número válido
  if (isNaN(fromVal)) {
    alert('Ingresa un Numero Valido');
  }
  else {
    // Convertimos el valor y lo mostramos en el input correspondiente
    let cVal = convert(fromVal, fromCurr, toCurr);
    inpt2.value = cVal;
  }
});
// Listener de los selects para actualizar la tasa de conversión en el HTML
selects.forEach(s => s.addEventListener('change', displayRate));

// Listener del botón de swap para intercambiar las monedas
document.querySelector('.swap').addEventListener('click', () => {
  let in1 = inpt1.value;
  let in2 = inpt2.value;
  let op1 = sel1.value;
  let op2 = sel2.value;

  inpt2.value = in1;
  inpt1.value = in2;

  sel2.value = op1;
  sel1.value = op2;

  displayRate();
});