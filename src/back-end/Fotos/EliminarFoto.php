<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://museoprehistorico.com'); // Cambiar esto según la URL de React
header('Access-Control-Allow-Methods: GET, POST , PUT , DELETE'); // Cambiar esto según los métodos a permitir
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Requested-With, Accept');
header('Access-Control-Allow-Credentials: true');

  include("../Config/Conexion.php"); 

  if($_SERVER['REQUEST_METHOD'] === 'DELETE'){
    $id=$_GET['id'];
    if(!empty($id)){
        // Obtener la información de la imagen
        $sql = "SELECT * FROM imagenes WHERE idImagen ='$id'";
        $resultado =$conn->query($sql);
        $datos=$resultado->fetch_assoc();
        $imagen=$datos["nomImagen"];

        //Eliminar foto del directorio img
        unlink("./img/$imagen");
        $sql2="DELETE FROM imagenes WHERE idImagen='$id'";
        if($conn->query($sql2)){
          echo json_encode(['message'=> 'Foto eliminada ']);
        };

    }else{
        echo json_encode(['error'=> 'Error al eliminar la foto, id vacio ']);
    }
  }else{
    echo json_encode(['error'=> 'Error al eliminar la foto server ']);
  }

  
   /* //Id
  $id=$_GET['id'];
  // Obtener la información de la imagen
  $sql = "SELECT nomImagen FROM imagenes WHERE id = $id";
  $resultado = $conn->query($sql);

  $imagen = $resultado->fetch()["nomImagen"];

  // Eliminar la imagen del servidor
  unlink("./img/$imagen");

  // Eliminar la imagen de la base de datos
  $sql = "DELETE FROM imagenes WHERE id = $id";
  $conn->query($sql);
  echo json_encode(['message' => 'File uploaded successfully']);*/

?>