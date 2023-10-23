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
        botonEncendido.textContent = "Apagar";
        luzRoja.style.backgroundImage = "radial-gradient(circle, #ff0000, #800000)";
        luzRoja.style.boxShadow = "0 0 10px rgba(255, 0, 0, 0.7)";

        luzVerde1.style.backgroundImage = "radial-gradient(circle, #00ff04, #008000)";
        luzVerde1.style.boxShadow = "0 0 10px rgba(0, 255, 0, 0.7)";
    }
    else {
        botonEncendido.textContent = "Encender"
            luzRoja.style.removeProperty("Background");
            luzRoja.style.boxShadow = "0px 0px 5px 5px #000000";
            luzVerde.style.removeProperty("Background");
            luzVerde.style.boxShadow = "0px 0px 5px 5px #000000";
            luzRoja1.style.removeProperty("Background");
            luzRoja1.style.boxShadow = "0px 0px 5px 5px #000000";
            luzVerde1.style.removeProperty("Background");
            luzVerde1.style.boxShadow = "0px 0px 5px 5px #000000";
    }
})

botonCambio.addEventListener("click", () => {
    if (!encendido) {
        return
    }
   if (cambio) {
            luzRoja.style.removeProperty("Background");
            luzRoja.style.boxShadow = "0px 0px 5px 5px #000000";

            luzVerde1.style.removeProperty("Background");
            luzVerde1.style.boxShadow = "0px 0px 5px 5px #000000";

            luzAmarilla.style.backgroundImage = "radial-gradient(circle, #ffff00, #cccc00)";
            luzAmarilla.style.boxShadow = "0 0 10px rgba(255, 255, 0, 0.7)";

            luzAmarilla1.style.backgroundImage = "radial-gradient(circle, #ffff00, #cccc00)";
            luzAmarilla1.style.boxShadow = "0 0 10px rgba(255, 255, 0, 0.7)";

            setTimeout(function() {
                luzVerde.style.backgroundImage = "radial-gradient(circle, #00ff04, #008000)";
                luzVerde.style.boxShadow = "0 0 10px rgba(0, 255, 0, 0.7)";

                luzRoja1.style.backgroundImage = "radial-gradient(circle, #ff0000, #800000)";
                luzRoja1.style.boxShadow = "0 0 10px rgba(255, 0, 0, 0.7)";

                luzAmarilla.style.removeProperty("Background");
                luzAmarilla.style.boxShadow = "0px 0px 5px 5px #000000";

                luzAmarilla1.style.removeProperty("Background");
                luzAmarilla1.style.boxShadow = "0px 0px 5px 5px #000000";

            }, 3000);
        }
        else {
            luzRoja1.style.removeProperty("Background");
            luzRoja1.style.boxShadow = "0px 0px 5px 5px #000000";

            luzVerde.style.removeProperty("Background");
            luzVerde.style.boxShadow = "0px 0px 5px 5px #000000";

            luzAmarilla.style.backgroundImage = "radial-gradient(circle, #ffff00, #cccc00)";
            luzAmarilla.style.boxShadow = "0 0 10px rgba(255, 255, 0, 0.7)";

            luzAmarilla1.style.backgroundImage = "radial-gradient(circle, #ffff00, #cccc00)";
            luzAmarilla1.style.boxShadow = "0 0 10px rgba(255, 255, 0, 0.7)";

            setTimeout(function() {
                luzVerde1.style.backgroundImage = "radial-gradient(circle, #00ff04, #008000)";
                luzVerde1.style.boxShadow = "0 0 10px rgba(0, 255, 0, 0.7)";

                luzRoja.style.backgroundImage = "radial-gradient(circle, #ff0000, #800000)";
                luzRoja.style.boxShadow = "0 0 10px rgba(255, 0, 0, 0.7)";

                luzAmarilla.style.removeProperty("Background");
                luzAmarilla.style.boxShadow = "0px 0px 5px 5px #000000";

                luzAmarilla1.style.removeProperty("Background");
                luzAmarilla1.style.boxShadow = "0px 0px 5px 5px #000000";

            }, 3000);
        }
    cambio = !cambio;
})

botonIntermitente.addEventListener("click", () => {

})