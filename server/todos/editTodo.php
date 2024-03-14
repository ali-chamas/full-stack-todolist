<?php

include("../db/connection.php");


$newTitle=$_POST['title'];
$todoID=$_GET['id'];

$editTodo=$mysqli->prepare('update todos set title=? where id=?');
$editTodo->bind_param('si',$newTitle, $todoID);
$editTodo->execute();


$response['status']="success";
$response["message"]= "Todo updated";


echo json_encode($response);
