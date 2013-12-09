/**
 * Created by Paul on 09/12/13.
 */
$(document).ready(function(){
    var img = $('#frame')[0];
    var ws = new WebSocket('ws://192.168.1.13:8888/');

    ws.onmessage = function (evt) {
        img.src = evt.data;
    };
});
