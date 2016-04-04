<?php
include('configDB.php');

$result=$stock_database->deleteStockLine($_GET['userid'], $_GET['id']);

echo $result;
