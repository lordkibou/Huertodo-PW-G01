<?php
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
    $email = $_POST['email'];
    $name = $_POST['name'];
    $address = $_POST['address'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    $sql = "INSERT INTO `solicitud` (`nombreApellidos`, `email`, `direccion`, `asunto`, `mensaje`) 
            VALUES ('$name', '$email', '$address', '$subject', '$message')";
// Para comprobar si se ha ejecutado correctamente la sentencia usamos try ... catch
try {
    mysqli_query($connexion, $sql);
    http_response_code(200);
} catch (Exception $exception) {
    http_response_code(500);
    // podemos usar mysqli_errno para concretar el código de respuesta
    die(mysqli_errno($connexion));
}