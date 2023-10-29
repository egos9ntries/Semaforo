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
let automatico = false
let intervaloAutomatico
let intervaloCompleto



botonEncendido.addEventListener("click", () => {
    console.log(`Boton encendido inicio: Encendido: ${encendido}, cambio: ${cambio}, intermitente: ${intermitente}, automatico: ${automatico}`)
    if (intermitente || automatico) {
        intermitente = false
        automatico = false
        clearInterval(intervaloCompleto)
        clearInterval(intervaloIntermitente)
        luzAmarilla.value = null
        luzAmarilla1.value = null
        console.log(`Apagar, automatico ${automatico}, intermitente ${intermitente}, cambio ${cambio} `)
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
    console.log(`Boton encendido final: Encendido: ${encendido}, cambio: ${cambio}, intermitente: ${intermitente}, automatico: ${automatico}`)
})

botonCambio.addEventListener("click", () => {
    if (automatico) {
        automatico = false
        clearInterval(intervaloCompleto)
        luzAmarilla.value = null
        luzAmarilla1.value = null
    }
    console.log(`boton cambio al inicio ${cambio}`);
    if (!encendido || intermitente) {
        return
    }
    cambioSemaforo()
    cambio = !cambio;
    
})

botonIntermitente.addEventListener("click", () => {
    console.log(`Boton intermitente inicio: Encendido: ${encendido}, cambio: ${cambio}, intermitente: ${intermitente}, automatico: ${automatico}`)
    if (!encendido) {
        return
    }

    if (automatico) {
        automatico = false
        clearInterval(intervaloCompleto)
        luzAmarilla.value = null
        luzAmarilla1.value = null
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
        cambio = false
        cambioSemaforo()
        cambio = true


    }
    console.log(`Boton intermitente final: Encendido: ${encendido}, cambio: ${cambio}, intermitente: ${intermitente}, automatico: ${automatico}`)
})

function apagarAmarilloInter() {
    setTimeout(() => {
        luzAmarilla.classList.remove("luzAmarilla");
        luzAmarilla1.classList.remove("luzAmarilla");
    }, 1000);
}

botonAutomatico.addEventListener("click", () => {
    console.log(`Boton automatico inicio: Encendido: ${encendido}, cambio: ${cambio}, intermitente: ${intermitente}, automatico: ${automatico}`)
    if (!encendido) {
        return
    }

    if (intermitente) {
        intermitente = false
        clearInterval(intervaloIntermitente)
        luzAmarilla.classList.remove("luzAmarilla");
        luzAmarilla1.classList.remove("luzAmarilla");
        luzRoja.classList.add("luzRoja");
        luzVerde1.classList.add("luzVerde");

    }
    
    luzAmarilla.classList.add("cuentaVerde");
    luzAmarilla1.classList.add("cuentaRojo");

    if (!automatico) {
        automatico = true
        cambioLed()
        cuentaRegresiva()
    }
    else {
        automatico = false
        clearInterval(intervaloCompleto)
        luzAmarilla.value = null
        luzAmarilla1.value = null
        cambioSemaforo()
    }
    console.log(`Boton automatico final: Encendido: ${encendido}, cambio: ${cambio}, intermitente: ${intermitente}, automatico: ${automatico}`)
})


function cuentaRegresiva() {
    let tiempo = 10
    luzAmarilla.value = tiempo
    luzAmarilla1.value = tiempo
    intervaloCompleto = setInterval(() => {
        tiempo--

        if (tiempo > 0) {
            luzAmarilla.value = tiempo
            luzAmarilla1.value = tiempo
        }
        else {
            luzAmarilla.value = null
            luzAmarilla1.value = null
            clearInterval(intervaloCompleto)
            cambioSemaforo()
            cambio = !cambio
            tiempo = 10
        }

    }, 1000)
}

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
            if (automatico) {
                cuentaRegresiva()
            cambioLed()
            }
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
            if (automatico) {
                cuentaRegresiva()
            cambioLed()
            }
        }, 3000);
    }
}

// function intermitenciaCorta() {

//     if (!intermitente) {
//         luzRoja.classList.remove("luzRoja");
//         luzVerde1.classList.remove("luzVerde");
//         luzVerde.classList.remove("luzVerde");
//         luzRoja1.classList.remove("luzRoja");
//         luzAmarilla.classList.add("luzAmarilla");
//         luzAmarilla1.classList.add("luzAmarilla");
//         apagarAmarilloInter();

//         intervaloIntermitente = setInterval(() => {
//             luzAmarilla.classList.add("luzAmarilla");
//             luzAmarilla1.classList.add("luzAmarilla");
//             apagarAmarilloInter();

//         }, 2000);
//         intermitente = true
//         console.log(`boton intermitente if intermitenete es falso ${cambio}`);
//     }
//     intermitente = false
//     clearInterval(intervaloIntermitente)
//     cambio = false
//     cambioSemaforo()
//     cambio = true
//     console.log(`boton intermitente if intermitenete es verdadero ${cambio}`);
// }

function cambioLed() {
    if (cambio) {
        luzAmarilla.classList.replace("cuentaVerde","cuentaRojo");
        luzAmarilla1.classList.replace("cuentaRojo","cuentaVerde");
    }
    else {
        luzAmarilla.classList.replace("cuentaRojo","cuentaVerde");
        luzAmarilla1.classList.replace("cuentaVerde","cuentaRojo");
    }
}