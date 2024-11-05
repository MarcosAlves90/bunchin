<?php

/**
 * Database Connection
 */
class DbConnect
{
    private $server = 'sql106.infinityfree.com';
    private $dbname = 'if0_37653813_bunchin_bd';
    private $user = 'if0_37653813';
    private $pass = ' Smqy7AZAxcRS0YR';

    public function connect()
    {
        try {
            $conn = new PDO('mysql:host=' . $this->server . ';dbname=' . $this->dbname, $this->user, $this->pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (\Exception $e) {
            echo "Database Error: " . $e->getMessage();
        }
    }
}

?>