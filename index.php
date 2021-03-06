<!doctype html>
<?php
include('php\configDB.php'); 
?>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang=""> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Diversified Fleeto</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="apple-touch-icon" href="apple-touch-icon.png">
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <style>
            body {
                padding-top: 50px;
                padding-bottom: 20px;
            }
	    #mytable td{
		vertical-align: middle;
	    }
	    #mytable th{
		text-align: center;
	    }
	    .thLeft {
		text-align: left !important;
	    }
        </style>
        <link rel="stylesheet" href="css/bootstrap-theme.min.css">
        <link rel="stylesheet" href="css/main.css">

        <script src="js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>
		
    </head>
    <body>
        <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="index.html">Diversified Fleeto</a><span class="navbar-brand "><small>Powered by SquareGo<sup>TM</sup></small></span>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <form id="login_form" class="navbar-form navbar-right" role="form">
	    <div class="form-group">
		<a class="btn btn-success" id="temp" role="button"><span class="glyphicon glyphicon-transfer"></span></a>
	    </div>
            <div class="form-group">
              <input type="text" placeholder="Email" class="form-control">
            </div>
            <div class="form-group">
              <input type="password" placeholder="Password" class="form-control">
            </div>
            <button type="submit" class="btn btn-success">Sign in</button>
          </form>
        </div><!--/.navbar-collapse -->
      </div>
    </nav>
<!--
    <div class="jumbotron">
      <div class="container">
        <h1>Diversifying Your Portfolio</h1>
        <p>In 3 simple steps</p>
      </div>
    </div>
-->
    <div class="container">
      <!-- 
      <div class="row">
        <div class="col-md-4">
          <h2>1. Enter your current Stock holdings</h2>

        </div>
        <div class="col-md-4">
          <h2>2. Generate your detailed Diversified Fleeto analysis</h2>
          <p> </p>
          <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
       </div>
        <div class="col-md-4">
          <h2>3. Balance your holdings using SquareGo<sup>TM</sup></h2>
          <p> </p>
          <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
        </div>
      </div>
      -->
      <hr>
	
      <div id="stockHoldings" class="container">
	    <form role="form" id="stockHoldingsForm">
		<table class="table table-striped table-responsive" id="mytable">
		    <thead>
			<tr>
			    <th>Stock Symbol</th>
			    <th class="thLeft">Stock Name</th>
			    <th>Price*</th>
			    <th>Number of<br />Shares</th>
			    <th>Value</th>
			    <th class="thLeft"><a class="btn btn-primary disabled" id="save" role="button" onclick="jSaveStockAll(this.id)"><span class="glyphicon glyphicon-floppy-disk"></span> Save All</a>
			    </th>
			</tr>
		    </thead>
		    <tbody>
		      <tr onmousedown="globalCurrentIndex=(this.rowIndex)-1;" id="tr0">
			<td width="10%">
			    <input id="stockSymbol0" name="stockSymbol0" type="text" placeholder="Symbol" class="form-control" onkeyup="jStockLookUp(this.value)" style="text-transform:uppercase;">
			    <input id="stockID0" name="stockID0" type="hidden"> 
			</td>
			<td width="35%">
			    <div id="stockName0"></div>
			</td>
			<td width="5%" class="text-right">
			    <div id="stockPrice0"></div>
			</td>
			<td width="10%">
			    <span class="col-md-12">
				<input id="stockCount0" name="stockCount0" type="number" placeholder="# of shares" class="form-control" onkeyup="stockCalc();" onmouseup="stockCalc();">
			    </span>
			</td>
			<td width="10%" class="text-right">
			    <div id="stockValue0"></div>
			</td>
			<td width="15%">
			    <a class="btn btn-primary disabled" id="save0" role="button" onclick="jSaveStockLine(this.id)"><span class="glyphicon glyphicon-floppy-disk"></span></a>
			    <a class="btn btn-success" id="add" role="button"><span class="glyphicon glyphicon-plus"></span></a>
			    <a class="btn btn-danger" id="remove0" role="button" onclick="jDeleteStockLine(this.id)"><span class="glyphicon glyphicon-minus"></span></a>
			</td>
		      </tr>
		    </tbody>
		    <tfoot>
			<tr><td></td><td></td><td></td><td class="text-right" style="vertical-align: middle"><strong>Total</strong></td><td class="text-right" style="vertical-align: middle"><div id="totalStockValue"></div></td><td></td></tr>
		    </tfoot>
		</table>
	    </form>
      </div>
	
      <footer>
        <p>&copy; Diversified Fleeto Inc. 2016</p>
	<div id="debug"></div>
      </footer>
    </div> <!-- /container -->
    
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.2.min.js"><\/script>')</script>
    <script src="js/vendor/bootstrap.min.js"></script>
    <script src="js/main.js"></script>
    </body>
</html>
