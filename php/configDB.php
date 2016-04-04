<?php
date_default_timezone_set('America/New_York');

define("DB_SERVER", "your db server goes here");
define("DB_USER", "your db user");
define("DB_PASS", "your db password");
define("DB_NAME", "your db name");

class MySQLDB
{
	var $connection; //The MySQL database connection

	//constructor
	function MySQLDB()	{
		/* Make connection to database */
		$this->connection = mysql_connect(DB_SERVER, DB_USER, DB_PASS) or die(mysql_error());
		mysql_select_db(DB_NAME, $this->connection) or die(mysql_error());
		
		/* MySQLi */
		//	$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASS, DB_NAME);
			
		/* PDO */
		//$dsn = 'mysql:host=db500881646.db.1and1.com;dbname=db500881646';
		//$username = 'dbo500881646';
		//$password = 'Cool10!';
		//$options = array(
		//	PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
		//); 

		//$dbh = new PDO($dsn, $username, $password, $options);
		
	}
	
	function insertStock($userid, $symbol, $count, $date_created, $stockDesc) { 
		$q01 = "INSERT INTO tbl_stock(userid, symbol, count, dateCreated, stockDesc ) Values (" 
			. $userid . ", '" . $symbol . "', " . $count . ", '" . $date_created . "', '" . urldecode($stockDesc) . "');";

		$result = mysql_query($q01, $this->connection); 

		if($result)	{
			return 1;
		} else {
			return "DATABASE ERROR (it's not your fault):\nQuery:\n" . $q01;	}			
	}
	
	function getMyStocks($userid)	{
		$q02 = "Select *"
			. " From tbl_stock"
			. " Where userid=".$userid
			. " Order by dateCreated";
			
		$result = mysql_query($q02, $this->connection); 
		   
		if($result)	{	
			$result = mysql_query($q02, $this->connection);
			$info_array = array();
			while($dbarray=mysql_fetch_array($result))	{
				$info_array[] = $dbarray;
			}
			return $info_array;
		} else {
			return "DATABASE ERROR (it's not your fault):<br />Query:<br />" . $q02;
		}
	
	}
	
	function deleteStockLine($userid, $id)	{
		$q03 = "Delete"
			. " From tbl_stock"
			. " Where id=".$id
			. " And userid=".$userid;
			
		$result = mysql_query($q03, $this->connection); 
		   
		return $result;
	
	}
};
$stock_database = new MySQLDB;
