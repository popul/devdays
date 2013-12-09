/**
 * Created by Paul on 09/12/13.
 */


var webSocket = require('websocket').server,
    http = require('http');

var server = http.createServer(function(request, response) {
});

server.listen(8888, function() { });

var wsServer = new webSocket({
    maxReceivedFrameSize: 64*1024*1024,   // 64MiB
    maxReceivedMessageSize: 64*1024*1024, // 64MiB
    fragmentationThreshold: 64*1024*1024, // 64MiB
    httpServer: server
});

var clients = {},
    count = 0;

wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin),
        id = count++;

    clients[id] = connection;

    connection.on('message', function(data){
        for (var clientId in clients) {
            clients[clientId].sendUTF(data.utf8Data);
        }
    });

    connection.on('close', function(){
        delete clients[id];
    });
});