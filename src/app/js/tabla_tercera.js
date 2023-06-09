async function cargarComunicacionesAdministradorWeb() {
    var tabla = $("#tablax").DataTable({
        language: {
            processing: "Tratamiento en curso...",
            search: "Buscar&nbsp;:",
            infoEmpty: "No existen datos.",
            infoFiltered: "(filtrado de _MAX_ elementos en total)",
            infoPostFix: "",
            loadingRecords: "Cargando...",
            zeroRecords: "No se encontraron datos con tu búsqueda",
            emptyTable: "No hay datos disponibles en la tabla.",
            paginate: {
                first: "Primero",
                previous: "Anterior",
                next: "Siguiente",
                last: "Último",
            },
            aria: {
                sortAscending:
                    ": active para ordenar la columna en orden ascendente",
                sortDescending:
                    ": active para ordenar la columna en orden descendente",
            },
        },
        dom: 'rt<"bottom"p>',
        scrollY: "100vh",
        scrollCollapse: true,
        responsive: {
            details: false,
        },
    });


    // Función para cargar los datos del archivo JSON a la tabla
    async function cargarDatos() {
        console.log("Empieza la carga de datos del servidor")
        tablaTercera.clear().draw(); // Limpiar la tabla antes de cargar nuevos datos
        var respuesta = await fetch('../api/v.1.0/trabajadores/administrador_web/cargarComunicacionesAdministradorWeb.php');
        console.log(respuesta);
        var data = await respuesta.json();
        console.log(data);

        tabla.draw(); // Dibujar la tabla con los nuevos datos

    }
    await cargarDatos()

    //var estado = obtenerEstado(value.estado); // Obtener el estado dependiendo del valor recibido

    var fila = tabla.row.add([
        value.id,
        vaue.nombreApelllidos,
        value.email,
        value.fecha,
    ]).node();

    $(fila).attr('data-id', value.id);

    return fila;
}

function agregarEventoClickPrimerIcono(primerIcono, fila) {
    $(primerIcono).on("click", function (event) {
        event.stopPropagation();

        var filaActual = $(this).closest('tr');

        if (filaActual.hasClass("desplegado")) {
            filaActual.removeClass("desplegado");
            filaActual.next().remove();
        } else {
            filaActual.addClass("desplegado");
            mostrarDesplegable(filaActual);
        }
    });
}

function mostrarDesplegable(fila) {
    var seccion = $('<tr class="seccion-desplegada"><td colspan="6">' +
        '<div class="contenido-desplegado">' +
        '<h4>Comunicacion con Tecnicos</h4>' +
        '</div>' +
        '</td></tr>');

    $(fila).after(seccion);

    agregarEventoClickCancelar(seccion, fila);
    agregarEventoClickConfirmar(seccion, fila);

    // Agregar el formulario y los botones al div contenido-desplegado
    var form = $('<form method="POST" action="../api/v.1.0/trabajadores/comercial/enviarComunicacionesTecnico.php"></form>');
    seccion.find('.contenido-desplegado').append(form);

    var selectDe = $('<select name="de"></select>');
    var optionDe1 = $('<option value="2">Comercial 1</option>');
    selectDe.append(optionDe1);
    form.append(selectDe);

    var selectPara = $('<select name="para"></select>');
    var optionPara1 = $('<option value="3">Técnico 1</option>');
    selectPara.append(optionPara1);
    form.append(selectPara);

    var selectAsunto = $('<select name="asunto"></select>');
    var optionAsunto1 = $('<option value="Medidas">Medidas</option>');
    var optionAsunto2 = $('<option value="Montaje">Montaje</option>');
    selectAsunto.append(optionAsunto1);
    selectAsunto.append(optionAsunto2);
    form.append(selectAsunto);

    var textareaTexto = $('<textarea name="texto" placeholder="Texto"></textarea>');
    form.append(textareaTexto);

    var inputFecha = $('<input type="date" name="fecha">');
    var today = new Date();
    var dateString = today.toISOString().split('T')[0]; // Obtener la fecha actual en formato "YYYY-MM-DD"
    inputFecha.val(dateString); // Establecer la fecha actual en el campo de fecha
    form.append(inputFecha);

    // Obtener el valor de la columna "ID" de la tabla
    var id = $(fila).find('td:first-child').text().trim();

    var inputUsuarioSolicitud = $('<input type="text" name="usuario_solicitud">');
    inputUsuarioSolicitud.val(id); // Establecer el valor de usuario_solicitud con el valor de la columna "ID"
    form.append(inputUsuarioSolicitud);

    var enviarBtn = $('<button class="boton-cerrar-sesion">Enviar</button>');
    enviarBtn.on('click', function() {
        form.submit();
    });
    form.append(enviarBtn);

    var cancelarBtn = $('<button class="boton-cerrar-sesion">Cancelar</button>');
    cancelarBtn.on('click', function() {
        seccion.remove();
    });
    form.append(cancelarBtn);
}

function obtenerSegundoIcono(fila) {
    return $(fila).find('i.bi-person-add');
}

function agregarEventoClickSegundoIcono(segundoIcono, fila) {
    $(segundoIcono).on("click", function (event) {
        event.stopPropagation();

        var filaActual = $(this).closest('tr');

        if (filaActual.hasClass("desplegado")) {
            filaActual.removeClass("desplegado");
            filaActual.next().remove();
        } else {
            filaActual.addClass("desplegado");
            mostrarSegundoDesplegable(filaActual);
        }
    });
}

function mostrarSegundoDesplegable(fila) {
    var seccion = $('<tr class="seccion-desplegada"><td colspan="6">' +
        '<div class="contenido-desplegado">' +
        '<h4>Comunicacion con Administradores Web</h4>' +
        '</div>' +
        '</td></tr>');

    $(fila).after(seccion);

    agregarEventoClickCancelar(seccion, fila);
    agregarEventoClickConfirmar(seccion, fila);

    // Agregar el formulario y los botones al div contenido-desplegado
    var form = $('<form method="POST" action="../api/v.1.0/trabajadores/comercial/enviarComunicacionesAdministradorWeb.php"></form>');
    seccion.find('.contenido-desplegado').append(form);

    var selectDe = $('<select name="de"></select>');
    var optionDe1 = $('<option value="2">Comercial 1</option>');
    selectDe.append(optionDe1);
    form.append(selectDe);

    var selectPara = $('<select name="para"></select>');
    var optionPara1 = $('<option value="4">Administrador Web 1</option>');
    selectPara.append(optionPara1);
    form.append(selectPara);

    var selectAsunto = $('<select name="asunto"></select>');
    var optionAsunto1 = $('<option value="Registro">Registro</option>');
    selectAsunto.append(optionAsunto1);
    form.append(selectAsunto);

    var textareaTexto = $('<textarea name="texto" placeholder="Texto"></textarea>');
    form.append(textareaTexto);

    var inputFecha = $('<input type="date" name="fecha">');
    var today = new Date();
    var dateString = today.toISOString().split('T')[0]; // Obtener la fecha actual en formato "YYYY-MM-DD"
    inputFecha.val(dateString); // Establecer la fecha actual en el campo de fecha
    form.append(inputFecha);

    // Obtener el valor de la columna "ID" de la tabla
    var id = $(fila).find('td:first-child').text().trim();

    var inputUsuarioSolicitud = $('<input type="text" name="usuario_solicitud">');
    inputUsuarioSolicitud.val(id); // Establecer el valor de usuario_solicitud con el valor de la columna "ID"
    form.append(inputUsuarioSolicitud);

    var enviarBtn = $('<button class="boton-cerrar-sesion">Enviar</button>');
    enviarBtn.on('click', function() {
        form.submit();
    });
    form.append(enviarBtn);

    var cancelarBtn = $('<button class="boton-cerrar-sesion">Cancelar</button>');
    cancelarBtn.on('click', function() {
        seccion.remove();
    });
    form.append(cancelarBtn);
}

function obtenerTercerIcono(fila) {
    return $(fila).find('i.bi-info-circle');
}

function agregarEventoClickTercerIcono(tercerIcono, fila) {
    $(tercerIcono).on("click", function (event) {
        event.stopPropagation();

        var filaActual = $(this).closest('tr');

        if (filaActual.hasClass("desplegado")) {
            filaActual.removeClass("desplegado");
            filaActual.next().remove();
        } else {
            filaActual.addClass("desplegado");
            mostrarTercerDesplegable(filaActual);
        }
    });
}

function mostrarTercerDesplegable(fila) {
    var seccion = $('<tr class="seccion-desplegada"><td colspan="6">' +
        '<div class="contenido-desplegado">' +
        '<h4>Tercer Desplegable</h4>' +
        '<p>Contenido del tercer desplegable</p>' +
        '<button id="cerrar3">Cerrar</button>' +
        '</div>' +
        '</td></tr>');

    fila.after(seccion);

    agregarEventoClickCerrar3(seccion, fila);
}

function agregarEventoClickCancelar(seccion, fila) {
    var botonCancelar = seccion.find("#cancelar");

    botonCancelar.on("click", function () {
        fila.removeClass("desplegado");
        seccion.remove();
    });
}

function agregarEventoClickConfirmar(seccion, fila) {
    var botonConfirmar = seccion.find("#confirmar");
    botonConfirmar.type = 'submit';

    botonConfirmar.on("click", function () {
        // Obtener los valores seleccionados y el texto del textarea
        var opcionSeleccionada = seccion.find("#opciones").val();
        var asuntoSeleccionado = seccion.find("#asunto").val();
        var mensajeTexto = seccion.find("#mensaje").val();

        // Realizar las acciones necesarias con los valores obtenidos

        fila.removeClass("desplegado");
        seccion.remove();
    });
}

function agregarEventoClickCerrar3(seccion, fila) {
    var botonCerrar = seccion.find("#cerrar3");

    botonCerrar.on("click", function () {
        fila.removeClass("desplegado");
        seccion.remove();
    });
}

