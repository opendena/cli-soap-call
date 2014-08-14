var ws = require(__dirname + "/ws.js");
var argv = require(__dirname + "/clitool.js");
var soap = require('soap');

argv = argv(process.argv.slice(2));

// we remove param _ not need in ws call
delete argv._;
//console.log(JSON.stringify(argv,null,4));

// we store wanted WS func, and remove it from args
var funcName = argv.funcName;
delete argv.funcName;

// we store webservice url
var url = argv.url
delete argv.url

var wsdl_url = url  + '?wsdl';

soap.createClient(wsdl_url, function(err, client) {
       client[funcName](argv, function(err, result) {
				   if ( err ) process.stderr.write(err);
           process.stdout.write(JSON.stringify(result));   
			 });
});


