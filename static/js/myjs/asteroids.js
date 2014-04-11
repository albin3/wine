$(document).ready(function() {
  var canvas1 = $('#canvas1');
  var canvas1Width  = canvas1.width();
  var canvas1Height = canvas1.height();
  var context = canvas1.get(0).getContext("2d");
  var playAnimation = true;
  var startButton = $("#startAnimation");
  var stopButton = $("#stopAnimation");
  startButton.hide();
  startButton.click(function(){
    $(this).hide();
    stopButton.show();
    playAnimation = true;
    animate();
  });
  stopButton.click(function(){
    $(this).hide();
    startButton.show();
    playAnimation = false;
  });
  var Shape = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width  = width;
    this.height = height;
    this.angle  = 2*Math.PI*Math.random();
    this.radius = Math.random() * 50 + 50;
    this.vx = Math.random()*4 - 2;
    this.vy = Math.random()*4 - 2;
  }
  var shapes = new Array();
  for (var i=0; i<10; i++) {
    var x = Math.random()*300;
    var y = Math.random()*300;
    var width = height = Math.random()*30;
    shapes.push(new Shape(x, y, width, height));
  }
  function animate() {
    context.clearRect(0, 0, canvas1Width, canvas1Height);
    for(var i=0; i<shapes.length; i++) {
      var tmpShape = shapes[i];
      tmpShape.y = tmpShape.y<0 ? 600 : tmpShape.y-tmpShape.radius /100 ;
      tmpShape.angle += Math.PI/180/100;
      tmpShape.x = tmpShape.x+tmpShape.radius > 1000 ? tmpShape.radius : tmpShape.x+1;
      context.fillRect(tmpShape.x+tmpShape.radius*Math.cos(tmpShape.angle*(Math.PI*180)), tmpShape.y, tmpShape.width, tmpShape.height);
    }
    if (playAnimation) {
      setTimeout(animate, 33);
    }
  };
  animate();
});
