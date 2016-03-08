var globalNewIndex = 0;
var globalCurrentIndex = 0;

$(document).ready(function() {
    
    $("#stockSymbolSearch").click(function() {
	getStockName($("#stockSymbol"+globalCurrentIndex).val());
	getStockPrice($("#stockSymbol"+globalCurrentIndex).val());
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
	globalNewIndex++;
        return false;
    });
});

function getStockName(stockSymbol) {
    var script = document.createElement('script');
    script.setAttribute('src', "https://s.yimg.com/aq/autoc?query="+stockSymbol+"&region=US&lang=en-US&callback=stock_name");
    document.body.appendChild(script);
}

function stock_name(o){
//    alert(o.toSource());
    var rows = o.ResultSet.Result;  
    var output = '';  
    var no_rows=rows.length;  
    for(var i=0;i<no_rows;i++){
	if(rows[i].symbol==$("#stockSymbol"+globalCurrentIndex).val()){
	    var stock_name = rows[i].name;
	    var stock_exch = rows[i].exchDisp;
	    var stock_type = rows[i].typeDisp;
	    output+=stock_name+' ('+stock_exch+' '+stock_type+')'; 
	}
    }
    $("#stockName"+globalCurrentIndex).text(output);    
}

function getStockPrice(stockSymbol) {
    var script = document.createElement('script');
    script.setAttribute('src', "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20csv%20where%20url%3D%27http%3A%2F%2Fdownload.finance.yahoo.com%2Fd%2Fquotes.csv%3Fs%3D"+stockSymbol+"%26f%3Dsl1d1t1c1ohgv%26e%3D.csv%27%20and%20columns%3D%27symbol%2Cprice%2Cdate%2Ctime%2Cchange%2Ccol1%2Chigh%2Clow%2Ccol2%27&format=json&diagnostics=true&callback=stock_details");
    document.body.appendChild(script);
}

function stock_details(o){
    var results = o.query.results.row;
    $("#stockPrice"+globalCurrentIndex).text(results.price);  
}

function stockCalc() {
    var stockValue=parseFloat($("#stockPrice"+globalCurrentIndex).text()) * parseFloat($("#stockCount"+globalCurrentIndex).val());
    $("#stockValue"+globalCurrentIndex).text(stockValue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
    
    var totalStockValue=0;
    for(var i=0;i<(globalNewIndex+1);i++){
        totalStockValue+=parseFloat($("#stockPrice"+i).text()) * parseFloat($("#stockCount"+i).val());
    }
    $("#totalStockValue").text(totalStockValue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
}
