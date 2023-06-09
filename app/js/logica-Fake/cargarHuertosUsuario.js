//--------------------------------------------------------
//      GET
//--------------------------------------------------------
//En el servidor recibe los datos de la sesion implicitamente ya, aqui recibe array de objeto, nombres de huerto e id
//Esta funcion de JS solo se cargará en usuario final, no hay que preocuparse por trabajadores


//Se exporta de forma que se incluye en etiquetas <script> antes de control-acceso.js
async function cargarHuertosUsuario(){
    var respuesta = await fetch('../api/v.1.0/monitorizacion/cargarHuertosUsuario.php');
    var data = await respuesta.json();
    let selector = document.getElementById("nombre-huerto");

    //A lo mejor hay que iterar sobre el name del selector, no lo se
    data.forEach((objetoHuerto)=>{
        let option = document.createElement("option")
        //Guardamos el id del huerto porque es importante, ya que se pueden repetir nombres
        option.value = objetoHuerto.id;
        option.text = objetoHuerto.nombre;
        selector.appendChild(option);
    })
}