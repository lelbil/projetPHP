<?php

namespace App\Core;

class Database {
    private $host = "db";
    private $db_name = "accomodations";
    private $username = "root";
    private $password = "root";
    private $conn;
    private $options = [
        \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION
    ];

    public function getConnection() {
        $this->conn = null;

        try {
           $this->conn = new \PDO("mysql:host=".$this->host.";dbname=".$this->db_name.";charset=utf8", $this->username, $this->password, $this->options);
        } catch (\PDOException $exception) {
            echo "Connection error ".$exception->getMessage();
        }

        return $this->conn;
    }
}
?>