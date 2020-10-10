<?php
/* DEBUG SETUP */
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$host = "localhost";
$port = 12000;

$clients = Array();

$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);

if(!$socket){
    echo "Socket creation error - can't create a socket\n";
    return;
}

if(!socket_bind($socket, $host, $port)){
    echo "Bind error - Can't bind that specific port\n";
    return;
}

if(!socket_listen($socket, SOMAXCONN)){
    echo "Listen error - Can't list that specific port\n";
    return;
}
echo "Listening for connections...\n";


while (true) {
    $accept = socket_accept($socket) or die("Could not accept incoming connection...\n");
    $msg = socket_read($accept, 2048) or die("Could not read input\n");

    $msg = trim($msg);
    echo "Client says: ".$msg."\n\n";

    $replay = "Bem vindo ao servidor";
    
    socket_write($accept, $replay, strlen ($replay)) or die("Could not write output\n");
}

socket_close($accept, $socket);