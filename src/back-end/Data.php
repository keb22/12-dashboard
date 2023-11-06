<?php
//Libreria de Correos
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

//Permisos de cabezera 
include('./Config/Conexion.php');
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://museoprehistorico.com ');
// Cambiar esto según la URL de React
header('Access-Control-Allow-Methods: GET, POST , PUT , DELETE'); // Cambiar esto según los métodos a permitir
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Requested-With, Accept');
header('Access-Control-Allow-Credentials: true');








// Manejar solicitud POST para crear un nuevo registro
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    if($data){
        
        //Se revisa que los datos no estén vacios
        $cantidad=$data->cantidad;
        $fecha=$data->fecha;
        $nit=$data->nit;
        $nombre=$data->nombre;
        $telefono=$data->telefono;
        $correo=$data->correo;
        $total=$data->total;
        $create_at=date("Y-m-d");

        if(!empty($cantidad)  && !empty($fecha) && !empty($nombre) && !empty($telefono) && !empty($correo) && !empty($total)){

            //Validación de la disponibilidad de reservas para la fecha seleccionada
            $sqlValidar="SELECT fecha, SUM(cantidad) as total_reservas FROM registro WHERE fecha = '$fecha' GROUP BY fecha";
            $resultValidar = $conn->query($sqlValidar); 
            if($resultValidar){
                
                $arregloValidar=$resultValidar->fetch_assoc();
                $total_reservas=$arregloValidar["total_reservas"];

                if($total_reservas < 50 ){

                    //Hacer la reserva
                    $sql = "INSERT INTO registro (`id`, `nit`, `nombre`, `telefono`, `cantidad`, `correo`, `fecha`, `total`, `create_at`) VALUES ('','$nit','$nombre','$telefono', '$cantidad','$correo', '$fecha', '$total', '$create_at')";
                    $result = $conn->query($sql);
                    
                    if($result){
                        //Mandar el correo
                        try {
                            $mail = new PHPMailer(true);
                            $mail->isSMTP();                                            //Send using SMTP
                            $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
                            $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
                            $mail->Username   = 'garridoj1964@gmail.com';                     //SMTP username
                            $mail->Password   = 'vutq yagl umee ahis';                               //SMTP password
                            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
                            $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
                        
                            //Recipients
                            $mail->setFrom('garridoj1964@gmail.com', 'Museo Prehistórico Huilassik Park');
                            $mail->addAddress($correo);  //Name is optional
                            $mail->addReplyTo('garridoj1964@gmail.com', 'Información');
                            $mail->CharSet = "UTF-8";
                        
                        
                        
                            // Configurar el asunto y el cuerpo del correo
                            $mail->Subject = 'Confirmación de reserva';
                            $mail->isHTML(true);
                            $mail->AddEmbeddedImage('MarcaAgua/Logo-Letra.png', 'logo');//Imagen Logo del correo : 1. Direccion de la Imagen , 2-Asignacion del nombre
                            $mail->Body = '
                            <h1>¡Gracias por reservar con nosotros!</h1>
                        
                            <p>Tu reserva ha sido confirmada.</p>
                        
                            <p>Los detalles de tu reserva son los siguientes:</p>
                        
                            <ul>
                                <li>Nombre: <strong>'. $nombre .'</strong></li>
                                <li>Cantidad: <strong>'. $cantidad . '</strong></li>
                                <li>Telefono: <strong>'. $telefono . '</strong></li>
                                <li>Fecha: <strong>'. $fecha . '</strong></li>
                                <li>Total: <strong>'. $total . '</strong></li>
                            </ul>
                        
                            <p>Esperamos verte pronto.</p>
                        
                            <img src="cid:logo" width="200" height="100" alt="Imagen de la reserva">
                            ';
                        
                            // Agregar imagen
                        
                            $mail->send();
                            echo json_encode(["message" => "Registro creado y enviado"]);
                        } catch (Exception $e) {
                            echo json_encode(["error" => "Tenemos problemas con el email"]);
                            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
                        }
                    }
                }else{
                    echo json_encode(["error"=>"Lo lamentamos. Para la fecha seleccionada no hay disponibilidad"]);
                }
            }
        }else{
            echo json_encode(["error"=>"Llene todo los campos del formulario"]);
        }
      
    }
}


// Manejar solicitud PUT para modificar un registro
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"));
    if($data){
        $id=$data->id;
        $nit=$data->nit;
        $nombre=$data->nombre;
        $telefono=$data->telefono;
        $cantidad=$data->cantidad;
        $correo=$data->correo;
        $fecha=$data->fecha;
        $total=$data->total;
        $create_at=date("Y-m-d");
    
        // Realizar la validación de los datos antes de insertar en la base de datos
    
        $sql = "UPDATE `registro` SET `id`='$id',`nit`='$nit',`nombre`='$nombre',`telefono`='$telefono',`cantidad`='$cantidad',`correo`='$correo',`fecha`='$fecha',`total`='$total',`create_at`='$create_at' WHERE id='$id'";
        $result = $conn->query($sql);
       
    
        if($result){
            echo json_encode(["message" => "Registro actualizado exitosamente"]);
        }else{
            echo json_encode(["error" => "Registro con error"]);
        }
     
        
    }else{

    }
}

// Manejar solicitud DELETE para obtener eliminar un registro
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM registro ORDER BY id DESC";
    $result = $conn->query($sql);
    $rows = [];

    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }

    echo json_encode($rows);
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
 
    $id=$_GET['id'];
    if(!empty($_GET['id'])){
    
        // Consulta Delete
    
        $sql = "DELETE FROM `registro` WHERE id='$id'";
        $result = $conn->query($sql);
       
    
        if($result){
            echo json_encode(["message" => "Registro eliminado"]);
        }else{
            echo json_encode(["error" => "Registro no eliminado con error"]);
        }
      
        
    }else{
        echo json_encode(["error" => "Id no valido" ]);
    }
}

// Añadir código similar para manejar solicitudes PUT (actualización) y DELETE (borrado)
$conn->close();

?>


