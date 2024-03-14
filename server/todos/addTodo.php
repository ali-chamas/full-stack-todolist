<?php

include("../db/connection.php");

$title=$_POST['title'];
$userID=$_POST['userID'];

$addTodo=$mysqli->prepare("insert into todos (title,userID) values (?,?)");
$addTodo->bind_param('ss',$title,$userID);
$addTodo->execute();
$response['status']='success';
$response['message']= 'todo '.$title.' created';

echo json_encode($response);   