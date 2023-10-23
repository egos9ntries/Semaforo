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

let encendido = false;
let cambio = true;


botonEncendido.addEventListener("click", () => {
    encendido = !encendido;
    if (encendido) {
            luzRoja.style.background =  "#ff0000";
            luzVerde1.style.background = "#00ff04";            
    }
    else {
            luzRoja.style.removeProperty("Background");
            luzVerde.style.removeProperty("Background");
            luzRoja1.style.removeProperty("Background");
            luzVerde1.style.removeProperty("Background");
    }
})

botonCambio.addEventListener("click", () => {
    if (!encendido) {
        return
    }
   if (cambio) {
            luzRoja.style.removeProperty("Background");
            luzVerde1.style.removeProperty("Background");
            luzAmarilla.style.background = "#fffb00";
            luzAmarilla1.style.background = "#fffb00";
            setTimeout(function() {
                luzVerde.style.background = "#00ff04";
                luzRoja1.style.background =  "#ff0000";
                luzAmarilla.style.removeProperty("Background");
                luzAmarilla1.style.removeProperty("Background");
            }, 3000);
        }
        else {
            luzRoja1.style.removeProperty("Background");
            luzVerde.style.removeProperty("Background");
            luzAmarilla.style.background = "#fffb00";
            luzAmarilla1.style.background = "#fffb00";
            setTimeout(function() {
                luzVerde1.style.background = "#00ff04";
                luzRoja.style.background =  "#ff0000";
                luzAmarilla.style.removeProperty("Background");
                luzAmarilla1.style.removeProperty("Background");
            }, 3000);
        }
    cambio = !cambio;
})

botonIntermitente.addEventListener("click", () => {

})