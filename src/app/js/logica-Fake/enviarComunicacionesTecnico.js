document.addEventListener("DOMContentLoaded", function () {
    var seccion = document.getElementById("login-form2"); // Otra forma de obtener la variable form

    if (seccion) {
        seccion.addEventListener("submit", function (event) {
            enviarComunicacionesTecnico(event);
        });
    }
});


//--------------------------------------------------------
//      POST
//--------------------------------------------------------
/**
 * Se ejecutará cuando se envíe el formulario.
 * Puesto que se usa fetch, es una función asíncrona
 * @param event Objeto con información del evento.
 * guardaraFormularioSolicitud()
 */

async function enviarComunicacionesTecnico(event) {
    if (event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const respuesta = await fetch(
            "../api/v.1.0/trabajadores/comercial/enviarComunicacionesTecnico.php",
            {
                method: "post",
                body: formData,
            }
        );
        //Realmente no hace falta gestionar esto, porque el form de por si solo se envia cuando cumple con todos
        //los requisitos de los inputs, hay otro JS Document con el popup de envío exito, solo hay que cambiar el boton
        // si el resultado de la petición es OK (i.e. código HTTP 200)
        /*
        if(respuesta.ok){

        }
         */
    }
}
