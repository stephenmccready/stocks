<?php
include('configDB.php');
$info_array=array();

$result=$stock_database->getMyStocks($_GET['userid']);

if(!is_array($result))	{
	echo substr($result, 1, strlen($result)-1);
} else {
	echo json_encode($result);
}
