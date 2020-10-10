<?php
/* DEBUG SETUP */
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


$host = "localhost";
$port = 12000;

$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
socket_connect($socket, $host, $port);

$msg = "Sou o cliente 123";
socket_write($socket, $msg, strlen($msg));

$reply = socket_read($socket, 1924);
$reply = trim($reply);

echo "<h1>Server: ".$reply."</h1>";