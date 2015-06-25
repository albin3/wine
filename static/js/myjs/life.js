
var fun = function (canvas){
  var w_body  = $("body").width();
  var h_body  = $("body").height();
  canvas.get(0).width  = parseInt(w_body);
  canvas.get(0).height = parseInt(h_body);
};
$().ready(function() {
  var canvas = $('#canvas');
  var canvasW = canvas.width();
  var canvasH = canvas.height();
  var context = canvas.get(0).getContext("2d");
  var imgs = [$("#tu1").get(0), $("#tu2").get(0), $("#tu3").get(0)];
  var index = 1;
  var show = 1;
  var current = 0;
  function change() {
    index = (index+1)%3;
    current = 0;
    show = parseInt(Math.random()*3)%3+1;
  }
  function animate() {
    current += 1;
    context.clearRect(0,0,canvasW,canvasH);
    display[show](current);
    context.font      = "bold " + 33 + "px serif";
    context.fillStyle = "rgb(255,255,255)";
    context.fillText("*这是一张壁纸壁纸，点击切换壁纸.", 100, canvasH-300);
    setTimeout(animate, 33);
  }
  var display = {   // 效果
    1: function(current) {
      if (current<100) {
        context.save();                    // 淡出效果
        context.globalAlpha = current/100;
        context.drawImage(imgs[index],0,0,640,1136,0,0,canvasW,canvasH);
        context.restore();
      } else {
        context.drawImage(imgs[index],0,0,640,1136,0,0,canvasW,canvasH);
      }
    },
    2: function(current) {  // 旋转进入
      if (current<120) {
        context.save();
        var c = current;
        var av = 3;
        context.transform(Math.cos(av*c*Math.PI/180), Math.sin(av*c*Math.PI/180), Math.sin(av*c*Math.PI/180), Math.cos(av*c*Math.PI/180), Math.sin(av*c*Math.PI/180), Math.sin(av*c*Math.PI/180));
        context.drawImage(imgs[index],0,0,640,1136,0,0,canvasW,canvasH);
        context.restore();
      } else
        context.drawImage(imgs[index],0,0,640,1136,0,0,canvasW,canvasH);
    },
    3: function(current) {  // 切片进入
      if (current<100) {
        var c = current;
        context.drawImage(imgs[index],640*0/6,0,c*640/6/100,1136,canvasW*0/6,0,c*canvasW/6/100,canvasH);
        context.drawImage(imgs[index],640*1/6,0,c*640/6/100,1136,canvasW*1/6,0,c*canvasW/6/100,canvasH);
        context.drawImage(imgs[index],640*2/6,0,c*640/6/100,1136,canvasW*2/6,0,c*canvasW/6/100,canvasH);
        context.drawImage(imgs[index],640*3/6,0,c*640/6/100,1136,canvasW*3/6,0,c*canvasW/6/100,canvasH);
        context.drawImage(imgs[index],640*4/6,0,c*640/6/100,1136,canvasW*4/6,0,c*canvasW/6/100,canvasH);
        context.drawImage(imgs[index],640*5/6,0,c*640/6/100,1136,canvasW*5/6,0,c*canvasW/6/100,canvasH);
      } else
        context.drawImage(imgs[index],0,0,640,1136,0,0,canvasW,canvasH);
    }
  };
  canvas.get(0).addEventListener("touchstart",function(e){
    change();
  });
  animate();
});
$(window).resize(function(){
  fun($("#canvas"));
});
