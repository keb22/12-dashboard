<?php
//Permisos de cabezera 
include('../Config/Conexion.php');
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000'); // Cambiar esto según la URL de React
header('Access-Control-Allow-Methods: GET'); // Cambiar esto según los métodos a permitir
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Requested-With, Accept');
header('Access-Control-Allow-Credentials: true');



// Realiza la consulta y suma las cantidades por fecha
$query = "SELECT fecha, SUM(cantidad) as total FROM registro GROUP BY fecha";
$resultado = $conn->query($query);

// Formatea los resultados en un array asociativo
$datos = array();
while ($fila = $resultado->fetch_assoc()) {
    $datos[] = $fila;
}

// Cierra la conexión a la base de datos
$conn->close();

// Devuelve los datos en formato JSON
header('Content-Type: application/json');
echo json_encode($datos);
?>
