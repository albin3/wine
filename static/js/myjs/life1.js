
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
  var show1 = 1;
  var show2 = 1;
  var show = 0;
  var current = 0;
  var d1 = {    // 掉下来
    a: 3,
    v: 0,
    h: -canvasH/2,
    init: function() {
      this.a = 3;
      this.v = 0;
      this.h = -canvasH/2;
    },
    shift: function(c) {
      this.v+=this.a;
      this.h+=this.v;
      if (this.h>0) {
        if (this.v<10) {
          this.a = 0;
          this.h = 0;
          this.v = 0;
        }
        this.v = -this.v/2;
      }
    }
  }
  function change() {
    index = (index+1)%3;
    current = 0;
    d1.init();
    show = (show+1)%3
    show1 = parseInt(Math.random()*3)%3*2+1;
    show2 = parseInt(Math.random()*3)%3*2+2;
  }
  function animate() {
    current += 1;
    context.clearRect(0,0,canvasW,canvasH);
    context.drawImage(imgs[0],0,0,640,1008,0,0,canvasW,canvasH);
    display[show*2+1](current);
    display[show*2+2](current);
    context.font      = "bold " + 33 + "px serif";
    context.fillStyle = "rgb(255,255,255)";
    context.fillText("*点击切换效果载入.", 100, canvasH-300);
    setTimeout(animate, 33);
  }
  var display = {   // 效果
    1: function(current) {        // 掉下来
      if (current<100) {
        context.drawImage(imgs[1],0,0,640,1008,0,d1.h,canvasW,canvasH);
        d1.shift();
      } else {
        context.drawImage(imgs[1],0,0,640,1008,0,0,canvasW,canvasH);
      }
    },
    2: function(current) {       // 淡入效果
      var skip = 35;
      if (current<skip) {
      } else if (current<100+skip) {
        var c = current-skip;
        context.save();
        context.globalAlpha = c/100;
        context.drawImage(imgs[2],0,0,640,1008,0,0,canvasW,canvasH);
        context.restore();
      } else
        context.drawImage(imgs[2],0,0,640,1008,0,0,canvasW,canvasH);
    },
    3: function(current) {       // 图片左右双向显示
      var nums = 100;
      var hei = 580;
      if (current<nums) {
        var c = current;
        // 下面这句，有疑问
        context.drawImage(imgs[1],0,0,640*c/nums,1008-hei,0,0,canvasW*c/nums,canvasH*(1008-hei)/1008);
        context.drawImage(imgs[1],640-640*c/nums,1008-hei,640*c/nums,1008-hei,canvasW-canvasW*c/nums,canvasH-canvasH*hei/1008,canvasW*c/nums,canvasH-canvasH*hei/1008);
      } else {
        context.drawImage(imgs[1],0,0,640,1008,0,0,canvasW,canvasH);
      }
    },
    4: function(current) {       // 切片进入
      var p = 150;
      var skip = 60;
      var nums = 30;
      if (current<skip)
        return ;
      if (current<nums+skip) {
        var c = current-skip;
        for (var i=0; i<p; i++) {
          context.drawImage(imgs[2],640*i/p,0,c*640/p/nums,1008,canvasW*i/p,0,c*canvasW/p/nums,canvasH);
        }
      } else
        context.drawImage(imgs[2],0,0,640,1008,0,0,canvasW,canvasH);
    },
    5: function(current) {      // 由大到小
      var scale = 1;
      var nums = 60;
      if (current<nums) {
        var c = current;
        var PI = Math.PI;
        context.save();
        context.transform(1,0,0,1,canvasW/2,canvasH/2);
        context.transform(1,Math.sin(PI*c/nums),-Math.sin(PI*c/nums),1,0,0);
        context.drawImage(imgs[1],0,0,640,1008,-canvasW/2,-canvasH/2,canvasW,canvasH);
        // context.transform(1+scale*(nums-c)/nums,0,0,1+scale*(nums-c)/nums,0,0);
        // context.drawImage(imgs[1],0,0,640,1008,0,0,canvasW,canvasH);
        context.restore();
      } else {
        context.drawImage(imgs[1],0,0,640,1008,0,0,canvasW,canvasH);
      }
    },
    6: function(current) {      // 旋转进入
      var skip = 60;
      var nums = 100;
      if (current<skip)
        return;
      else if (current<nums+skip) {
        var c = current-skip;
        var PI = Math.PI;
        context.save();
        context.transform(1,0,0,1,canvasW/2,canvasH/2);
        context.transform(1,Math.sin(PI*c/nums),Math.sin(PI*c/nums),1,0,0);
        // context.transform(1+scale*(nums-c)/nums,0,0,1+scale*(nums-c)/nums,0,0);
        context.drawImage(imgs[2],0,0,640,1008,-canvasW/2,-canvasH/2,canvasW,canvasH);
        context.restore();
      } else {
        context.drawImage(imgs[2],0,0,640,1008,0,0,canvasW,canvasH);
      }
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

