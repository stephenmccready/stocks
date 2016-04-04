var globalNewIndex = 0;
var globalCurrentIndex = 0;
var xmlHttp;
var userid="8675309";

$(document).ready(function() {
//    $("#stockSymbolSearch").click(function() {
//        jStockLookUp($("#stockSymbol"+globalCurrentIndex).val());
//    });
    $("#temp").click(function() {
	jInitializeStockTable();
        jGetMyStock(userid);
    });
    $("#add").click(function() {
	$('#mytable tbody>tr:last').clone(true).insertAfter('#mytable tbody>tr:last');
	$('#mytable tbody>tr:last input').val('');
	$('#mytable tbody>tr:last div').text('');
	var newIndex = globalNewIndex+1;
	
	var changeIds = function(i, val) {
	    return val.replace(globalNewIndex,newIndex);
	}

	$('#mytable tbody>tr:last input').attr('name', changeIds ).attr('id', changeIds );
	$('#mytable tbody>tr:last div').attr('id', changeIds );
	$('#mytable tbody>tr:last').attr('id', changeIds );
	$('#mytable tbody>tr:last a').attr('id', changeIds );
	globalNewIndex++;
        var saveBtn="#save"+globalNewIndex;
        $(saveBtn).addClass("disabled");
        return false;
    });
});

function jInitializeStockTable() {
    var i=1;
    while ($("#tr"+i).length) {
	$("#tr"+i).remove();
	i++;
    }
}

function jStockLookUp (stockSymbol) {
    if(stockSymbol.length>2) {
        getStockPrice(stockSymbol.toUpperCase());
    } else {
        $("#stockName"+globalCurrentIndex).text('');
        $("#stockPrice"+globalCurrentIndex).text('');
    }
}

function getStockPrice(stockSymbol) {
    var script = document.createElement('script');
    script.setAttribute('src', "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20csv%20where%20url%3D%27http%3A%2F%2Fdownload.finance.yahoo.com%2Fd%2Fquotes.csv%3Fs%3D"+stockSymbol+"%26f%3Dsl1d1t1c1ohgvnx%26e%3D.csv%27%20and%20columns%3D%27symbol%2Cprice%2Cdate%2Ctime%2Cchange%2Ccol1%2Chigh%2Clow%2Ccol2%2Cname%2Cexch%27&format=json&diagnostics=true&callback=stock_details");
    document.body.appendChild(script);
}

function stock_details(o){
    var results = o.query.results.row;
    if(results.name!='N/A') {
	$("#stockName"+globalCurrentIndex).text(results.name+' ('+results.exch+')');
	$("#stockPrice"+globalCurrentIndex).text(results.price);
    } else {
	$("#stockName"+globalCurrentIndex).text('');
	$("#stockPrice"+globalCurrentIndex).text('');
    }
}

function stockCalc() {
    var stockValue=parseFloat($("#stockPrice"+globalCurrentIndex).text()) * parseFloat($("#stockCount"+globalCurrentIndex).val());
    if (!isNaN(stockValue)) {
        $("#stockValue"+globalCurrentIndex).text(stockValue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
        var saveBtn="#save"+globalCurrentIndex;
        $(saveBtn).removeClass("disabled");
        $('#save').removeClass("disabled");
    }
    var totalStockValue=0;
    for(var i=0;i<(globalNewIndex+1);i++){
        var stockVal=parseFloat($("#stockPrice"+i).text()) * parseFloat($("#stockCount"+i).val());
        if (!isNaN(stockVal)) {
            totalStockValue+=stockVal;
        }
    }
    $("#totalStockValue").text(totalStockValue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
}

function jSaveStockLine(id) {
/* 	Save to tbl_stock
	    userid	int
	    symbol	varchar(16)
	    count	float
	    dateCreated	datetime
	    stockDesc	varchar(128)

*/
    xmlHttp=GetXmlHttpObject(xmlHttp);
    if (xmlHttp==null) {
        alert ("Browser does not support this web page"); return;
    }

    var userid="8675309";
    var stockSymbol="#stockSymbol"+globalCurrentIndex;
    var stockCount="#stockCount"+globalCurrentIndex;
    var stockName="#stockName"+globalCurrentIndex;
    
    var url="php/saveStockLine.php";
	url=url+"?userid="+userid;
	url=url+"&symbol="+$(stockSymbol).val();
	url=url+"&count="+$(stockCount).val();
	url=url+"&stockDesc="+encodeURIComponent($(stockName).text());
	url=url+"&sid="+Math.random();
    
    xmlHttp.open("GET",url,false);
    xmlHttp.send(null);
	
    if(xmlHttp.responseText!=1)	{
	alert(xmlHttp.responseText);
    } else {
	var saveBtn="#"+id;
	$(saveBtn).addClass("disabled");
    }
}

function jDeleteStockLine(id)	{
    var stockId=id.replace('remove','stockID');
    var trId=id.replace('remove','tr');

    // if stock not saved, remove it from the table displayed
    if($('#'+stockId).val()==''){
	$("#"+trId).remove();
    } else {
    // Otherwise delete the record and re-display the table
	xmlHttp=GetXmlHttpObject(xmlHttp);
	if (xmlHttp==null) {
	    alert ("Browser does not support this web page"); return;
	}
    
	var stockID="#stockID"+id.replace("remove", "");
	
	var url="php/deleteStockLine.php";
	    url=url+"?userid="+userid;
	    url=url+"&id="+$(stockID).val();
	    url=url+"&sid="+Math.random();
	
	xmlHttp.open("GET",url,false);
	xmlHttp.send(null);
	    
	// Refresh table
	jInitializeStockTable();
	jGetMyStock(userid);
    }
 
}

function jGetMyStock(userid) {
    xmlHttp=GetXmlHttpObject(xmlHttp);
    var url="php/getMyStocks.php";
	url=url+"?userid="+userid;
	url=url+"&sid="+Math.random();
    xmlHttp=GetXmlHttpObject();
    xmlHttp.open("GET",url,false);
    xmlHttp.send(null);

    var stockArray=JSON.parse(xmlHttp.responseText);
    var i=0;
    for(i=0; i<stockArray.length; i++) {
	var sql;
	if (i>0) {
	    // Add new line
	    $('#mytable tbody>tr:last').clone(true).insertAfter('#mytable tbody>tr:last');
	    $('#mytable tbody>tr:last input').val('');
	    $('#mytable tbody>tr:last div').text('');
	    // Set variable names in new line
	    var oldIndex = i-1;
	    var changeIdx = function(x, val) {
		return val.replace(oldIndex, i);
	    }
	    $('#mytable tbody>tr:last input').attr('name', changeIdx ).attr('id', changeIdx );
	    $('#mytable tbody>tr:last div').attr('id', changeIdx );
	    $('#mytable tbody>tr:last').attr('id', changeIdx );
	    $('#mytable tbody>tr:last a').attr('id', changeIdx );
	    var saveBtn="#save"+i;
	    $(saveBtn).addClass("disabled");
	    sql+="%2B"+stockArray[i].symbol;	// %2B = +
	} else {
	    sql=stockArray[i].symbol;
	}
	$("#stockID"+i).val(stockArray[i].id);
	$("#stockSymbol"+i).val(stockArray[i].symbol);
	$("#stockCount"+i).val(stockArray[i].count);
	$("#stockName"+i).text(stockArray[i].stockDesc);
    }
    
    // Get Stock Prices
    var script = document.createElement('script');
    script.setAttribute('src', "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20csv%20where%20url%3D%27http%3A%2F%2Fdownload.finance.yahoo.com%2Fd%2Fquotes.csv%3Fs%3D"+sql+"%26f%3Dsl1d1t1c1ohgvnx%26e%3D.csv%27%20and%20columns%3D%27symbol%2Cprice%2Cdate%2Ctime%2Cchange%2Ccol1%2Chigh%2Clow%2Ccol2%2Cname%2Cexch%27&format=json&diagnostics=true&callback=stock_table");
    document.body.appendChild(script);
    
    url=null;
}

function stock_table(o){
    console.log(o);
    var i=0;
    var results = o.query.results.row;
    
    if(Array.isArray(results)) {
	for(i=0; i<results.length; i++) {
	    $("#stockPrice"+i).text(results[i].price);
	    globalCurrentIndex=i;
	    globalNewIndex=i;
	    stockCalc();
	    var saveBtn="#save"+i;
	    $(saveBtn).addClass("disabled");
	}
    } else {
	$("#stockPrice"+i).text(results.price);
	globalCurrentIndex=i;
	globalNewIndex=i;
	stockCalc();
	var saveBtn="#save"+i;
	$(saveBtn).addClass("disabled");
    }
}

function GetXmlHttpObject(xmlHttp)	{
    try	{	// Firefox, Opera 8.0+, Safari
	xmlHttp=new XMLHttpRequest();
    }
    catch (e)	{	//Internet Explorer
	try{
	    xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
	}
	catch (e)	{
	    try	{
		xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
	    }
	    catch (failed)	{
		alert("This version of Internet Explorer does not support xmlHttp. Try another browser");
	    }
	}
    }
    return xmlHttp;
}
