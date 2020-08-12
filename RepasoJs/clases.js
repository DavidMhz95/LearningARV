class Coche {
    constructor(modelo, velociad, antiguedad) {
        this.modelo = modelo;
        this.velocidad = velociad;
        this.antiguedad = antiguedad;
    }

    aumentarVelociad() {
        this.velocidad += 1;
    }

    reducirVelocidad() {
        this.velociad -= 1;
    }

}

class Autobus extends Coche {
    constructor(modelo, velociad, antiguedad) {
        super(modelo, velociad, antiguedad);
        this.altura = 5;
    }

    mostrarAltura() {
        return "La altura del bus es " + this.altura;
    }
}

var autobus1 = new Autobus('Pegasus', 200, 2018);
console.log(autobus1.mostrarAltura());

var coche1 = new Coche('BMW', 200, 2017);
var coche2 = new Coche('Audi', 100, 2016);
var coche3 = new Coche('Mercedes', 200, 2017);
var coche4 = new Coche('Renault', 200, 2017);



document.write("<h1> Velocidad: " + coche1.velocidad + "</h1>")
coche1.aumentarVelociad();
coche1.aumentarVelociad();
coche1.aumentarVelociad();
console.log(coche1);
document.write("<h1> Velocidad despues: " + coche1.velocidad + "</h1>")