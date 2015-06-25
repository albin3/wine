$().ready(function() {
  // $("#video").get(0).play();
  var canvas = $("#canvas");
  var context = canvas.get(0).getContext("2d");
  var canvasW = canvas.width();
  var canvasH = canvas.height();
  // context.fillRect(0,0,canvasW,canvasH);
  var video = $("#video");
  var vid = vid = document.getElementById("video");
  function a() {
    // context.drawImage(vid,0,0,video.width(),video.height(),0,0,canvasW,canvasH);
    setTimeout(a, 100);
  }
  canvas.get(0).addEventListener("touchstart",function(e){
    console.log("hello");
    var v = $("#video");
    v.attr('width', canvasW);
    v.attr('height', canvasH);
    v.attr('src', '/static/mp4/a.mp4');
    $('#src1').attr('src', "/static/a.ogv");
    $('#src2').attr('src', "/static/mp4/a.mp4");
    $('#src3').attr('src', "/static/a.webm");
    video.get(0).play();
  });
  a();
});
