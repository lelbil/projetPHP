<?php

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once '../vendor/autoload.php';

use App\Core\Database;
use App\Core\Logement;

$ville = $_GET['ville'];
if ($ville == "") {
    $error_obj = array();
    $error_obj["message"] = "Il faut spécifier la ville";
    $error_obj["code"] = 1;
    http_response_code(400);
    echo json_encode($error_obj);
    exit();
}

$database = new Database();
$connection = $database->getConnection();
$logement = new Logement($connection);

$stmt = $logement->findByCity($ville);
$logement_count = count($stmt);

$result = array();
$result["logements"] = $stmt;
$result["nbResult"] = $logement_count;
$result["ville"] = $ville;

echo json_encode($result);


