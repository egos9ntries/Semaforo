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
let estadoLuzRojaI, estadoLuzVerdeI, estadoLuzAmarillaI, estadoLuzRojaD, estadoLuzVerdeD, estadoLuzAmarillaD



botonEncendido.addEventListener("click", () => {
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
        estadoLuzRojaI = estadoLuzVerdeD = true
        estadoLuces()
    }
    else {
        cambio = true
        botonEncendido.textContent = "Encender"
        estadoLuzAmarillaD = estadoLuzAmarillaI = estadoLuzRojaD = estadoLuzRojaI = estadoLuzVerdeD = estadoLuzVerdeI = false
        estadoLuces()
    }
})

botonCambio.addEventListener("click", () => {
    if (automatico) {
        automatico = false
        clearInterval(intervaloCompleto)
        luzAmarilla.value = luzAmarilla1.value = null
    }

    if (!encendido || intermitente) {
        return
    }
    cambioSemaforo()
    cambio = !cambio;
})

botonIntermitente.addEventListener("click", () => {
    if (!encendido) {
        return
    }

    if (automatico) {
        automatico = false
        clearInterval(intervaloCompleto)
        luzAmarilla.value = luzAmarilla1.value = null
    }

    if (!intermitente) {
        estadoLuzRojaI = estadoLuzRojaD = estadoLuzVerdeI = estadoLuzVerdeD = false
        estadoLuzAmarillaI = estadoLuzAmarillaD = true
        estadoLuces()
        apagarAmarilloInter();

        intervaloIntermitente = setInterval(() => {
            estadoLuces()
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

function cambioLed() {
    if (cambio) {
        luzAmarilla.classList.replace("cuentaVerde", "cuentaRojo");
        luzAmarilla1.classList.replace("cuentaRojo", "cuentaVerde");
    }
    else {
        luzAmarilla.classList.replace("cuentaRojo", "cuentaVerde");
        luzAmarilla1.classList.replace("cuentaVerde", "cuentaRojo");
    }
}

function estadoLuces() {
    switch (estadoLuzRojaI) {
        case true: luzRoja.classList.add("luzRoja");
            break;
        default: luzRoja.classList.remove("luzRoja");
            break;
    }
    switch (estadoLuzRojaD) {
        case true: luzRoja1.classList.add("luzRoja");
            break;
        default: luzRoja1.classList.remove("luzRoja");
            break;
    }
    switch (estadoLuzVerdeI) {
        case true: luzVerde.classList.add("luzVerde");
            break;
        default: luzVerde.classList.remove("luzVerde");
            break;
    }
    switch (estadoLuzVerdeD) {
        case true: luzVerde1.classList.add("luzVerde");
            break;
        default: luzVerde1.classList.remove("luzVerde");
            break;
    }
    switch (estadoLuzAmarillaI) {
        case true: luzAmarilla.classList.add("luzAmarilla");
            break;
        default: luzAmarilla.classList.remove("luzAmarilla");
            break;
    }
    switch (estadoLuzAmarillaD) {
        case true: luzAmarilla1.classList.add("luzAmarilla");
            break;
        default: luzAmarilla1.classList.remove("luzAmarilla");
            break;
    }
}