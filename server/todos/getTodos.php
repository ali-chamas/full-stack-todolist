<?php

include("../db/connection.php");

$id=$_GET['id'];

$getTodos=$mysqli->prepare('select * from todos where userID=?');
$getTodos->bind_param('i',$id);
$getTodos->execute();
$getTodos->store_result();
$getTodos->bind_result($id, $title, $createdAt, $isFinished,$userID);
$getTodos->fetch();


$response['status']="success";
$response["message"]= "todos fetched succesfully";
$response["id"]=$userID;    
$response["title"]=$title;
$response["createdAt"]=$createdAt;
$response["isFinished"]=$isFinished;
$response["userID"]=$userID;

echo json_encode($response);