//tomar boton cambio ya gregarle un listener
//tomar los div
//con el evento cambiar el color del div

const luzRoja = document.getElementById("luzRoja");
const luzAmarilla = document.getElementById("luzAmarilla");
const luzVerde = document.getElementById("luzVerde");
const luzRoja1 = document.getElementById("luzRoja1");
const luzAmarilla1 = document.getElementById("luzAmarilla1");
const luzVerde1 = document.getElementById("luzVerde1");
const botonEncendido = document.getElementById("botonEncendido");
const botonCambio = document.getElementById("botonCambio");
const botonIntermitente = document.getElementById("botonIntermitente");
const botonAutomatico = document.getElementById("botonAutomatico");

let encendido = false;
let cambio = true;
let intermitente = false;
let intervaloIntermitente

botonEncendido.addEventListener("click", () => {
    if (intermitente) {
        intermitente = false
        clearInterval(intervaloIntermitente)
    }
    encendido = !encendido;

    if (encendido) {
        botonEncendido.textContent = "Apagar";
        luzRoja.classList.add("luzRoja");
        luzVerde1.classList.add("luzVerde");
    }
    else {
        cambio = true
        botonEncendido.textContent = "Encender"
        luzRoja.classList.remove("luzRoja");
        luzVerde.classList.remove("luzVerde");
        luzRoja1.classList.remove("luzRoja");
        luzVerde1.classList.remove("luzVerde");
    }
})

botonCambio.addEventListener("click", () => {
    if (!encendido) {
        return
    }
    cambioSemaforo()
    cambio = !cambio;
})

botonIntermitente.addEventListener("click", () => {
    if (!encendido) {
        return
    }

    if (!intermitente) {

        luzRoja.classList.remove("luzRoja");
        luzVerde1.classList.remove("luzVerde");
        luzVerde.classList.remove("luzVerde");
        luzRoja1.classList.remove("luzRoja");
        luzAmarilla.classList.add("luzAmarilla");
        luzAmarilla1.classList.add("luzAmarilla");
        apagarAmarilloInter();

        intervaloIntermitente = setInterval(() => {
            luzAmarilla.classList.add("luzAmarilla");
            luzAmarilla1.classList.add("luzAmarilla");
            apagarAmarilloInter();

        }, 2000);
        intermitente = true
    }
    else {
        intermitente = false
        clearInterval(intervaloIntermitente)
        setTimeout(() => {
            botonEncendido.textContent = "Apagar";
            luzRoja.classList.add("luzRoja");
            luzVerde1.classList.add("luzVerde");
        }, 1000);


        encendido = !encendido
    }
})

function apagarAmarilloInter() {
    setTimeout(() => {
        luzAmarilla.classList.remove("luzAmarilla");
        luzAmarilla1.classList.remove("luzAmarilla");
    }, 1000);
}

botonAutomatico.addEventListener("click", () => {
    let tiempo = 10
    setInterval(() => {
        if (tiempo > 0) {
            tiempo--
            console.log(tiempo)
        }
        else {
            return
        }
    }, 1000);
})

function cambioSemaforo() {
    if (cambio) {
        luzRoja.classList.remove("luzRoja");
        luzVerde1.classList.remove("luzVerde");

        luzAmarilla.classList.add("luzAmarilla");
        luzAmarilla1.classList.add("luzAmarilla");

        setTimeout(function () {
            luzVerde.classList.add("luzVerde");

            luzRoja1.classList.add("luzRoja");

            luzAmarilla.classList.remove("luzAmarilla");
            luzAmarilla1.classList.remove("luzAmarilla");

        }, 3000);
    }
    else {
        luzRoja1.classList.remove("luzRoja");
        luzVerde.classList.remove("luzVerde");
        luzAmarilla.classList.add("luzAmarilla");
        luzAmarilla1.classList.add("luzAmarilla");

        setTimeout(function () {
            luzVerde1.classList.add("luzVerde");
            luzRoja.classList.add("luzRoja");
            luzAmarilla.classList.remove("luzAmarilla");
            luzAmarilla1.classList.remove("luzAmarilla");
        }, 3000);
    }
}