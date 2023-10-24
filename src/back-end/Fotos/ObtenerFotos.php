<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Cambiar esto según la URL de React
header('Access-Control-Allow-Methods: GET, POST , PUT , DELETE'); // Cambiar esto según los métodos a permitir
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Requested-With, Accept');
header('Access-Control-Allow-Credentials: true');

include("../Config/Conexion.php");

$sql = "SELECT * FROM imagenes";
$result = $conn->query($sql);

$images = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $images[] = $row;
    }
}

$conn->close();

echo json_encode($images);
?>
