<?php



include("../db/connection.php");

$email = $_POST['email'];
$password = $_POST['password'];

$query = $mysqli->prepare('select id,email,password,name,score
from users
where email=?');
$query->bind_param('s', $email);
$query->execute();
$query->store_result();
$query->bind_result($id, $email, $hashed_password, $name,$score);
$query->fetch();
$num_rows = $query->num_rows();

if ($num_rows == 0) {
    $response['status'] = "user not found";
} else {
    if (password_verify($password, $hashed_password)) {
        $response['status'] = "logged in";
        $response['user_id'] = $id;
        $response['name'] = $name;
        $response['email'] = $email;
        $response['score']=$score;
    } else {
        $response['status'] = "incorrect credentials";
    }
}
echo json_encode($response);