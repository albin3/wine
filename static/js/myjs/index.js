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
      if (Motion.ax < -0.2) {
        Arraw.vx    = 0;
      }
    }, false);
  } else {
  }
  var canvas  = $("#canvas1");

  $("img").hide();
  $("p").hide();
  var imgbg   = $("#bg");
  var lgcup   = $("#lgcup");
  var smcup   = $("#smcup");
  var test    = $("#test");
  var back    = $("#back");
  var touch   = $("#touch");
  var touched = $("#touched");
  var loadbg  = $("#loadbg");
  var load1   = $("#load1");
  var wel_1   = $("#wel_1");
  var wel_2   = $("#wel_2");
  var wel_3   = $("#wel_3");
  var wel_4   = $("#wel_4");
  var wel_q   = $("#wel_q");
  var wel_t   = $("#wel_t");
  var wel_s   = $("#wel_s");
  var ch1_i   = $("#ch1_i");
  var ch1_1   = $("#ch1_1");
  var ch1_2   = $("#ch1_2");
  var ch1_3   = $("#ch1_3");
  var ch1_4   = $("#ch1_4");
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
  var runPage = 0;
  // 重置和启动
  function init() {
    runPage = 6;
  };
  var current, end;
  var wel_run=bal_run=ch1_run=load_run=share_run=false;
  var wel_first_load = true;
  function start(runPage) {
    switch (runPage) {
      case 0: return;
      case 1: if (wel_first_load)
                current = 0;
              else 
                current = 3000;
              wel_run = true;
              console.log("start welcome!");
              welcome(); break;     // 欢迎页面
      case 2: current = 0;
              loadingpage(); break;
      case 3: current = 0;
              end     = 300;
              bal_run = true;
              console.log("start balance!");
              balance(); break;
      case 4: ch1_run = true;
              choose1(); break;
      case 5: testrst(); break;
      case 6: share_run = true;
              sharepage(); break;
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
  var wel_ts    = 10;
  var wel_tl    = 10;
  var wel_tskip = 0.1;// 单次旋转角度
  var wel_w    = canvasH/5; // 显示尺寸
  var wel_last = 23;  // 抖字控制
  var wel_scale= 3;   // 放大倍数
  var wel_b1 = 5+90;  // 开始画照片
  var wel_b2 = 35+90;
  var wel_b3 = 65+90;
  var wel_b4 = 95+90;
  var wel_ch_q = 20;  // 问号移动速度
  var p_wels = {
    s  : 95
  };
  var p_welt = {
    x  : canvasW/5,
    y  : canvasH/12,
    w  : canvasW*3/5,
    h  : (canvasW*3/5)*128/368,
    o  : function(c) {
      if (c<=wel_ts)
        return 0;
      else if (c>wel_ts && c<=wel_ts+wel_tl/4)
        return wel_tskip*(c-wel_ts)*Math.PI/180;
      else if (c>=wel_ts+wel_tl/4 && c<=wel_ts+wel_tl*3/4)
        return wel_tskip*((wel_tl/2-c-wel_ts)*Math.PI/180);
      else if (c>=wel_ts+wel_tl*3/4 && c<=wel_ts+wel_tl)
        return wel_tskip*((c-wel_ts-wel_tl)*Math.PI/180);
      else 
        return 0;
    }
  }
  var p_wel1 = {
    w  :  function(c) {
            if (c<=wel_b1) 
              return 0;
            else if (c>wel_b1&&c<wel_b1+wel_last) {
              return wel_w*((c-wel_b1)*(1-wel_scale)/wel_last + wel_scale);
            } else {
              return 1*wel_w;
            }
          },
    x  :  function(c) {
            if (c>wel_b1&&c<wel_b1+wel_last)
              return canvasW/2 - wel_w*((c-wel_b1)*(1-wel_scale)/wel_last + wel_scale);
            else
              return canvasW/2 - wel_w;
          },
    y  :  function(c) {
            if (c>wel_b1&&c<wel_b1+wel_last)
              return canvasH*4/7 - wel_w*((c-wel_b1)*(1-wel_scale)/wel_last + wel_scale);
            else 
              return canvasH*4/7-wel_w;
          }
  };
  var p_wel2 = {
    w  :  function(c) {
            if (c<=wel_b2) 
              return 0;
            else if (c>wel_b2&&c<wel_b2+wel_last) {
              return wel_w*((c-wel_b2)*(1-wel_scale)/wel_last + wel_scale);
            } else {
              return 1*wel_w;
            }
          },
    x  :  function(c) {
            if (c>wel_b2&&c<wel_b2+wel_last)
              return canvasW/2;
            else
              return canvasW/2;
          },
    y  :  function(c) {
            if (c>wel_b2&&c<wel_b2+wel_last)
              return canvasH*4/7 - wel_w*((c-wel_b2)*(1-wel_scale)/wel_last + wel_scale);
            else 
              return canvasH*4/7-wel_w;
          }
  };
  var p_wel3 = {
    w  :  function(c) {
            if (c<=wel_b3) 
              return 0;
            else if (c>wel_b3&&c<wel_b3+wel_last) {
              return wel_w*((c-wel_b3)*(1-wel_scale)/wel_last + wel_scale);
            } else {
              return 1*wel_w;
            }
          },
    x  :  function(c) {
            if (c>wel_b3&&c<wel_b3+wel_last)
              return canvasW/2 - wel_w*((c-wel_b3)*(1-wel_scale)/wel_last + wel_scale);
            else
              return canvasW/2 - wel_w;
          },
    y  :  function(c) {
            if (c>wel_b3&&c<wel_b3+wel_last)
              return canvasH*4/7;
            else 
              return canvasH*4/7;
          }
  };
  var p_wel4 = {
    w  :  function(c) {
            if (c<=wel_b4)
              return 0;
            else if (c>wel_b4&&c<wel_b4+wel_last) {
              return wel_w*((c-wel_b4)*(1-wel_scale)/wel_last + wel_scale);
            } else {
              return 1*wel_w;
            }
          },
    x  :  function(c) {
            if (c>wel_b4&&c<wel_b4+wel_last)
              return canvasW/2;
            else
              return canvasW/2;
          },
    y  :  function(c) {
            if (c>wel_b3&&c<wel_b3+wel_last)
              return canvasH*4/7;
            else 
              return canvasH*4/7;
          }
  };
  var p_welq = {
    w  :  function(c) {
            if (c<wel_b4+wel_last)
              return 0;
            else
              return wel_w;
          },
    x  :  function(c) {
            if (c<wel_b4+wel_last)
              return -10;
            else if (Math.floor((c-wel_b4-wel_last)/wel_ch_q)%4===0)
              return canvasW/2-wel_w;
            else if (Math.floor((c-wel_b4-wel_last)/wel_ch_q)%4===1)
              return canvasW/2;
            else if (Math.floor((c-wel_b4-wel_last)/wel_ch_q)%4===2)
              return canvasW/2;
            else (Math.floor((c-wel_b4-wel_last)/wel_ch_q)%4===3)
              return canvasW/2-wel_w;
          },
    y  :  function(c) {
            if (c<wel_b4+wel_last)
              return -10;
            else if (Math.floor((c-wel_b4-wel_last)/wel_ch_q)%4===0)
              return canvasH*4/7-wel_w;
            else if (Math.floor((c-wel_b4-wel_last)/wel_ch_q)%4===1)
              return canvasH*4/7-wel_w;
            else if (Math.floor((c-wel_b4-wel_last)/wel_ch_q)%4===2)
              return canvasH*4/7;
            else (Math.floor((c-wel_b4-wel_last)/wel_ch_q)%4===3)
              return canvasH*4/7;
          }
  };
  var wel_bt_a = 3;
  var wel_bt_v = 0;
  var wel_bt_y = 0;
  var wel_bt_delay = 30;
  var wel_bt_h1 = 0;
  var wel_bt_h2 = 262;
  var wel_bt_h3 = canvasH*0.7;
  var p_wels = {
    x  :  function(c) {
            if (c<wel_b4+wel_last+wel_bt_delay)
              return 0;
            else 
              return canvasW/3
          },
    y  :  function(c) {
            if (c<wel_b4+wel_last+wel_bt_delay)
              return 0;
            else {
              wel_bt_v = wel_bt_v + wel_bt_a;
              wel_bt_y = wel_bt_y + wel_bt_v;
              if (wel_bt_y >= canvasH*0.8) {
                wel_bt_v = 0 - wel_bt_v*4/5;
              }
              if (wel_bt_y >= canvasH*0.85 && Math.abs(wel_bt_v)<=wel_bt_a*4/5) {
                wel_bt_y = 0.85*canvasH;
                wel_bt_v = 0;
              }
              return wel_bt_y;
            }
          },
    w  :  function(c) {
            if (c<wel_b4+wel_last+wel_bt_delay)
              return 0;
            else
              return canvasW/3;
          },
    h  :  function(c) {
            if (c<wel_b4+wel_last+wel_bt_delay)
              return 0;
            else
              return canvasW/3*72/240
          },
    clicked: function(x, y, c) {
             var _x = this.x(c);
             var _y = this.y(c);
             var _w = this.w(c);
             var _h = this.h(c);
             if (_x<x&&x<_x+_w && _y<y&&y<_y+_h)
               return true;
             else 
               return false;
           }
  };
  function welcome() {       // 第一张页面，欢迎页面。
    context.save();
    current += 1;
    context.clearRect(0, 0, canvasW, canvasH);
    context.save();
    var tmp = 0;
    if (current<70)
      tmp = p_welt.o((current-10)%10+10);
    else 
      tmp = p_welt.o(current);
    context.transform(Math.cos(tmp),-Math.sin(tmp),Math.sin(tmp),Math.cos(tmp),p_welt.x+p_welt.w/2,p_welt.y+p_welt.h/2);
    context.drawImage(wel_t.get(0), -p_welt.w/2, -p_welt.h/2, p_welt.w, p_welt.h);
    context.restore();
    context.drawImage(wel_1.get(0), p_wel1.x(current), p_wel1.y(current), p_wel1.w(current), p_wel1.w(current));
    context.drawImage(wel_2.get(0), p_wel2.x(current), p_wel2.y(current), p_wel2.w(current), p_wel2.w(current));
    context.drawImage(wel_3.get(0), p_wel3.x(current), p_wel3.y(current), p_wel3.w(current), p_wel3.w(current));
    context.drawImage(wel_4.get(0), p_wel4.x(current), p_wel4.y(current), p_wel4.w(current), p_wel4.w(current));
    context.drawImage(wel_q.get(0), p_welq.x(current), p_welq.y(current), p_welq.w(current), p_welq.w(current));
    context.drawImage(wel_s.get(0), p_wels.x(current), p_wels.y(current), p_wels.w(current), p_wels.h(current));
    // draw_background();
    if (wel_run) {
      setTimeout(welcome, 33);
    } else {
      console.log("stop welcome!");
      wel_run = false;
      wel_first_load = false;
      runPage = 3;
      start(runPage);
    }
    canvas.click(function(e){
      if (p_wels.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top, current) && wel_run) {
        wel_run = false;
        runPage = 3;
      } else {
      }
    });
    context.restore();
  };
  var p_load1 = {
    i   :  255
  };
  function loadingpage() {
    setTimeout(loadingpage, 33);
  };
  var backbtn = {
    x : canvasH/16,
    y : canvasH/16,
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
  function balance() {
    context.save();
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
      // context.drawImage(touched.get(0), touchbtn.x, touchbtn.y, touchbtn.w, touchbtn.h);
    }
    if (bal_run && current<end) {
      setTimeout(balance, 33);
    } else {
      // 执行完了以后怎么办
      bal_run = false;
      start(runPage);
    }
    canvas.click(function(e){
      if (touchbtn.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top) && bal_run) {
        touchbtn.touched = 1;
        Arraw.shift = 0;
        Arraw.vx    = 0;
        console.log(touchbtn.touched);
      }
      if (backbtn.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top) && bal_run) {
        bal_run = false;
        touchbtn.touched = 0;
        console.log(touchbtn.touched);
        runPage = 1;
      }
    });
    context.restore();
  };
  var chpicrate = 263/273;
  var chpwhite  = 0.02;
  var chp1h     = 0.37;   // 第一张图片的高
  var p_ch1i = {
    h   :  canvasH*chp1h,
    w   :  canvasH*chp1h*700/233,
    y   :  0,
    x   :  (canvasW-canvasH*chp1h*700/233)/2
  }
  var p_ch11 = {
    h   :  0.25*canvasH,
    w   :  0.25*canvasH,
    y   :  (chp1h+chpwhite)*canvasH,
    x   :  0.5*canvasW-chpwhite/2*canvasH-0.25*canvasH
  }
  var p_ch12 = {
    h   :  0.25*canvasH,
    w   :  0.25*canvasH,
    y   :  (chp1h+chpwhite)*canvasH,
    x   :  0.5*canvasW+chpwhite/2*canvasH
  }
  var p_ch13 = {
    h   :  0.25*canvasH,
    w   :  0.25*canvasH,
    y   :  (chp1h+chpwhite)*canvasH+0.25*canvasH+chpwhite*canvasH,
    x   :  0.5*canvasW-chpwhite/2*canvasH-0.25*canvasH
  }
  var p_ch14 = {
    h   :  0.25*canvasH,
    w   :  0.25*canvasH,
    y   :  (chp1h+chpwhite)*canvasH+0.25*canvasH+chpwhite*canvasH,
    x   :  0.5*canvasW+chpwhite/2*canvasH
  }
  function choose1() {
    context.save();
    context.drawImage(ch1_i.get(0), p_ch1i.x, p_ch1i.y, p_ch1i.w, p_ch1i.h);
    context.drawImage(ch1_1.get(0), p_ch11.x, p_ch11.y, p_ch11.w, p_ch11.h);
    context.drawImage(ch1_2.get(0), p_ch12.x, p_ch12.y, p_ch12.w, p_ch12.h);
    context.drawImage(ch1_3.get(0), p_ch13.x, p_ch13.y, p_ch13.w, p_ch13.h);
    context.drawImage(ch1_4.get(0), p_ch14.x, p_ch14.y, p_ch14.w, p_ch14.h);
    context.restore();
    if (ch1_run) {
      setTimeout(choose1, 33);
    }
  };
  function testrst() {
    context.save();
    var text = "共产h,h";
    context.font = "30px 黑体";
    context.fillText(text, 0, 30);
    context.restore();
    setTimeout(testrst, 33);
  };
  var p_sha_t1 = {
    w : (1-0.075-0.15/2)/18*canvasW,
    x : 0.15/2*canvasW,
    y : 0.43*canvasH+(1-0.75-0.75)/18*canvasW
  };
  function sharepage() {
    context.clearRect(0, 0, canvasW, canvasH);
    context.fillRect(backbtn.x, backbtn.y, backbtn.w, backbtn.h);
    context.drawImage(back.get(0), backbtn.x, backbtn.y, backbtn.w, backbtn.h); // 画返回键
    context.save();
    var text = $("#psharei").text();
    context.fillStyle = "rgb(91,91,91)";
    context.font = "italic "+p_sha_t1.w+"px 黑体";
    context.fillText(text.slice(0,16), p_sha_t1.x+p_sha_t1.w, p_sha_t1.y);
    context.fillText(text.slice(16), p_sha_t1.x, p_sha_t1.y+p_sha_t1.w*1.5);
    context.restore();
    context.fillStyle = "rgb(113,123,133)";
    setTimeout(sharepage, 33);
  };
  init();
  start(runPage);
});
$(window).resize(function(){
  fun($("#canvas1"));
});
