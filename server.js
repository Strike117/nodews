var Server = require('ws').Server,
    wss = new Server({
        port: 8000
    });

var currentWS = false;
var notifications = {

    users: {},

    init: function() {
        wss.on('connection', function(ws) {
            console.log('session started');
            currentWS = ws;
            ws.on('message', function(data) {
                currentWS = ws;
            });

            ws.on('close', function() {
                currentWS = false;
                console.log('session close');
            });
        });
    },
    notify: function(number) {
        var data ={};
        data.key ="1";
        var notification = {module: "BILLING", number: "INQ2014234234234", by: "for Account Number 322335", status: "is Working: Under Investigation", seen: true} ;
        notification.module = notification.module + number;
        data.data = notification;
        if (currentWS) {
            console.log('nofity');
            currentWS.send(JSON.stringify(data));
        }
    }

};
var number =0;
notifications.init();
console.log('started');
setInterval(function() {
    notifications.notify(number++);
}, 6000);
