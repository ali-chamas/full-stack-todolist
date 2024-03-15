<?php

include("../db/connection.php");

$userID=$_GET['id'];

$getUser=$mysqli->prepare('select * from users where id=?');
$getUser->bind_param('i',$userID);
$getUser->execute();
$getUser->store_result();
$getUser->bind_result($id, $name, $email, $password,$score);
$getUser->fetch();


$response['status']="success";
$response['score']=$score;
$response['id']=$id;
$response['email']=$email;
$response['nname']=$name;

echo json_encode($response);