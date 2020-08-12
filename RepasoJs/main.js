var nombre = "David";
var altura = 170;
var concatenacon = nombre + " " + altura;
var datos = document.getElementById("datos");
datos.innerHTML = concatenacon;


var coche = {
    modelo: 'Mercedes clase A',
    maxima: 500,
    antiguedad: 2020,
    mostrarDatos() {
        console.log(this.modelo, this.maxima, this.antiguedad);
    },
    propiedad1: 5

}

document.write("<h1>" + coche.modelo + "</h1>")
coche.mostrarDatos();

var saludar = new Promise((resolve, reject) => {

    setTimeout(() => {
        let saludo = "Hola mundo!";
        saludo = false;
        if (saludo) {
            resolve(saludo);
        } else {
            reject('No hay saludo disponible');
        }
    }, 2000);
})


saludar.then(resultado => {
        alert(resultado);
    })
    .catch(err => {
        alert(err);
    })