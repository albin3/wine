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
  var CArraw = function(alpha, beta, gamma) {
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
      // Arraw.vx  = Arraw.vx + Motion.ax;
      Arraw.vx  = 5;
      if (Arraw.vx > 5)  Arraw.vx = 5;
      // Arraw.shift = Arraw.shift - Arraw.vx;
      Arraw.shift = Arraw.shift + Arraw.vx;
      if (Arraw.shift<0) {
        Arraw.shift = 0;
        Arraw.vx    = 0;
      }
      if (Motion.ax < -0.2) {
        // Arraw.vx    = 0;
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
  var back_w  = $("#back_w");
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
  var ch_i    = [$("#chi_1"), $("#chi_2"), $("#chi_3"), $("#chi_4"), $("#chi_5")];
  var ch_1    = [$("#ch1_1"), $("#ch1_2"), $("#ch1_3"), $("#ch1_4"), $("#ch1_5")];
  var ch_2    = [$("#ch2_1"), $("#ch2_2"), $("#ch2_3"), $("#ch2_4"), $("#ch2_5")];
  var ch_3    = [$("#ch3_1"), $("#ch3_2"), $("#ch3_3"), $("#ch3_4"), $("#ch3_5")];
  var ch_4    = [$("#ch4_1"), $("#ch4_2"), $("#ch4_3"), $("#ch4_4"), $("#ch4_5")];
  var ch_bg   = [$("#chbg_1"), $("#chbg_2"), $("#chbg_3"), $("#chbg_4"), $("#chbg_5")];
  var ch_shadow = $("#sha_gbg");
  var ch_index= 0;
  var sha_i   = $("#sha_i");
  var sha_btn1= $("#sha_b1");
  var sha_btn2= $("#sha_b2");
  var sha_gbg = $("#sha_gbg");
  var sha_g   = $("#sha_g");
  var rst_b   = $("#rst_b");
  var rst_i   = [$("#rst1"), $("#rst2"), $("#rst3"), $("#rst4")];
  var rst_t1  = [$("#prst11").text(), $("#prst12").text(), $("#prst13").text(), $("#prst14").text()];
  var rst_t2  = [$("#prst21").text(), $("#prst22").text(), $("#prst23").text(), $("#prst24").text()];
  var rst_t3  = [$("#prst31").text(), $("#prst32").text(), $("#prst33").text(), $("#prst34").text()];
  var context = canvas.get(0).getContext("2d");
  fun(canvas);

  // 画布尺寸
  var canvasW = canvas.width(); var canvasH = canvas.height();

  var clicked = function (x, y) {
    if (x>=this.x && x<=this.x+this.w && y>=this.y && y<=this.y+this.h)
      return true;
    else
      return false;
  };
  var runPage = 0;
  // 重置和启动
  function init() {
    runPage = 1;
  };
  var current, end;
  var wel_run=bal_run=ch1_run=ch2_run=ch3_run=ch4_run=ch5_run=load_run=rst_run=share_run=false;
  var sha_random=[1, 5, 9];
  var wel_first_load = true;
  var share_show     = 0;
  var bal_maxshift   = 0;
  var rst_score = 0;
  var rst_class = 0;
  var WELCOME_PAGE = 1;
  var LOADING_PAGE = 2;
  var BALANCE_PAGE = 8;
  var CHOOSE1_PAGE = 3;
  var CHOOSE2_PAGE = 4;
  var CHOOSE3_PAGE = 5;
  var CHOOSE4_PAGE = 6;
  var CHOOSE5_PAGE = 7;
  var RESULT_PAGE  = 9;
  var SHARE_PAGE   = 10;
  var click_delay  = 10;
  function start(runPage) {
    switch (runPage) {
      case 0: runPage+=1; return;
      case 1: if (wel_first_load)         // #1 欢迎页面
                current = 0;
              else 
                current = 3000;
              if (!wel_run) {
                wel_run = true;
                console.log("start welcome!");
                welcome();
              }
              break;
      case 2: current = 0;                // #2 加载页面
              loadingpage();
              break;
      case 8: current = 0;                // #3 平衡页面
              end     = 300;
              bal_maxshift = 0;
              if (!bal_run) {
                bal_run = true;
                console.log("start balance!");
                balance();
              }
              break;
      case 3:                             // #4 选择题1
              current = 0;
              if (!ch1_run) {
                ch1_run = true;
                choose1(); 
              }
              break;
      case 4:                             // #5 选择题2
              current = 0;
              if (!ch2_run) {
                ch2_run = true;
                choose2(); 
              }
              break;
      case 5:                             // #6 选择题3
              current = 0;
              if (!ch3_run) {
                ch3_run = true;
                choose3(); 
              }
              break;
      case 6:                             // #7 选择题4
              current = 0;
              if (!ch4_run) {
                ch4_run = true;
                choose4(); 
              }
              break;
      case 7:                             // #8 选择题5
              current = 0;
              if (!ch5_run) {
                ch5_run = true;
                choose5(); 
              }
              break;
      case 9:                             // #9 结果页面
              current = 0;
              if (!rst_run) {
                rst_score  = 0;
                rst_score += parseInt($("#pscore1").text());
                rst_score += parseInt($("#pscore2").text());
                rst_score += parseInt($("#pscore3").text());
                rst_score += parseInt($("#pscore4").text());
                rst_score += parseInt($("#pscore5").text());
                if (rst_score<8) {
                  rst_class = 0;
                } else if (rst_score>=8&&rst_score<=10) {
                  rst_class = 1;
                } else if (rst_score>=11&&rst_score<=15) {
                  rst_class = 2;
                } else {
                  rst_class = 3;
                }
                rst_run = true;
                testrst(); 
              }
              break;
      case 10:                          // #10 分享页面
              current = 0;
              if (!share_run) {
                share_run = true;
                sha_random[0] = Math.ceil(Math.random()*4);
                sha_random[1] = Math.ceil(Math.random()*4+4);
                sha_random[2] = Math.ceil(Math.random()*4+8);
                sharepage(); 
              }
              break;
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
  // ---------------欢迎页面-------------- #1
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
  var wel_bt_hr = 40;
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
              if (wel_bt_y >= canvasH*0.85) {
                // wel_bt_v = 0 - wel_bt_v*4/10;
                wel_bt_hr -= wel_bt_hr>0 ? 15 : 0;
                wel_bt_v = 0 - wel_bt_hr;
                wel_bt_v = wel_bt_hr<0 ? 0 : wel_bt_v;
              }
              if (wel_bt_y >= canvasH*0.85 && Math.abs(wel_bt_v)<=wel_bt_a*4/10) {
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
/*  高斯模糊--太卡
    if (p_wel1.w(current)>0&&p_wel1.w(current)>0) {
      var imageData = context.getImageData(p_wel1.x(3000), p_wel1.y(3000), p_wel1.w(3000), p_wel1.w(3000));
      Gaussian_blur(imageData.data, p_wel1.w(3000), p_wel1.w(3000), 20, 1);
      context.putImageData(imageData, 0,0);
    }
    */

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
    context.restore();
  };
  canvas.get(0).addEventListener("touchstart",function(e){     // 欢迎页面点击响应   $1
    if (p_wels.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top, current) && wel_run && current >= click_delay) {
      wel_run = false;
    } else {
    }
  });
  // ---------------载入页面-------------- #2
  var p_load1 = {
    i   :  255
  };
  function loadingpage() {
    setTimeout(loadingpage, 33);
  };
  // --------------重力感应页面---------- #3
  var backbtn = {
    x : canvasH*20/1008,
    y : canvasH*20/1008,
    w : canvasH*100/1008,
    h : canvasH*100/1008,
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
  var passThisPage = 0.7*canvasW;
  function balance() {
    if (current === 0) {
      touchbtn.touched = 0;
    }
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
    context.drawImage(back_w.get(0), backbtn.x, backbtn.y, backbtn.w, backbtn.h); // 画返回键
    if (!touchbtn.touched) {                     // 画开始按钮
      context.drawImage(touch.get(0), touchbtn.x, touchbtn.y, touchbtn.w, touchbtn.h);
    } else {
      context.drawImage(touched.get(0), touchbtn.x, touchbtn.y, touchbtn.w, touchbtn.h);
    }
    if (canvasW/10-arraw_width/2+Arraw.shift*touchbtn.touched > passThisPage) {
      bal_run = false;    // 终止页面
      runPage += 1;
    }
    if (bal_maxshift < Hshift()*touchbtn.touched) {
      bal_maxshift = Hshift()*touchbtn.touched;
    }
    if (bal_run && current<end) {
      setTimeout(balance, 33);
    } else {
      // 执行完了以后怎么办
      bal_run = false;
      start(runPage);
    }
    context.restore();
  };
  canvas.get(0).addEventListener("touchstart",function(e){     // 重力平衡点击响应 $3
    if (touchbtn.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top) && bal_run && current >= click_delay/100) {
      touchbtn.touched = 1-touchbtn.touched;
      Arraw.shift = 0;
      Arraw.vx    = 0;
      console.log(touchbtn.touched);
    }
    if (backbtn.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top) && bal_run && current >= click_delay/100) {
      bal_run = false;
      touchbtn.touched = 0;
      runPage -= 1;
    }
  });
  // ---------------选择题一页面-------------- #4
  var chpicrate = 263/273;
  var chpwhite  = 0.02;
  var chp1h     = 0.37;   // 第一张图片的高
  var score_set = [[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4]]
  var choose_set = [[true,true,true,true],[true,true,true,true],[true,true,true,true],[true,true,true,true],[true,true,true,true]];
  var just_clicked = false;
  var just_delay = 600;
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
    x   :  0.5*canvasW-chpwhite/2*canvasH-0.25*canvasH,
    clicked : clicked
  }
  var p_ch12 = {
    h   :  0.25*canvasH,
    w   :  0.25*canvasH,
    y   :  (chp1h+chpwhite)*canvasH,
    x   :  0.5*canvasW+chpwhite/2*canvasH,
    clicked : clicked
  }
  var p_ch13 = {
    h   :  0.25*canvasH,
    w   :  0.25*canvasH,
    y   :  (chp1h+chpwhite)*canvasH+0.25*canvasH+chpwhite*canvasH,
    x   :  0.5*canvasW-chpwhite/2*canvasH-0.25*canvasH,
    clicked : clicked
  }
  var p_ch14 = {
    h   :  0.25*canvasH,
    w   :  0.25*canvasH,
    y   :  (chp1h+chpwhite)*canvasH+0.25*canvasH+chpwhite*canvasH,
    x   :  0.5*canvasW+chpwhite/2*canvasH,
    clicked : clicked
  }
  function choose1() {
    context.clearRect(0, 0, canvasW, canvasH);
    current += 1;
    ch_index = 0;
    context.save();
    context.drawImage(ch_i[ch_index].get(0), p_ch1i.x, p_ch1i.y, p_ch1i.w, p_ch1i.h);
    context.drawImage(ch_1[ch_index].get(0), p_ch11.x, p_ch11.y, p_ch11.w, p_ch11.h);
    if (!choose_set[ch_index][0]) {
      context.drawImage(ch_shadow.get(0), p_ch11.x, p_ch11.y, p_ch11.w, p_ch11.h);
    }
    context.drawImage(ch_2[ch_index].get(0), p_ch12.x, p_ch12.y, p_ch12.w, p_ch12.h);
    if (!choose_set[ch_index][1]) {
      context.drawImage(ch_shadow.get(0), p_ch12.x, p_ch12.y, p_ch12.w, p_ch12.h);
    }
    context.drawImage(ch_3[ch_index].get(0), p_ch13.x, p_ch13.y, p_ch13.w, p_ch13.h);
    if (!choose_set[ch_index][2]) {
      context.drawImage(ch_shadow.get(0), p_ch13.x, p_ch13.y, p_ch13.w, p_ch13.h);
    }
    context.drawImage(ch_4[ch_index].get(0), p_ch14.x, p_ch14.y, p_ch14.w, p_ch14.h);
    if (!choose_set[ch_index][3]) {
      context.drawImage(ch_shadow.get(0), p_ch14.x, p_ch14.y, p_ch14.w, p_ch14.h);
    }
    context.drawImage(back.get(0), backbtn.x, backbtn.y, backbtn.w, backbtn.h);
    context.restore();
    if (ch1_run) {
      setTimeout(choose1, 33);
    } else {
      start(runPage);
    }
  };
  canvas.get(0).addEventListener("touchstart",function(e){     // 第一个选择题响应 $4
    if (backbtn.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top) && ch1_run && current >= click_delay) {
      runPage = WELCOME_PAGE;
      ch1_run = false;
    }
    if (p_ch11.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top) && ch1_run && current >= click_delay) {
      $("#pscore"+ch_index).text(parseInt(score_set[ch_index][0]));
      choose_set[ch_index][0] = true;
      choose_set[ch_index][1] = false;
      choose_set[ch_index][2] = false;
      choose_set[ch_index][3] = false;
      runPage += 1;
      ch1_run = false;
    }
    if (p_ch12.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top) && ch1_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[ch_index][1]);
      choose_set[ch_index][0] = false;
      choose_set[ch_index][1] = true;
      choose_set[ch_index][2] = false;
      choose_set[ch_index][3] = false;
      runPage += 1;
      ch1_run = false;
    }
    if (p_ch13.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top) && ch1_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[ch_index][2]);
      choose_set[ch_index][0] = false;
      choose_set[ch_index][1] = false;
      choose_set[ch_index][2] = true; 
      choose_set[ch_index][3] = false;
      runPage += 1;
      ch1_run = false;
    }
    if (p_ch14.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top) && ch1_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[ch_index][3]);
      choose_set[ch_index][0] = false;
      choose_set[ch_index][1] = false;
      choose_set[ch_index][2] = false;
      choose_set[ch_index][3] = true;
      runPage += 1;
      ch1_run = false;
    }
  });
  // -------------第二个选择题页面------------- #5
  function choose2() {
    context.clearRect(0, 0, canvasW, canvasH);
    current += 1;
    ch_index = 1;
    context.save();
    context.drawImage(ch_i[ch_index].get(0), p_ch1i.x, p_ch1i.y, p_ch1i.w, p_ch1i.h);
    context.drawImage(ch_1[ch_index].get(0), p_ch11.x, p_ch11.y, p_ch11.w, p_ch11.h);
    if (!choose_set[ch_index][0]) {
      context.drawImage(ch_shadow.get(0), p_ch11.x, p_ch11.y, p_ch11.w, p_ch11.h);
    }
    context.drawImage(ch_2[ch_index].get(0), p_ch12.x, p_ch12.y, p_ch12.w, p_ch12.h);
    if (!choose_set[ch_index][1]) {
      context.drawImage(ch_shadow.get(0), p_ch12.x, p_ch12.y, p_ch12.w, p_ch12.h);
    }
    context.drawImage(ch_3[ch_index].get(0), p_ch13.x, p_ch13.y, p_ch13.w, p_ch13.h);
    if (!choose_set[ch_index][2]) {
      context.drawImage(ch_shadow.get(0), p_ch13.x, p_ch13.y, p_ch13.w, p_ch13.h);
    }
    context.drawImage(ch_4[ch_index].get(0), p_ch14.x, p_ch14.y, p_ch14.w, p_ch14.h);
    if (!choose_set[ch_index][3]) {
      context.drawImage(ch_shadow.get(0), p_ch14.x, p_ch14.y, p_ch14.w, p_ch14.h);
    }
    context.drawImage(back.get(0), backbtn.x, backbtn.y, backbtn.w, backbtn.h);
    context.restore();
    if (ch2_run) {
      setTimeout(choose2, 33);
    } else {
      start(runPage);
    }
  };
  canvas.get(0).addEventListener("touchstart",function(e){    // 第二个选择题响应 $5
    if (backbtn.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top) && ch2_run && current >= click_delay) {
      runPage -= 1;
      ch2_run = false;
    }
    if (p_ch11.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top) && ch2_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[ch_index][0]);
      choose_set[ch_index][0] = true;
      choose_set[ch_index][1] = false;
      choose_set[ch_index][2] = false;
      choose_set[ch_index][3] = false;
      runPage += 1;
      ch2_run = false;
    }
    if (p_ch12.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top) && ch2_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[ch_index][1]);
      choose_set[ch_index][0] = false;
      choose_set[ch_index][1] = true;
      choose_set[ch_index][2] = false;
      choose_set[ch_index][3] = false;
      runPage += 1;
      ch2_run = false;
    }
    if (p_ch13.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top) && ch2_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[ch_index][2]);
      choose_set[ch_index][0] = false;
      choose_set[ch_index][1] = false;
      choose_set[ch_index][2] = true;
      choose_set[ch_index][3] = false;
      runPage += 1;
      ch2_run = false;
    }
    if (p_ch14.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top) && ch2_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[ch_index][3]);
      choose_set[ch_index][0] = false;
      choose_set[ch_index][1] = false;
      choose_set[ch_index][2] = false;
      choose_set[ch_index][3] = true;
      runPage += 1;
      ch2_run = false;
    }
  });
  // --------------第三个选择题页面------------- #6
  function choose3() {
    context.clearRect(0, 0, canvasW, canvasH);
    current += 1;
    ch_index = 2;
    context.save();
    context.drawImage(ch_i[ch_index].get(0), p_ch1i.x, p_ch1i.y, p_ch1i.w, p_ch1i.h);
    context.drawImage(ch_1[ch_index].get(0), p_ch11.x, p_ch11.y, p_ch11.w, p_ch11.h);
    if (!choose_set[ch_index][0]) {
      context.drawImage(ch_shadow.get(0), p_ch11.x, p_ch11.y, p_ch11.w, p_ch11.h);
    }
    context.drawImage(ch_2[ch_index].get(0), p_ch12.x, p_ch12.y, p_ch12.w, p_ch12.h);
    if (!choose_set[ch_index][1]) {
      context.drawImage(ch_shadow.get(0), p_ch12.x, p_ch12.y, p_ch12.w, p_ch12.h);
    }
    context.drawImage(ch_3[ch_index].get(0), p_ch13.x, p_ch13.y, p_ch13.w, p_ch13.h);
    if (!choose_set[ch_index][2]) {
      context.drawImage(ch_shadow.get(0), p_ch13.x, p_ch13.y, p_ch13.w, p_ch13.h);
    }
    context.drawImage(ch_4[ch_index].get(0), p_ch14.x, p_ch14.y, p_ch14.w, p_ch14.h);
    if (!choose_set[ch_index][3]) {
      context.drawImage(ch_shadow.get(0), p_ch14.x, p_ch14.y, p_ch14.w, p_ch14.h);
    }
    context.drawImage(back.get(0), backbtn.x, backbtn.y, backbtn.w, backbtn.h);
    context.restore();
    if (ch3_run) {
      setTimeout(choose3, 33);
    } else {
      start(runPage);
    }
  };
  canvas.get(0).addEventListener("touchstart",function(e){      // 选择题3响应 $6
    if (backbtn.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top) && ch3_run && current >= click_delay) {
      runPage -= 1;
      ch3_run = false;
    }
    if (p_ch11.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top) && ch3_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[2][0]);
      choose_set[2][0] = true;
      choose_set[2][1] = false;
      choose_set[2][2] = false;
      choose_set[2][3] = false;
      runPage += 1;
      ch3_run = false;
    }
    if (p_ch12.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top) && ch3_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[2][1]);
      choose_set[2][0] = false;
      choose_set[2][1] = true;
      choose_set[2][2] = false;
      choose_set[2][3] = false;
      runPage += 1;
      ch3_run = false;
    }
    if (p_ch13.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top) && ch3_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[2][2]);
      choose_set[2][0] = false;
      choose_set[2][1] = false;
      choose_set[2][2] = true;
      choose_set[2][3] = false;
      runPage += 1;
      ch3_run = false;
    }
    if (p_ch14.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top) && ch3_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[ch_index][3]);
      choose_set[ch_index][0] = false;
      choose_set[ch_index][1] = false;
      choose_set[ch_index][2] = false;
      choose_set[ch_index][3] = true;
      runPage += 1;
      ch3_run = false;
    }
  });
  // ---------------选择题4页面-------------- #7
  function choose4() {
    context.clearRect(0, 0, canvasW, canvasH);
    current += 1;
    ch_index = 3;
    context.save();
    context.drawImage(ch_i[ch_index].get(0), p_ch1i.x, p_ch1i.y, p_ch1i.w, p_ch1i.h);
    context.drawImage(ch_1[ch_index].get(0), p_ch11.x, p_ch11.y, p_ch11.w, p_ch11.h);
    if (!choose_set[ch_index][0]) {
      context.drawImage(ch_shadow.get(0), p_ch11.x, p_ch11.y, p_ch11.w, p_ch11.h);
    }
    context.drawImage(ch_2[ch_index].get(0), p_ch12.x, p_ch12.y, p_ch12.w, p_ch12.h);
    if (!choose_set[ch_index][1]) {
      context.drawImage(ch_shadow.get(0), p_ch12.x, p_ch12.y, p_ch12.w, p_ch12.h);
    }
    context.drawImage(ch_3[ch_index].get(0), p_ch13.x, p_ch13.y, p_ch13.w, p_ch13.h);
    if (!choose_set[ch_index][2]) {
      context.drawImage(ch_shadow.get(0), p_ch13.x, p_ch13.y, p_ch13.w, p_ch13.h);
    }
    context.drawImage(ch_4[ch_index].get(0), p_ch14.x, p_ch14.y, p_ch14.w, p_ch14.h);
    if (!choose_set[ch_index][3]) {
      context.drawImage(ch_shadow.get(0), p_ch14.x, p_ch14.y, p_ch14.w, p_ch14.h);
    }
    context.drawImage(back.get(0), backbtn.x, backbtn.y, backbtn.w, backbtn.h);
    context.restore();
    if (ch4_run) {
      setTimeout(choose4, 33);
    } else {
      start(runPage);
    }
  };
  canvas.get(0).addEventListener("touchstart",function(e){      // 选择题4响应 $7
    if (backbtn.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top) && ch4_run && current >= click_delay) {
      runPage -= 1;
      ch4_run = false;
    }
    if (p_ch11.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top) && ch4_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[3][0]);
      choose_set[3][0] = true;
      choose_set[3][1] = false;
      choose_set[3][2] = false;
      choose_set[3][3] = false;
      runPage += 1;
      ch4_run = false;
    }
    if (p_ch12.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top) && ch4_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[3][1]);
      choose_set[3][0] = false;
      choose_set[3][1] = true;
      choose_set[3][2] = false;
      choose_set[3][3] = false;
      runPage += 1;
      ch4_run = false;
    }
    if (p_ch13.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top) && ch4_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[3][2]);
      choose_set[3][0] = false;
      choose_set[3][1] = false;
      choose_set[3][2] = true;
      choose_set[3][3] = false;
      runPage += 1;
      ch4_run = false;
    }
    if (p_ch14.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top) && ch4_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[3][3]);
      choose_set[3][0] = false;
      choose_set[3][1] = false;
      choose_set[3][2] = false;
      choose_set[3][3] = true;
      runPage += 1;
      ch4_run = false;
    }
  });
  // ----------------选择题5------------- #8
  function choose5() {
    context.clearRect(0, 0, canvasW, canvasH);
    current += 1;
    ch_index = 4;
    context.save();
    context.drawImage(ch_i[ch_index].get(0), p_ch1i.x, p_ch1i.y, p_ch1i.w, p_ch1i.h);
    context.drawImage(ch_1[ch_index].get(0), p_ch11.x, p_ch11.y, p_ch11.w, p_ch11.h);
    if (!choose_set[ch_index][0]) {
      context.drawImage(ch_shadow.get(0), p_ch11.x, p_ch11.y, p_ch11.w, p_ch11.h);
    }
    context.drawImage(ch_2[ch_index].get(0), p_ch12.x, p_ch12.y, p_ch12.w, p_ch12.h);
    if (!choose_set[ch_index][1]) {
      context.drawImage(ch_shadow.get(0), p_ch12.x, p_ch12.y, p_ch12.w, p_ch12.h);
    }
    context.drawImage(ch_3[ch_index].get(0), p_ch13.x, p_ch13.y, p_ch13.w, p_ch13.h);
    if (!choose_set[ch_index][2]) {
      context.drawImage(ch_shadow.get(0), p_ch13.x, p_ch13.y, p_ch13.w, p_ch13.h);
    }
    context.drawImage(ch_4[ch_index].get(0), p_ch14.x, p_ch14.y, p_ch14.w, p_ch14.h);
    if (!choose_set[ch_index][3]) {
      context.drawImage(ch_shadow.get(0), p_ch14.x, p_ch14.y, p_ch14.w, p_ch14.h);
    }
    context.drawImage(back.get(0), backbtn.x, backbtn.y, backbtn.w, backbtn.h);
    context.restore();
    if (ch5_run) {
      setTimeout(choose5, 33);
    } else {
      start(runPage);
    }
  };
  canvas.get(0).addEventListener("touchstart",function(e){      // 选择题5响应 $8
    if (backbtn.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top) && ch5_run && current >= click_delay) {
      runPage -= 1;
      ch5_run = false;
    }
    if (p_ch11.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top) && ch5_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[4][0]);
      choose_set[4][0] = true;
      choose_set[4][1] = false;
      choose_set[4][2] = false;
      choose_set[4][3] = false;
      runPage += 1;
      ch5_run = false;
    }
    if (p_ch12.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top) && ch5_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[4][1]);
      choose_set[4][0] = false;
      choose_set[4][1] = true;
      choose_set[4][2] = false;
      choose_set[4][3] = false;
      runPage += 1;
      ch5_run = false;
    }
    if (p_ch13.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top) && ch5_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[4][2]);
      choose_set[4][0] = false;
      choose_set[4][1] = false;
      choose_set[4][2] = true;
      choose_set[4][3] = false;
      runPage += 1;
      ch5_run = false;
    }
    if (p_ch14.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top) && ch5_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[4][3]);
      choose_set[4][0] = false;
      choose_set[4][1] = false;
      choose_set[4][2] = false;
      choose_set[4][3] = true;
      runPage += 1;
      ch5_run = false;
    }
  });
  // -----------结果页面----------- #9
  var p_rst_text = {
    w : (1-0.075-0.15/2)/20*canvasW,
    x : 0.15/2*canvasW,
    y : canvasH*0.50,
    num : 19
  }
  var p_rst_btn = {
    y : canvasH*0.9,
    h : canvasH*0.075,
    w : canvasH*0.075*240/72,
    x : canvasW/2-canvasH*0.075*240/72/2,
    clicked : clicked
  };
  function testrst() {
    current += 1;
    context.save();
    context.clearRect(0, 0, canvasW, canvasH);
    context.drawImage(back.get(0), backbtn.x, backbtn.y, backbtn.w, backbtn.h);
    context.save();
    context.font = p_sha_text.w+"px 黑体";
    context.fillStyle = "rgb(113,123,133)";
    var k=1;
    context.beginPath();
    context.arc(p_rst_text.x+p_rst_text.w*0.33, p_rst_text.y+p_rst_text.w*1.5*(k-0.25), p_rst_text.w/4, 0, Math.PI*2, false);
    context.closePath();
    context.fill();
    for (var j=0; j*p_rst_text.num<rst_t2[rst_class].length; j++) {
      context.fillText(rst_t2[rst_class].slice(j*p_rst_text.num, (j+1)*p_rst_text.num), p_rst_text.x+p_rst_text.w, p_rst_text.y+p_rst_text.w*1.5*k);
      k++;
    }
    k+=0.5;
    context.beginPath();
    context.arc(p_rst_text.x+p_rst_text.w*0.33, p_rst_text.y+p_rst_text.w*1.5*(k-0.25), p_rst_text.w/4, 0, Math.PI*2, false);
    context.closePath();
    context.fill();
    for (var j=0; j*p_rst_text.num<rst_t3[rst_class].length; j++) {
      context.fillText(rst_t3[rst_class].slice(j*p_rst_text.num, (j+1)*p_rst_text.num), p_rst_text.x+p_rst_text.w, p_rst_text.y+p_rst_text.w*1.5*k);
      k++;
    }
    context.restore();
    context.drawImage(rst_b.get(0), p_rst_btn.x, p_rst_btn.y, p_rst_btn.w, p_rst_btn.h);
    context.restore();
    if (rst_run) {
      setTimeout(testrst, 33);
    } else {
      start(runPage);
    }
  };
  canvas.get(0).addEventListener("touchstart",function(e){    // 9——结果页面响应 $9
    if (p_rst_btn.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top) && rst_run && current >= click_delay) {
      runPage += 1;
      rst_run = false;
    }
    if (backbtn.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top) && rst_run && current >= click_delay) {
      runPage -= 1;
      rst_run = false;
    }
  });
  
  // -----------分享页面----------- #10
  var p_sha_t1 = {
    w : (1-0.075-0.15/2)/18*canvasW,
    x : 0.15/2*canvasW,
    y : 0.43*canvasH+(1-0.75-0.75)/18*canvasW
  };
  var p_sha_text = {
    w : (1-0.075-0.15/2)/20*canvasW,
    x : 0.15/2*canvasW,
    y : p_sha_t1.y+p_sha_t1.w*2+20,
    num : 19
  };
  var p_sha_pic = {
    y : canvasH*50/1008,
    h : canvasH*268/1008,
    x : canvasW/2-canvasH*268/1008/268*401/2,
    w : canvasH*268/1008/268*401
  };
  var p_sha_btn1 = {
    y : canvasH*0.9,
    h : canvasH*0.075,
    w : canvasH*0.075*248/72,
    x : canvasW/2-canvasH*0.075*248/72-20,
    clicked : clicked
  };
  var p_sha_btn2 = {
    y : canvasH*0.9,
    h : canvasH*0.075,
    w : canvasH*0.075*248/72,
    x : canvasW/2+20,
    clicked : clicked
  };
  function sharepage() {
    current += 1;
    context.clearRect(0, 0, canvasW, canvasH);
    context.drawImage(back.get(0), backbtn.x, backbtn.y, backbtn.w, backbtn.h); // 画返回键
    context.drawImage(sha_i.get(0), p_sha_pic.x, p_sha_pic.y, p_sha_pic.w, p_sha_pic.h);
    context.save();
    var text = $("#psharei").text();
    context.fillStyle = "rgb(91,91,91)";
    context.font = "italic "+p_sha_t1.w+"px 黑体";
    context.fillText(text.slice(0,16), p_sha_t1.x+p_sha_t1.w, p_sha_t1.y);
    context.fillText(text.slice(16), p_sha_t1.x, p_sha_t1.y+p_sha_t1.w*1.5);
    context.restore();
    context.save();
    context.font = p_sha_text.w+"px 黑体";
    context.fillStyle = "rgb(113,123,133)";
    var k = 1;
    for (var i=0; i<3; i++) {
      text = $("#pshare"+sha_random[i]).text();
      context.beginPath();
      context.arc(p_sha_text.x+p_sha_text.w*0.33, p_sha_text.y+p_sha_text.w*1.5*(k-0.25), p_sha_text.w/4, 0, Math.PI*2, false);
      context.closePath();
      context.fill();
      for (var j=0; j*p_sha_text.num<text.length; j++) {
        context.fillText(text.slice(j*p_sha_text.num, (j+1)*p_sha_text.num), p_sha_text.x+p_sha_text.w, p_sha_text.y+p_sha_text.w*1.5*k);
        k++;
      }
    }
    context.restore();
    context.drawImage(sha_btn1.get(0), p_sha_btn1.x, p_sha_btn1.y, p_sha_btn1.w, p_sha_btn1.h);
    context.drawImage(sha_btn2.get(0), p_sha_btn2.x, p_sha_btn2.y, p_sha_btn2.w, p_sha_btn2.h);
    if (share_show>0) {
      context.drawImage(sha_gbg.get(0), 0, 0, canvasW, canvasH);
      context.drawImage(sha_g.get(0), canvasW*0.1, 10, canvasW*0.8, canvasW*0.8*291/548);
      share_show = share_show===0? 0:share_show-1;
    }
    if (share_run) {
      setTimeout(sharepage, 33);
    } else {
      start(runPage);
    }
  };
  canvas.get(0).addEventListener("touchstart",function(e){     // 分享页面 $10
    share_show = 0;  // 点屏消失
    if (p_sha_btn1.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top) && share_run && current >= click_delay) {
      share_show = 33;
    }
    if (p_sha_btn2.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top) && share_run && current >= click_delay) {
      share_show = 33;
    }
    if (backbtn.clicked(e.pageX-canvas.offset().left, e.pageY-canvas.offset().top) && share_run && current >= click_delay) {
      runPage -= 1;
      share_run = false;
    }
  });
  init();
  start(runPage);
});
$(window).resize(function(){
  fun($("#canvas1"));
});
