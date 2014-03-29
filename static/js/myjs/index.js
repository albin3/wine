var fun = function (canvas){
  var w_body  = $("body").width();
  var h_body  = $("body").height();
  canvas.get(0).width  = parseInt(w_body);
  canvas.get(0).height = parseInt(h_body);
};
$(document).ready(function() {
  // 绑定重力感应监听器
  var Orient = {alpha: 0, beta: 0, gamma: 0};
  var Arraw  = {alpha: 0, beta: 0, gamma: 0};
  var CArraw = function(alpha, beta, gamma){
    this.alpha = alpha;
    this.beta  = beta;
    this.gamma = gamma;
    this.shift = 0;
    this.vx    = 0;
    this.ax    = 0;
  };
  // 绑定速度监听器
  var Motion = { ax: 0, ay: 0, az: 0};
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', function(eventData){
      Orient = eventData;
    }, false);
  } else {
  }
  if (window.DeviceMotionEvent) {  
    window.addEventListener('devicemotion',function(eventData){
      Motion.ax = eventData.acceleration.x>0?0:eventData.acceleration.x;
      Motion.ay = eventData.acceleration.y;
      Motion.az = eventData.acceleration.z;
      Arraw.vx  = Arraw.vx + Motion.ax;
      if (Arraw.vx > 5)  Arraw.vx = 5;
      Arraw.shift = Arraw.shift - Arraw.vx;
      if (Arraw.shift<0) {
        Arraw.shift = 0;
        Arraw.vx    = 0;
      }
    }, false);  
  } else {
  }
  var canvas  = $("#canvas1");

  $("img").hide();
  var imgbg   = $("#bg");
  var lgcup   = $("#lgcup");
  var smcup   = $("#smcup");
  var test    = $("#test");
  var back    = $("#back");
  var touch   = $("#touch");
  var touched = $("#touched");
  var context = canvas.get(0).getContext("2d");
  fun(canvas);

  // 画布尺寸
  var canvasW = canvas.width();
  var canvasH = canvas.height();

  var clicked = function (x, y) {
    if (x>=this.x && x<=this.x+this.w && y>=this.y && y<=this.y+this.h)
      return true;
    else
      return false;
  };
  var backbtn = {
    x : 50,
    y : 50,
    w : canvasH/8,
    h : canvasH/8,
    clicked : clicked
  };
  var touchbtn = {
    w : canvasH/7,
    h : canvasH/7,
    x : canvasW/2-canvasH/7/2,
    y : (1-0.1)*canvasH-canvasH/7/2,
    touched : 0,
    clicked : clicked
  };
  var runPage = 0;
  // 重置和启动
  function init() {
    runPage = 1;
  };
  var current, end;
  var wel_run=bal_run=false;
  function start(runPage) {
    switch (runPage) {
      case 0: return;
      case 1: current = 0;
              end     = 100; 
              wel_run = true;
              console.log("start welcome!");
              welcome(); break;     // 欢迎页面
      case 2: func2(); break;
      case 3: current = 0;
              end     = 300;
              bal_run = true;
              console.log("start balance!");
              balance(); break;
      case 4: func4(); break;
      case 5: func5(); break;
      case 6: func6(); break;
    }
  };
  function draw_background() {
    context.save();
    context.fillStyle = "rgb(27,146,226)";
    context.fillRect(0,0,canvasW, canvasH);
    context.restore();
    context.save();
    var smlt_x = 30;      // 小杯子
    var smlt_y = canvasH*0.736;
    var smheight  = canvasH*0.95-smlt_y;
    var smwidth   = smcup.width()*smheight/smcup.height();
    context.drawImage(smcup.get(0), smlt_x, smlt_y, smwidth, smheight);
    var lglt_x = 100;      // 大杯子
    var lglt_y = 200;
    var lgheight  = canvasH*0.95-lglt_y;
    var lgwidth   = lgcup.width()*lgheight/lgcup.height();
    context.transform(1,-Math.sin(30*Math.PI/180),Math.sin(30*Math.PI/180),1,lglt_x,lglt_y);
    context.drawImage(lgcup.get(0), 0, 0, lgwidth, lgheight);
    context.restore();
  }

  function welcome() { // 第一张页面,current
    current += 1;
    context.clearRect(0, 0, canvasW, canvasH);
    // draw_background();
    if (wel_run && current<end) {
      setTimeout(welcome, 33);
    } else {
      console.log("stop welcome!");
      wel_run = false;
      runPage = 3;
      start(runPage);
    }
  };
  function func2() {
    console.log("func2");
  };
  function balance() {
    var Hshift = function() {
      return -10*(Arraw.beta-Orient.beta);
    };
    if (current===0) {
      Arraw = new CArraw(Orient.alpha, Orient.beta, Orient.gamma);
    }
    current += 0.01;
    context.clearRect(0, 0, canvasW, canvasH);
    var drawColor = "rgb(200,200,200)";
    var lineH = canvasH/2;
    var arraw_height = canvasH/25*2;
    var arraw_width  = arraw_height*test.width()/test.height();
    draw_background();                          // 背景
    context.strokeStyle = drawColor;            // 水平线
    context.beginPath();
    context.moveTo(0,lineH);
    context.lineTo(canvasW,lineH);
    context.closePath();
    context.stroke();
    context.drawImage(test.get(0), canvasW/10-arraw_width/2+Arraw.shift*touchbtn.touched, lineH-arraw_height/2+Hshift()*touchbtn.touched, arraw_width, arraw_height);         // 画箭头
    context.fillStyle = drawColor;              // 画一个圆
    context.beginPath();
    context.arc(canvasW/10, lineH, canvasH/50, 0, Math.PI*2, false);
    context.closePath();
    context.fill();
    context.drawImage(back.get(0), backbtn.x, backbtn.y, backbtn.w, backbtn.h); // 画返回键
    if (!touchbtn.touched) {                     // 画开始按钮
      context.drawImage(touch.get(0), touchbtn.x, touchbtn.y, touchbtn.w, touchbtn.h);
    } else {
      context.drawImage(touched.get(0), touchbtn.x, touchbtn.y, touchbtn.w, touchbtn.h);
    }
    if (bal_run && current<end) {
      setTimeout(balance, 33);
    } else {
      // 执行完了以后怎么办
      bal_run = false;
      start(runPage);
    }
    canvas.click(function(e){
      if (touchbtn.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top)) {
        touchbtn.touched = 1;
        Arraw.shift = 0;
        Arraw.vx    = 0;
      }
      if (backbtn.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top)) {
        bal_run = false;
        runPage = 1;
      }
    });
  };
  function func4() {
    playInt += 1;
  };
  function func5() {
    console.log("func5");
    playInt += 1;
  };
  function func6() {
    console.log("func6");
    playInt = 1;
  };
  init();
  start(1);
});
$(window).resize(function(){
  fun($("#canvas1"));
});
