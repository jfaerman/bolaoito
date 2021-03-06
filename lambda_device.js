var AWS = require('aws-sdk');

var data_endpoint = '[find out with aws iot describe-endpoint]c';
var fortunes = ["Comcertezamente!","Talvez...","Desencana."]
console.log('Loading function');

exports.handler = function(event, context) {
    console.log("Message received");
    var iotdata = new AWS.IotData({endpoint: data_endpoint});  
    var fortune = fortunes[Math.floor(Math.random()*fortunes.length)];
    var payload = "{\"fortune\":\""+fortune+"\"}"
    var params = {
      topic: '8ball_fortune',
      payload: payload,
      qos: 1
    };
    
    iotdata.publish(params, function(err, data) {
      console.log("publishing IoT Data")
      if (err) {
          context.fail(""+err)
      }
      else     {
        context.succeed("OK "+(new Date().getTime()));
      }
    });

    //setTimeout(function(){console.log("Waiting...");},5000)  
};