<?php

include("../db/connection.php");

$id=$_GET['id'];

$getTodos=$mysqli->prepare('select * from todos where userID=?');
$getTodos->bind_param('i',$id);
$getTodos->execute();
$getTodos->store_result();
$getTodos->bind_result($id, $title, $createdAt, $isFinished,$userID);



$response['status']="success";
$response["message"]= "todos fetched succesfully";

$todos = [];
   
    while ($getTodos->fetch()) {
        $todo = [
            'id' => $id,
            'user_id' => $userID,
            'title' => $title,
            'createdAt' => $createdAt,
            'isFinished' => $isFinished,
            
        ];
    $todos[] = $todo;
    }

    $response['todos']=$todos;

echo json_encode($response);