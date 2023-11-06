<?php

$servername = "localhost";//Servidor
$username = "root";//Usuario
$password = "";//Contraseña
$dbname = "museo"; //

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>