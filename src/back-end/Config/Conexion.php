<?php

$servername = "localhost";//Nombre del Servidor
$username = "root";//Usuario
$password = "";//Contraseña
$dbname = "museo"; //Nombre de la base de datos

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>