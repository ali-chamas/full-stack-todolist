<?php
include("../db/connection.php");

$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];

$check_email = $mysqli->prepare('select email from users where email=?');
$check_email->bind_param('s', $email);
$check_email->execute();
$check_email->store_result();
$email_exists = $check_email->num_rows();


if ($email_exists == 0) {
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);
    $query = $mysqli->prepare('insert into users(id,name,password,email,score) values(null,?,?,?,0);');
    $query->bind_param('sss', $name, $hashed_password, $email);
    $query->execute();
    $query->store_result();
   
    $getUsers=$mysqli->prepare('select * from users where email=?');
    $getUsers->bind_param('s', $email);
    $getUsers->execute();
    $getUsers->store_result();
    $getUsers->bind_result($id,$newName,$newEmail,$newPassword,$score);
    $getUsers->fetch();
    $fetchedUser=$getUsers->num_rows();
    if($fetchedUser==0){
        $response['status']='error';
    }
    else{
    $response["status"]='success';
    $response['user_id']= $id;
    $response['email']=$newEmail;
    $response['score']=$score;
    }

} else {
    $response["status"] = "user already exists";
    $response["message"] = "user $name wasn't created";
}
echo json_encode($response);