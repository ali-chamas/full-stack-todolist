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
    $query = $mysqli->prepare('insert into users(name,password,email) values(?,?,?);');
    $query->bind_param('sss', $name, $hashed_password, $email);
    $query->execute();
    $query->store_result();
    $query->bind_result($id, $email, $hashed_password, $name,$score);
    $query->fetch();
    $response['status'] = "success";
    $response['message'] = "user $name was created successfully";
    $response['user_id'] = $id;
    $response['name'] = $name;
    $response['email'] = $email;
    $response['score']=$score;
} else {
    $response["status"] = "user already exists";
    $response["message"] = "user $name wasn't created";
}
echo json_encode($response);