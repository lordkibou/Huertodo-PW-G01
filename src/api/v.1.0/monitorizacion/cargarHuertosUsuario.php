<?php
//ESTO SE LLAMA CON GET desde JS
//TIENE QUE DEVOLVER UN ARRAY DE NOMBRES DE LOS HUERTOS DEL USUARIO
$bbdd_servidor = 'localhost';
$bbdd_nombre = 'test_local';
$bbdd_user = 'root';
$bbdd_password = '';
try {
    $connexion = mysqli_connect($bbdd_servidor, $bbdd_user, $bbdd_password,$bbdd_nombre); //$bbdd_nombre
} catch (Exception $e) {
    http_response_code(500);
    die("Error: " . mysqli_connect_errno() . " " . mysqli_connect_error());
}
mysqli_query($connexion, 'SET NAMES utf8mb4');

session_start();

$user = $_SESSION ['user'];
$id = $user['id'];
//No nor sirve por ahora el obtener tambien la latitud y longitud, falta hacer el Insert en la BD
$sql = "SELECT `huertos`.`id`,`huertos`.`nombre` FROM `huertos` WHERE `huertos`.`usuario` = '$id'";
$resultado = mysqli_query($connexion, $sql);
//NO SE SI ESTO REALMENTE DEVUELVE TODOS LOS HUERTOS O UNO SOLO
if (mysqli_affected_rows($connexion) === 1) {
    $registro = mysqli_fetch_assoc($resultado);
    $salida = [];
    $salida['id'] = $registro['id'];
    $salida['nombreApellidos'] = $registro['nombre'];
    http_response_code(200);
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE');
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($salida);
} else {
    echo json_encode(mysqli_affected_rows($connexion));
    http_response_code(401);
}