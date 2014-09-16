/** >>> 浏览器适配 >>> **/
var fun = function (canvas){
  var w_body  = $("body").width();
  var h_body  = $("body").height();
  canvas.get(0).width  = parseInt(w_body);
  canvas.get(0).height = parseInt(h_body);
};
$(document).ready(function() {
  var canvas  = $("#gameCanvas");
  var context = canvas.get(0).getContext("2d");

  // context
  var canvasWidth  = canvas.width();
  var canvasHeight = canvas.height();
  console.log(canvasWidth);
  console.log(canvasHeight);
  // setings
  var playGame=true;
  
  function animate() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    if (playGame) {
      setTimeout(animate, 33);
    }
  }
});

