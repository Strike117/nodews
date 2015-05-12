var Server = require('ws').Server, number = 0;
GLOBAL.wss = new Server({
        port: 8000
    });

// var currentWS = false;
GLOBAL.notifications = {

    users: {},

    init: function() {
        wss.on('connection', function(ws) {
            console.log('session started');
            // currentWS = ws;
            ws.on('message', function(data) {
                // currentWS = ws;
                
            });

            // ws.on('close', function() {
            //     currentWS = false;
            //     console.log('session close');
            // });
        });
    },
    notify: function(number, user) {
        var data ={};
        data.key ="1";
        var notification = {module: "BILLING", number: "INQ2014234234234", by: "for Account Number 322335", status: "is Working: Under Investigation", seen: true} ;
        notification.module = notification.module + number;
        data.data = notification;

        if (user) {
            console.log('nofity');
            user.send(JSON.stringify(data));
        }
    }

};

notifications.init();
console.log('started');
setInterval(function() {
    var user = parseInt(Math.random()*100000) % wss.clients.length;
    notifications.notify(number++, wss.clients[user]);
    // notifications.notify(number++);
}, 2000);
