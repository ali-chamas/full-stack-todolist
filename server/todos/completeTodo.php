<?php

include("../db/connection.php");


if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
$todoID=$_GET['id'];
$isComplete=$_GET['isComplete'];

if($isComplete=="true"){

$completeTodo=$mysqli->prepare('update todos set isFinished=1 where id=?');

}else{

    $completeTodo=$mysqli->prepare('update todos set isFinished=0 where id=?');

}
$completeTodo->bind_param('i', $todoID);
$completeTodo->execute();
$response['status']="success";
$response["message"]= "Todo updated";


echo json_encode($response);
}