<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');

include("../Config/Conexion.php");

$uploadDirectory = 'img/';

if (!file_exists($uploadDirectory)) {
    mkdir($uploadDirectory, 0777, true);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $file = $_FILES['file']['tmp_name'];
    $fileName = $_FILES['file']['name'];
    $descripcionImagen= $_POST['descripcionImagen'];
    $tipoImagen= $_POST['tipoImagen'];
    $uploadPath = $uploadDirectory . $fileName;

    move_uploaded_file($file, $uploadPath);

    // Guardar el nombre del archivo en la base de datos
    $sql = "INSERT INTO imagenes VALUES ('','$fileName','$descripcionImagen','$tipoImagen')";
    $conn->query($sql);
    $conn->close();

    echo json_encode(['message' => 'File uploaded successfully']);
} else {
    echo json_encode(['message' => 'Invalid request method']);
}

?>