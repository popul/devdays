$(document).ready(function(){
    var video = $('video')[0];
    video.autoplay = true;

    navigator.webkitGetUserMedia({video: true}, function(stream){
        video.src = window.URL.createObjectURL(stream);

        var back = document.createElement('canvas');
        back.width = 300;
        back.height = 200;

        var ctx = back.getContext('2d');

        var ws = new WebSocket('ws://192.168.1.13:8888');

        (function draw(){
            ctx.drawImage(video, 0, 0, back.width, back.height);
            ctx.font = "20pt Arial";
            ctx.fillText('Dev Days 2013', 10, 30);
            if (ws.readyState === 1) {
                ws.send(back.toDataURL());
            }
            setTimeout(draw, 100);
        })();

    });
});