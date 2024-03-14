<?php

include("../db/connection.php");


if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
$todoID=$_GET['id'];
$userID=$_GET['userID'];



$completeTodo=$mysqli->prepare('update todos set isFinished=0 where id=?');
$updateScore=$mysqli->prepare('update users set score=score-1 where id=?');


    

$completeTodo->bind_param('i', $todoID);
$completeTodo->execute();

$updateScore->bind_param("i", $userID);
$updateScore->execute();

$response['status']="success";
$response["message"]= "Todo updated";


echo json_encode($response);
}