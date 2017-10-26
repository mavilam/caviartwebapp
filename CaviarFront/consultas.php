<?php
echo 'hola';
$conexion = mysqli_connect('localhost','CaviartClient','858clientecaviart585');
//$enlace = mysqli_connect("127.0.0.1", "mi_usuario", "mi_contraseña", "mi_bd");

if (!$conexion) {
    echo "Error: No se pudo conectar a MySQL." . PHP_EOL;
    echo "errno de depuración: " . mysqli_connect_errno() . PHP_EOL;
    echo "error de depuración: " . mysqli_connect_error() . PHP_EOL;
    exit;
}

echo "Éxito: Se realizó una conexión apropiada a MySQL! La base de datos mi_bd es genial." . PHP_EOL;
echo "Información del host: " . mysqli_get_host_info($conexion) . PHP_EOL;

mysqli_close($conexion);
function conectar(){
    
}

?>