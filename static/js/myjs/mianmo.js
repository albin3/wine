/** >>> 浏览器适配 >>> **/
var fun = function (canvas){
  var w_body  = $("body").width();
  var h_body  = $("body").height();
  canvas.get(0).width  = parseInt(w_body);
  canvas.get(0).height = parseInt(h_body);
};
$(document).ready(function() {
  var canvas1 = $('#canvas1');
  var canvas1Width  = canvas1.width();
  var canvas1Height = canvas1.height();
  var context = canvas1.get(0).getContext("2d");
  var playAnimation = true;
  var Shape = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width  = width;
    this.height = height;
    this.angle  = 2*Math.PI*Math.random();
    this.radius = Math.random() * 5  + 10;
    this.mvlength = 100;
    this.vx = (Math.random()*1 + 0.5)/10;
    this.vy = (Math.random()*2 + 1)/10;
  }
  var shapes = new Array();
  for (var i=0; i<10; i++) {
    var x = Math.random()*$("body").width();
    var y = Math.random()*$("body").height();
    var width = height = Math.random()*30;
    shapes.push(new Shape(x, y, width, height));
  }
  function animate() {
    context.clearRect(0, 0, canvas1Width, canvas1Height);
    for(var i=0; i<shapes.length; i++) {
      context.save();
      context.fillStyle = "rgb(200,200,200)";
      context.globalCompositeOperation = "lighter";
      var tmpShape = shapes[i];
      tmpShape.y = tmpShape.y+tmpShape.radius<0 ? 600+tmpShape.radius : tmpShape.y- tmpShape.vy;
      tmpShape.angle += Math.PI/180/100;
      // tmpShape.x = tmpShape.x+tmpShape.radius > 1000 ? tmpShape.radius : tmpShape.x+1;
      context.beginPath();
      context.arc(tmpShape.x+tmpShape.mvlength*Math.cos(tmpShape.angle*(Math.PI*180)*tmpShape.vx), tmpShape.y, tmpShape.radius, 0, Math.PI*2, false);
      context.closePath();
      context.fill();
      context.restore();
    }
    if (playAnimation) {
      setTimeout(animate, 33);
    }
  };
  animate();
});
