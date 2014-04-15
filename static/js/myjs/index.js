$(document).ready(function() {
  var canvas  = $("#canvas1");
  var imgbg   = $("#bg");
  var context = canvas.get(0).getContext("2d");
  // 画布尺寸
  var canvasW = canvas.width();
  var canvasH = canvas.height();
  var playInt = 0;
  // 重置和启动
  function init() {
    playInt = 1;
  };
  var current, end;
  function start(playInt) {
    switch (playInt) {
      case 0: return;
      case 1: current = 0;
              end     = 100; 
              welcome(); break;     // 欢迎页面
      case 2: func2(); break;
      case 3: func3(); break;
      case 4: func4(); break;
      case 5: func5(); break;
      case 6: func6(); break;
    }
  };
  function draw_background() {
    context.save();
    context.transform(canvasW/imgbg.width(),0,0,canvasH/imgbg.height(),0,0)
    // context.transform(0.6,0,0,0.15,0,0)
    context.drawImage(imgbg.get(0),0,0);
    context.restore();
  }
  alert(imgbg.width())
  alert(canvasW/imgbg.width());
  function welcome() { // 第一张页面,current
    current += 1;
    context.clearRect(0, 0, canvasW, canvasH);
    draw_background();
    console.log(current);
    if (current<end) {
      setTimeout(welcome, 33);
    }
  };
  function func2() {
    console.log("func2");
    playInt += 1;
  };
  function func3() {
    console.log("func3");
    playInt += 1;
  };
  function func4() {
    console.log("func4");
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
