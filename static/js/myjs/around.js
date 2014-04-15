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
  var Tree = function(y, scale) {
    this.y     = y;
    this.scale = scale;
  }
  var trees = new Array();
  var tree_num = 6;
  var x11=280,y11=200;
  var x12=0,y12=780;
  var x21=320,y21=200;
  var x22=600,y22=780;
  var y_base = y11+(y12-y11)/(x12-x11)*(x21-x11)/2;
  var sqrt_2 = 0.5;
  var tree_w = 3;
  trees.push(new Tree(y11, 1));  // 初始化一颗树
  var img_y = 0;
  function animate() {
    img_y = img_y + 9;
    context.clearRect(0, 0, canvas1Width, canvas1Height);
    context.save();
    context.transform(Math.cos(img_y*Math.PI/180),Math.sin(img_y*Math.PI/180),-Math.sin(img_y*Math.PI/180),Math.cos(img_y*Math.PI/180),100,100);
    context.drawImage($("#bottle").get(0), -32, -32);
    context.restore();
    if (playAnimation) {
      setTimeout(animate, 33);
    }
  };
  animate();
});
