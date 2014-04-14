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
  /*
  for (var i=0; i<tree_num; i++) {
    var y     = i*canvas1Height/tree_num;
    var scale = (y-y_base)/(0-y_base);
    trees.push(new Tree(y, scale));
  }
  */
  var x11=280,y11=200;
  var x12=0,y12=780;
  var x21=320,y21=200;
  var x22=600,y22=780;
  var y_base = y11+(y12-y11)/(x12-x11)*(x21-x11)/2;
  var sqrt_2 = 0.5;
  var tree_w = 3;
  trees.push(new Tree(y11, 1));  // 初始化一颗树
  function animate() {
    context.clearRect(0, 0, canvas1Width, canvas1Height);
    // 画一条路
    context.beginPath();
    context.moveTo(x11, y11);
    context.lineTo(x12, y12);
    context.closePath();
    context.stroke();
    context.beginPath();
    context.moveTo(x21, y21);
    context.lineTo(x22, y22);
    context.closePath();
    context.stroke();
    for (var i=0; i<trees.length; i++) {
      if(trees[i].y-30*sqrt_2*trees[i].scale>canvas1Height) {
        trees.splice(i,1);
        break;
      }
    }
    var index = 0;
    var min_y = canvas1Height;
    for(var i=0; i<trees.length; i++) {
      if (trees[i] && trees[i].y<min_y) {
        min_y = trees[i].y;
        index = i;
      }
    }
    if (min_y>y11+(y12-y11)/6) {
      trees.push(new Tree(y11,1));
    }
    for(var i=0; i<trees.length; i++) {
      var tree = trees[i];
      if (!tree) continue;
      tree.y = /*tree.y-30*sqrt_2*tree.scale>800 ? 0 :*/ tree.y+tree.scale;
      tree.scale = (tree.y-y_base)/(y11-y_base);
      context.save();
      context.transform(tree.scale, 0, 0, tree.scale, x11+(x21-x11)/2, tree.y); // 平移
      // 画两颗棵树
      context.fillStyle = "rgb(80,40,00)";
      context.fillRect(-5+3-(x21-x11)/2, -10, 4, 6); // 根1
      context.fillRect(-5+3+(x21-x11)/2, -10, 4, 6); // 根2
      context.fillStyle = "rgb(00,88,88)";
      context.beginPath();                           // 树1
      context.moveTo(-15*sqrt_2-(x21-x11)/2, -10);
      context.lineTo( 15*sqrt_2-(x21-x11)/2, -10);
      context.lineTo( 0-(x21-x11)/2, -10-15*sqrt_2);
      context.closePath();
      context.fill();
      context.moveTo(-15*sqrt_2-(x21-x11)/2, -10-5);
      context.lineTo( 15*sqrt_2-(x21-x11)/2, -10-5);
      context.lineTo( 0-(x21-x11)/2, -10-15*sqrt_2-5);
      context.closePath();
      context.fill();
      context.beginPath();                           // 树2
      context.moveTo(-15*sqrt_2+(x21-x11)/2, -10);
      context.lineTo( 15*sqrt_2+(x21-x11)/2, -10);
      context.lineTo( 0+(x21-x11)/2, -10-15*sqrt_2);
      context.closePath();
      context.fill();
      context.moveTo(-15*sqrt_2+(x21-x11)/2, -10-5);
      context.lineTo( 15*sqrt_2+(x21-x11)/2, -10-5);
      context.lineTo( 0+(x21-x11)/2, -10-15*sqrt_2-5);
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
