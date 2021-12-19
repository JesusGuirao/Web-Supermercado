class Clasenoche {
  constructor() {}

  hacernoche() {
    let noche = document.querySelector('body'); // cambiar atributos HTML / CSS
    var style_noche = window.getComputedStyle(noche); // obtener atributos CSS
    var rutaImagenFondoOriginal =
      style_noche.getPropertyValue('background-image');

    console.log(style_noche.getPropertyValue('background-image'));

    if (
      style_noche.getPropertyValue('background-image') ==
      rutaImagenFondoOriginal
    ) {
      let noche = document.getElementById('body'); // cambiar atributos HTML / CSS
      noche.style.backgroundImage = 'url(./imagenes/fondosuperoscurecido.jpg)';
    }
  }

  hacerdia() {
    let dia = document.querySelector('body'); // cambiar atributos HTML / CSS
    var style_dia = window.getComputedStyle(dia); // obtener atributos CSS
    var rutaImagenFondoOriginal =
      style_dia.getPropertyValue('background-image');

    console.log(style_dia.getPropertyValue('background-image'));

    if (
      style_dia.getPropertyValue('background-image') == rutaImagenFondoOriginal
    ) {
      let dia = document.getElementById('body'); // cambiar atributos HTML / CSS
      dia.style.backgroundImage = 'url(./imagenes/fondowebbien.jpg)';
    }
  }
}

let oscuridad = new Clasenoche();
