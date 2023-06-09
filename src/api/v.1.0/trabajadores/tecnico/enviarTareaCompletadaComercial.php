<?php
//--------------------------------------------------------
//      POST
//--------------------------------------------------------

/*
 * formularioSolicitud:POST--------------> guardarFormularioSolicitud()----->Insert en BD, HTTP:200 | HTTP:500
 *
 * */
$bbdd_servidor = 'localhost';
$bbdd_nombre = 'test_local';
$bbdd_user = 'root';
$bbdd_password = '';
try {
    $connexion = mysqli_connect($bbdd_servidor, $bbdd_user, $bbdd_password, $bbdd_nombre); //$bbdd_nombre
} catch (Exception $e) {
    http_response_code(500);
    die("Error: " . mysqli_connect_errno() . " " . mysqli_connect_error());
}
mysqli_query($connexion, 'SET NAMES utf8mb4');
$de = $_POST['de'];
$para = $_POST['para'];
$asunto = $_POST['asunto'];
$texto = $_POST['texto'];
$fecha = $_POST['fecha'];
$usuario_solicitud = $_POST['usuario_solicitud'];

// Realizar el INSERT en la tabla "comunicacion_trabajadores"
$sql = "INSERT INTO `comunicacion_trabajadores` (`de`, `para`, `asunto`, `texto`, `fecha`, `usuario_solicitud`) 
            VALUES ('$de', '$para', '$asunto', '$texto', '$fecha', '$usuario_solicitud')";
try {
    mysqli_query($connexion, $sql);

    // Modificar el estado de la tabla "solicitud" según el valor del asunto
    $estado = '';
    if ($asunto === 'Medidas') {
        $estado = 1;
    }
    if ($asunto === 'Montaje') {
        $estado = 2;
    }
    $updateSql = "UPDATE `solicitud` SET `estado` = '$estado' WHERE `id` = '$usuario_solicitud'";
    mysqli_query($connexion, $updateSql);

    // Eliminar el mensaje de la tabla "comunicacion_trabajadores"
    $deleteSql = "DELETE FROM `comunicacion_trabajadores` WHERE `usuario_solicitud` = '$usuario_solicitud' AND `comunicacion_trabajadores`.`para` = 3";
    mysqli_query($connexion, $deleteSql);

    http_response_code(200);
} catch (Exception $exception) {
    http_response_code(500);
    // Podemos usar mysqli_errno para concretar el código de respuesta
    die(mysqli_errno($connexion));
}
?>
