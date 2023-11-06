<?php
include('./Config/Conexion.php');

// Establecer las cabeceras CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://museoprehistorico.com');
header('Access-Control-Allow-Methods: POST , GET');
header('Access-Control-Allow-Headers: Content-Type');

// Obtener los datos del usuario desde la solicitud
$data = json_decode(file_get_contents('php://input'), true);

// Validar que se han recibido datos
if (empty($data['usuario']) || empty($data['password'])) {
    $response = ['success' => false, 'message' => 'Por favor, proporciona usuario y contraseña.'];
    echo json_encode($response);
    exit();
}

$usuario = mysqli_real_escape_string($conn, $data['usuario']); // Evita SQL injection
$contrasena = mysqli_real_escape_string($conn, $data['password']); // Evita SQL injection

// Consulta para obtener datos del usuario
$sql = "SELECT * FROM usuarios WHERE corUsuario='$usuario' OR nomUsuario='$usuario'";
$result = $conn->query($sql);

if ($result->num_rows === 1) {
    $row = $result->fetch_assoc();

    // Verificar la contraseña (deberías usar algún mecanismo de hash y comparación segura)
    if ($contrasena === $row['conUsuario']) {
        $response = ['success' => true, 'message' => 'Acceso otorgado.'];
    } else {
        $response = ['success' => false, 'message' => 'Acceso denegado. Verifica tu contraseña'];
    }
} else {
    $response = ['success' => false, 'message' => 'Usuario no registrado'];
}

echo json_encode($response);
?>
