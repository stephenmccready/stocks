<?php
include('configDB.php');

$date_created=date('Y-m-d H:i:s');

$result=$stock_database->insertStock( $_GET['userid'], $_GET['symbol'], $_GET['count'], $date_created, $_GET['stockDesc'] );

if(substr($result, 0, 1)=="0")  {
    echo substr($result, 1, strlen($result)-1);
} else {
    echo 1;
}
