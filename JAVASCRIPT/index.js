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
})

botonCambio.addEventListener("click", () => {
    console.log(`boton cambio al inicio ${cambio}`);
    if (!encendido || intermitente) {
        return
    }
    cambioSemaforo()
    cambio = !cambio;
    console.log(`boton cambio al final ${cambio}`);
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
        console.log(`boton intermitente if intermitenete es falso ${cambio}`);
    }
    else {
        intermitente = false
        clearInterval(intervaloIntermitente)
        cambio = false
        cambioSemaforo()
        cambio = true

        console.log(`boton intermitente if intermitenete es verdadero ${cambio}`);
    }
})

function apagarAmarilloInter() {
    setTimeout(() => {
        luzAmarilla.classList.remove("luzAmarilla");
        luzAmarilla1.classList.remove("luzAmarilla");
    }, 1000);
}

botonAutomatico.addEventListener("click", () => {
    if (!encendido) {
        return
    }
    automatico = !automatico
    console.log(`automatico ${automatico}`)
    if (automatico) {
        luzAmarilla.classList.add("cuentaRojo");
        luzAmarilla1.classList.add("cuentaVerde");
        cuentaRegresiva()
    }
    else {
        clearInterval(intervaloCompleto)
        luzAmarilla.value = null
        luzAmarilla1.value = null
        intermitente = false
        intermitenciaCorta()
        }

})


function cuentaRegresiva() {
    let tiempo = 10
    intervaloCompleto = setInterval(() => {
        if (tiempo > 0) {
            luzAmarilla.value = tiempo
            luzAmarilla1.value = tiempo
        }
        else {
            luzAmarilla.value = null
            luzAmarilla1.value = null
        }
       
        if (tiempo == 0) {
            clearInterval(intervaloCompleto)
            console.log(tiempo)
            console.log(cambio)
            cambioSemaforoAuto()
            cambio = !cambio
            console.log(cambio)
            tiempo = 10
            cuentaRegresiva()
        }
        else {
            tiempo--
            
        }
        if (tiempo < 3) {
            luzAmarilla.classList.replace("cuentaRojo", "cuentaAmarillo")
            luzAmarilla1.classList.replace("cuentaVerde", "cuentaAmarillo")
            luzAmarilla.classList.replace("cuentaVerde", "cuentaAmarillo")
            luzAmarilla1.classList.replace("cuentaRojo", "cuentaAmarillo")
        }
    }, 1000)
}

function cambioSemaforoAuto() {
    if (cambio) {
        luzRoja.classList.remove("luzRoja");
        luzVerde1.classList.remove("luzVerde");
        luzVerde.classList.add("luzVerde");
        luzRoja1.classList.add("luzRoja");
        luzAmarilla.classList.replace("cuentaAmarillo", "cuentaVerde")
        luzAmarilla1.classList.replace("cuentaAmarillo", "cuentaRojo")
    }
    else {
        luzRoja1.classList.remove("luzRoja");
        luzVerde.classList.remove("luzVerde");
        luzVerde1.classList.add("luzVerde");
        luzRoja.classList.add("luzRoja");
        luzAmarilla.classList.replace("cuentaAmarillo", "cuentaRojo")
        luzAmarilla1.classList.replace("cuentaAmarillo", "cuentaVerde")
    }
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

function intermitenciaCorta() {

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
        console.log(`boton intermitente if intermitenete es falso ${cambio}`);
    }
    setTimeout(() => {
        intermitente = false
        clearInterval(intervaloIntermitente)
        cambio = false
        cambioSemaforo()
        cambio = true
        console.log(`boton intermitente if intermitenete es verdadero ${cambio}`);
    }, 3000);
}