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
let cambio = false;
let intermitente = false;
let intervaloIntermitente
let automatico = false
let intervaloCompleto
let estadoLuzRojaI, estadoLuzVerdeI, estadoLuzAmarillaI, estadoLuzRojaD, estadoLuzVerdeD, estadoLuzAmarillaD
let timeOutCambio
let esperaCambio = false
let estadoCambio = estadoAutomatico = estadoIntermitente = false


botonEncendido.addEventListener("click", () => {
    encendido = !encendido;

    if (encendido) {
        botonEncendido.classList.replace("off", "on");
        estadoLuzRojaI = estadoLuzVerdeD = true
        estadoLuzAmarillaD = estadoLuzAmarillaI = estadoLuzRojaD = estadoLuzVerdeI = false
        estadoLuces()
        estadoCambio = estadoAutomatico = estadoIntermitente = true
        habilitaColores()
    }
    else {
        cambio = intermitente = automatico = false
        clearInterval(intervaloCompleto)
        clearInterval(intervaloIntermitente)
        luzAmarilla.textContent = luzAmarilla1.textContent = ""
        botonEncendido.classList.replace("on", "off");
        estadoLuzAmarillaD = estadoLuzAmarillaI = estadoLuzRojaD = estadoLuzRojaI = estadoLuzVerdeD = estadoLuzVerdeI = false
        estadoLuces()
        clearTimeout(timeOutCambio)
        estadoCambio = estadoAutomatico = estadoIntermitente = false
        habilitaColores()
    }
})

botonCambio.addEventListener("click", () => {
    if (!encendido || intermitente || automatico) {
        return
    }
    esperaCambio = true
    cambio = !cambio
    cambioSemaforo()
    estadoAutomatico = false
        habilitaColores()
})

botonIntermitente.addEventListener("click", () => {
    if (!encendido) {
        return
    }

    if (automatico) {
        automatico = false
        clearInterval(intervaloCompleto)
        luzAmarilla.textContent = luzAmarilla1.textContent = ""
    }


    cambio = false
    esperaCambio = false
    estadoAutomatico = true
    habilitaColores()
    clearTimeout(timeOutCambio)
    if (!intermitente) {
        estadoLuzRojaI = estadoLuzRojaD = estadoLuzVerdeI = estadoLuzVerdeD = false
        estadoLuzAmarillaI = estadoLuzAmarillaD = true
        estadoLuces()

        intervaloIntermitente = setInterval(() => {
            estadoLuzAmarillaD = !estadoLuzAmarillaD
            estadoLuzAmarillaI = !estadoLuzAmarillaI
            estadoLuces()
        }, 1000);
        intermitente = true
        estadoCambio = false
        habilitaColores()
    }
    else {
        intermitente = false
        estadoLuzAmarillaI = estadoLuzAmarillaD = estadoLuzVerdeI = estadoLuzRojaD = false
        estadoLuzRojaI = estadoLuzVerdeD = true
        estadoLuces()
        clearInterval(intervaloIntermitente)
        estadoCambio = true
        habilitaColores()
    }
})

botonAutomatico.addEventListener("click", () => {
    if (!encendido || esperaCambio) {
        return
    }

    if (intermitente) {
        intermitente = false
        clearInterval(intervaloIntermitente)
        estadoLuzAmarillaD = estadoLuzAmarillaI = estadoLuzRojaD = estadoLuzVerdeI = false
        estadoLuzRojaI = estadoLuzVerdeD = true
        estadoLuces()
    }

    luzAmarilla.classList.add("cuentaRojo");
    luzAmarilla1.classList.add("cuentaVerde");

    if (!automatico) {
        automatico = true
        cambioLed()
        cuentaRegresiva()
        estadoCambio = false
        habilitaColores()
    }
    else {
        automatico = false
        cambio = false
        clearInterval(intervaloCompleto)
        luzAmarilla.textContent = luzAmarilla1.textContent = ""
        estadoLuzAmarillaD = estadoLuzAmarillaI = estadoLuzRojaD = estadoLuzVerdeI = false
        estadoLuzRojaI = estadoLuzVerdeD = true
        estadoLuces()
        estadoCambio = true
        habilitaColores()
    }
})


function cuentaRegresiva() {

    let tiempo = 10
    luzAmarilla.textContent = luzAmarilla1.textContent = tiempo

    intervaloCompleto = setInterval(() => {
        tiempo--

        if (tiempo > 0) {
            luzAmarilla.textContent = luzAmarilla1.textContent = tiempo
        }
        else {
            luzAmarilla.textContent = luzAmarilla1.textContent = ""
            clearInterval(intervaloCompleto)
            cambio = !cambio
            cambioSemaforo()
        }
    }, 1000)
}

function cambioSemaforo() {
    estadoLuzRojaI = estadoLuzVerdeD = estadoLuzRojaD = estadoLuzVerdeI = false
    estadoLuzAmarillaD = estadoLuzAmarillaI = true
    estadoLuces()
    if (cambio) {
        timeOutCambio = setTimeout(function () {
            estadoLuzRojaD = estadoLuzVerdeI = true
            estadoLuzAmarillaD = estadoLuzAmarillaI = estadoLuzVerdeD = estadoLuzRojaI = false
            estadoLuces()
            esperaCambio = false
            estadoAutomatico = true
            habilitaColores()

            if (automatico) {
                cuentaRegresiva()
                cambioLed()
            }
        }, 3000);
    }
    else {
        timeOutCambio = setTimeout(function () {
            estadoLuzRojaI = estadoLuzVerdeD = true
            estadoLuzAmarillaD = estadoLuzAmarillaI = estadoLuzRojaD = estadoLuzVerdeI = false
            estadoLuces()
            esperaCambio = false
            estadoAutomatico = true
            habilitaColores()

            if (automatico) {
                cuentaRegresiva()
                cambioLed()
            }
        }, 3000);
    }

}

function cambioLed() {
    if (!cambio) {
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

function habilitaColores() {
    switch (estadoCambio) {
        case true: botonCambio.classList.replace("botonCambioDes", "botonCambioHab")
            break;
        default: botonCambio.classList.replace("botonCambioHab", "botonCambioDes")
        break;
    }
    switch (estadoAutomatico) {
        case true: botonAutomatico.classList.replace("botonAutoDes", "botonAutoHab")
            break;
        default: botonAutomatico.classList.replace("botonAutoHab", "botonAutoDes")
        break;
    }
    switch (estadoIntermitente) {
        case true: botonIntermitente.classList.replace("botonInterDes", "botonInterHab")
            break;
        default: botonIntermitente.classList.replace("botonInterHab", "botonInterDes")
        break;
    }
}