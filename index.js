// poner el código para la solución aquí
// caja.ref.cartel.className = caja.ref.cartel.className.replace(' giro', '')

let cajas = [];
const nombres = [
  'María',
  'Alba',
  'Álvaro',
  'Hugo',
  'Lucas',
  'Martín',
  'Daniel',
  'Emma',
  'Manuel',
  'Lucía',
  'Daniela',
  'Mateo',
  'Alejandro',
  'Paula',
  'Julia',
  'Pablo',
  'Sofía',
  'Martina',
  'Valeria',
  'Leo',
];

const saveToLocalStorage = () => {
  let cajasToLocalStorage = [];
  cajas.forEach((caja) => {
    ({ abierta, horaInicio, cola } = caja);
    cajasToLocalStorage.push({ abierta, horaInicio, cola });
  });
  localStorage.setItem('cajas', JSON.stringify(cajasToLocalStorage));
};

const gestorCola = (añadir, caja, cantidad = 1) => {
  if (añadir) {
    for (let index = 0; index < cantidad; index++) {
      caja.cola.push(nombres[Math.floor(Math.random() * nombres.length)]);
    }
  } else {
    for (let index = 0; index < cantidad; index++) {
      caja.cola.shift();
    }
  }
  pintarNombresCola(caja);
};

const pintarNombresCola = (caja) => {
  const colaTexto = caja.ref.colaTexto;
  colaTexto.innerHTML = '';
  caja.cola.forEach((e) => {
    const textoCola = document.createElement('li');
    textoCola.appendChild(document.createTextNode(e));
    colaTexto.appendChild(textoCola);
  });
};

const seCabeEnLaCola = (caja, cantidad) => {
  if (caja.cola.length + cantidad <= 4 && caja.cola.length + cantidad >= 0) {
    return false;
  } else {
    return true;
  }
};

const regex = () => {
  const regex = /(caja)[0-9]+(: [+,-])[0-9]+/g;
  const regexNumeros = /[0-9]+/g;
  const regexMasOMenos = /[+,-]/g;
  const texto = document.getElementById('regex').value;
  if (texto.match(regex) === null) {
    console.log('La expresión esta mal escrita');
    return;
  }
  [cajaNumero, cantidad] = texto.match(regexNumeros);
  if (cajaNumero <= 0 || cajaNumero > cajas.length) {
    console.log('La caja seleccionada no existe');
    return;
  }
  const simbolo = texto.match(regexMasOMenos);
  const esMas = simbolo[0] === '+';
  const caja = cajas[cajaNumero - 1];

  if (caja.abierta === false) {
    console.log('La caja esta cerrada');
    return;
  }

  const numeroModificar = simbolo[0] + cantidad;
  if (seCabeEnLaCola(caja, +numeroModificar)) {
    console.log('la operación deseada no se puede realizar');
    if (seCabeEnLaCola(caja, 1)) {
      alert('La cola esta llena');
      return;
    }

    return;
  }

  gestorCola(esMas, caja, cantidad);

  if (caja.cola.length === 4) {
    const horaFin = new Date();
    const horaInicio = new Date(caja.horaInicio);
    const tiempoTranscurrido = Math.trunc((horaFin - horaInicio) / 1000);
    alert(`La cola se a llenado en ${tiempoTranscurrido} segundos`);
  }
};

const click = (numeroCaja) => {
  const caja = cajas[numeroCaja];
  if (!caja.abierta) {
    caja.ref.cartel.className = caja.ref.cartel.className + ' giro';
    caja.abierta = true;
    caja.horaInicio = new Date();
    return;
  }
  if (seCabeEnLaCola(caja, 1)) {
    alert('La cola esta llena');
    return;
  }

  gestorCola(true, caja, 1);

  if (caja.cola.length === 4) {
    const horaFin = new Date();
    const horaInicio = new Date(caja.horaInicio);
    const tiempoTranscurrido = Math.trunc((horaFin - horaInicio) / 1000);

    alert(`La cola se a llenado en ${tiempoTranscurrido} segundos`);
  }
};

const clickDerecho = (numeroCaja) => {
  const caja = cajas[numeroCaja];
  if (!caja.abierta) return;

  if (caja.cola.length === 0) {
    caja.ref.cartel.className = caja.ref.cartel.className.replace(' giro', '');
    caja.abierta = false;
    caja.cola = [];
    caja.horaInicio = null;
    return;
  }

  gestorCola(false, caja, 1);
};

const crearCajas = (cajasLocalStorage, cantidad = 5) => {
  const zonaCajas = document.getElementById('zonacajas');

  for (let index = 0; index < cantidad; index++) {
    const caja = document.createElement('div');
    // Creamos un p
    const p = document.createElement('p');
    // Creamos el texto del p
    const textoP = document.createTextNode(`caja${index + 1}`);
    // Añadimos el texto al p
    p.appendChild(textoP);
    // Añadimos al div el p
    caja.appendChild(p);
    // Añadir cartel

    const contenedorCartel = document.createElement('div');
    contenedorCartel.className = 'contenedorCartel';

    const cartel = document.createElement('div');
    cartel.className = 'cartel';

    const cartelAbierto = document.createElement('div');
    cartelAbierto.className = 'cajaCerrada';
    const cartelCerrrado = document.createElement('div');
    cartelCerrrado.className = 'cajaAbierta';

    cartel.appendChild(cartelAbierto);
    cartel.appendChild(cartelCerrrado);

    contenedorCartel.appendChild(cartel);

    caja.appendChild(contenedorCartel);

    caja.className = 'caja';

    zonaCajas.appendChild(caja);

    const centerTexto = document.createElement('center');
    const colaTexto = document.createElement('ul');
    colaTexto.className = 'colaTexto';

    centerTexto.appendChild(colaTexto);
    caja.appendChild(centerTexto);

    if (cajasLocalStorage !== null) {
      const objCaja = {
        abierta: cajasLocalStorage[index].abierta,
        horaInicio: cajasLocalStorage[index].horaInicio,
        cola: cajasLocalStorage[index].cola,
        ref: {
          caja,
          cartel,
          colaTexto,
        },
      };
      cajas.push(objCaja);
      pintarNombresCola(objCaja);
      if (objCaja.abierta) {
        objCaja.ref.cartel.className = objCaja.ref.cartel.className + ' giro';
      }
    } else {
      const objCaja = {
        abierta: false,
        horaInicio: null,
        cola: [],
        ref: {
          caja,
          cartel,
          colaTexto,
        },
      };
      cajas.push(objCaja);
    }

    caja.addEventListener('click', () => {
      click(index);
    });
    caja.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      clickDerecho(index);
    });
  }
};

const cajasLocalStorage = JSON.parse(localStorage.getItem('cajas'));
crearCajas(cajasLocalStorage || null);

document.getElementById('regex').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    regex();
  }
});
document.getElementById('botonguardar').addEventListener('click', (e) => {
  saveToLocalStorage();
});

//Modo noche
let noche = document.querySelector('#fondoid'); // cambiar atributos HTML / CSS
var style_noche = window.getComputedStyle(noche); // obtener atributos CSS
var rutaImagenFondoOriginal = style_noche.getPropertyValue('background-image');

//ocultar fondo
function ocultarfondo() {
  let ocultar = document.getElementById('fondoid'); // cambiar atributos HTML / CSS

  var style_ocultar = window.getComputedStyle(ocultar); // obtener atributos CSS

  console.log(style_ocultar.getPropertyValue('background-image'));

  if (
    style_ocultar.getPropertyValue('background-image') ==
    rutaImagenFondoOriginal
  ) {
    let ocultar = document.getElementById('fondoid'); // cambiar atributos HTML / CSS
    ocultar.style.backgroundImage = 'url(./imagenes/fonditoblanco.jpg)';
  } else {
    ocultar.style.backgroundImage = 'url(./imagenes/fondowebbien.jpg)';
  }
}
