<?php

include("../db/connection.php");




$todoID=$_GET['id'];

$deleteTodo=$mysqli->prepare('delete from todos where id=?');
$deleteTodo->bind_param('i',$todoID);
$deleteTodo->execute();
$response['status']="success";
$response["message"]= "Todo deleted";

echo json_encode($response);
