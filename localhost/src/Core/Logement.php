<?php
/**
 * Created by PhpStorm.
 * User: attouchi
 * Date: 20/09/2018
 * Time: 10:32
 */

namespace App\Core;


class Logement
{
    private $conn;
    private $tableName = "logements";

    public $id;
    public $intitule;
    public $loyer;
    public $latitude;
    public $longitude;
    public $ville;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function read() {
        $query = "SELECT * from ".$this->tableName;

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    public function findByCity($city) {
        $query = "SELECT * FROM ".$this->tableName." WHERE ville=:ville";

        $stmt = $this->conn->prepare($query);
        $stmt->execute([
            "ville"=>$city,
        ]);
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        return $result;
    }
}