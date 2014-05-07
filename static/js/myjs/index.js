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
  function isAndroid() {
   var sUserAgent = navigator.userAgent.toLowerCase();
   var isAndroid = sUserAgent.match(/android/i) == "android";
   if (isAndroid) 
     return 1;
   else 
     return 0;
  }
  if (window.DeviceMotionEvent) {  
    window.addEventListener('devicemotion',function(eventData){
      // Motion.ax = eventData.acceleration.x>0?0:eventData.acceleration.x;
      // Motion.ay = eventData.acceleration.y;
      // Motion.az = eventData.acceleration.z;
      // Arraw.vx  = Arraw.vx + Motion.ax;
      Arraw.vx  = 2.7*(1+4*isAndroid());
      if (canvasW > 1000) {
        Arraw.vx = canvasW/100;
      }
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
  $("img").load(function(){
    $(this).attr("loaded","yes");
  })
  $("p").hide();

  // 声明一个IMAGE类用于存储图像对象[本图像, 默认图像]
  var IMAGE = function(jq_img, default_img) {
    this.get = function(num) {
      if (jq_img.attr("src") === "") {
        jq_img.attr("src", jq_img.attr("load"));
        return default_img.get(0);
      } else if (!jq_img.complete) {
        return default_img.get(0);
      } else {
        return jq_img.get(0);
      }
    };
    this.complete = function(){
      if(jq_img.attr("loaded")){
        return true;
      };
      return false;
    };
    this.load = function() {
      if (jq_img.attr("src") === "") {
        jq_img.attr("src", jq_img.attr("load"));
      }
    };
  };

  var wel_bg_black   = new IMAGE($("#wel_bg_black"),$("#wel_bg_black"));
  var wel_bg_dim     = [new IMAGE($("#wel_bg_dim1"),$("#wel_bg_dim1")), new IMAGE($("#wel_bg_dim2"),$("#wel_bg_dim2")), new IMAGE($("#wel_bg_dim3"),$("#wel_bg_dim3"))];
  var wel_bg_clear   = [new IMAGE($("#wel_bg_clear1"),$("#wel_bg_clear1")), new IMAGE($("#wel_bg_clear2"),$("#wel_bg_clear2")), new IMAGE($("#wel_bg_clear3"),$("#wel_bg_clear3"))];
  var wel_title1     = new IMAGE($("#wel_title1"),$("#wel_title1"));
  var wel_title2     = new IMAGE($("#wel_title2"),$("#wel_title2"));
  var wel_index      = 0;
  wel_index = Math.floor(Math.random()*3); // 随机

  var loading   = new IMAGE($("#loading")    , $("#loading"));
  var imgbg     = new IMAGE($("#bg")         , $("#bg"));
  var lgcup     = new IMAGE($("#lgcup")      , $("#lgcup"));
  var smcup     = new IMAGE($("#smcup")      , $("#smcup"));
  var test      = new IMAGE($("#test")       , $("#test"));
  var back      = new IMAGE($("#back")       , $("#back"));
  var back_w    = new IMAGE($("#back_w")     , $("#back_w"));
  var bal_t1    = new IMAGE($("#bal_t1")     , $("#bal_t1"));
  var bal_t2    = new IMAGE($("#bal_t2")     , $("#bal_t2"));
  var bal_t3    = new IMAGE($("#bal_t3")     , $("#bal_t3"));
  var bal_rst   = new IMAGE($("#bal_rst")    , $("#bal_rst"));
  var bal_arrow = new IMAGE($("#arrow")      , $("#arrow"));
  var touch     = new IMAGE($("#touch")      , $("#touch"));
  var touched   = new IMAGE($("#touched")    , $("#touched"));
  // var load_title= new IMAGE($("#load_title") , $("#load_title"));
  var load_logo = new IMAGE($("#load_logo")  , $("#load_logo"));

  var ch_i     = [new IMAGE($("#chi_1"), $("#chi_1")), new IMAGE($("#chi_2"), $("#chi_2")), new IMAGE($("#chi_3"), $("#chi_3")), new IMAGE($("#chi_4"), $("#chi_4")), new IMAGE($("#chi_5"), $("#chi_5"))];
  var chp_i    = [$("#chpi_1").text(), $("#chpi_2").text(), $("#chpi_3").text(), $("#chpi_4").text(), $("#chpi_5").text()];
  var ch_1     = [new IMAGE($("#ch1_1"), $("#ch1_1")), new IMAGE($("#ch1_2"), $("#ch1_2")), new IMAGE($("#ch1_3"), $("#ch1_3")), new IMAGE($("#ch1_4"), $("#ch1_4")), new IMAGE($("#ch1_5"), $("#ch1_5"))];
  var chp_1    = [$("#chp1_1").text(), $("#chp1_2").text(), $("#chp1_3").text(), $("#chp1_4").text(), $("#chp1_5").text()];
  var ch_2     = [new IMAGE($("#ch2_1"), $("#ch2_1")), new IMAGE($("#ch2_2"), $("#ch2_2")), new IMAGE($("#ch2_3"), $("#ch2_3")), new IMAGE($("#ch2_4"), $("#ch2_4")), new IMAGE($("#ch2_5"), $("#ch2_5"))];
  var chp_2    = [$("#chp2_1").text(), $("#chp2_2").text(), $("#chp2_3").text(), $("#chp2_4").text(), $("#chp2_5").text()];
  var ch_3     = [new IMAGE($("#ch3_1"), $("#ch3_1")), new IMAGE($("#ch3_2"), $("#ch3_2")), new IMAGE($("#ch3_3"), $("#ch3_3")), new IMAGE($("#ch3_4"), $("#ch3_4")), new IMAGE($("#ch3_5"), $("#ch3_5"))];
  var chp_3    = [$("#chp3_1").text(), $("#chp3_2").text(), $("#chp3_3").text(), $("#chp3_4").text(), $("#chp3_5").text()];
  var ch_4     = [new IMAGE($("#ch4_1"), $("#ch4_1")), new IMAGE($("#ch4_2"), $("#ch4_2")), new IMAGE($("#ch4_3"), $("#ch4_3")), new IMAGE($("#ch4_4"), $("#ch4_4")), new IMAGE($("#ch4_5"), $("#ch4_5"))];
  var chp_4    = [$("#chp4_1").text(), $("#chp4_2").text(), $("#chp4_3").text(), $("#chp4_4").text(), $("#chp4_5").text()];
  var ch_bg    = [new IMAGE($("#chbg_1"),$("#chbg_1")),new IMAGE($("#chbg_2"),$("#chbg_2")),new IMAGE($("#chbg_3"),$("#chbg_3")),new IMAGE($("#chbg_4"),$("#chbg_4")),new IMAGE($("#chbg_5"),$("#chbg_5"))];
  var ch_title  = new IMAGE($("#ch_title"), $("#ch_title"));
  var ch_shadow = new IMAGE($("#ch_shadow"), $("#ch_shadow"));
  var ch_bg     = new IMAGE($("#ch_bg"), $("#ch_bg"));
  var ch_index= 0;
  var sha_i   = new IMAGE($("#sha_i")  , $("#sha_i"))  ;
  var sha_btn = new IMAGE($("#sha_b")  , $("#sha_b")) ;
  var sha_gbg = new IMAGE($("#sha_gbg"), $("#sha_gbg"));
  var sha_g   = new IMAGE($("#sha_g")  , $("#sha_g"))  ;
  var rst_b   = new IMAGE($("#rst_b")  , $("#rst_b"))  ;
  var rst_g   = new IMAGE($("#rst_g")  , $("#rst_g"))  ;
  var rst_i   = [new IMAGE($("#rst1"),$("#rst1")), new IMAGE($("#rst2"),$("#rst2")), new IMAGE($("#rst3"),$("#rst3")), new IMAGE($("#rst4"),$("#rst4"))];
  var rst_t   = new IMAGE($("#rst_t"),$("#rst_t"));
  var rst_t1  = [$("#prst11").text(), $("#prst12").text(), $("#prst13").text(), $("#prst14").text()];
  var rst_t2  = [$("#prst21").text(), $("#prst22").text(), $("#prst23").text(), $("#prst24").text()];
  var rst_t3  = [$("#prst31").text(), $("#prst32").text(), $("#prst33").text(), $("#prst34").text()];
  var rst_score = 0;
  var rst_class = 0;

  var context = canvas.get(0).getContext("2d");
  var LoadImg = new Array(11);
  // Empty page
  LoadImg[0] = function(){
    return [];
  };
  // welcome
  LoadImg[1]  = function(){
    return [wel_bg_black, wel_bg_dim[wel_index], wel_bg_clear[wel_index], wel_title1, wel_title2];
  };
  // loadingpage
  LoadImg[2]  = function() {
    return [];
  };
  // choose1
  LoadImg[3]  = function() {
    return [ch_i[0], ch_title, ch_bg, ch_1[0], ch_2[0], ch_3[0], ch_4[0], ch_shadow, back];
  };
  // choose2
  LoadImg[4]  = function() {
    return [ch_i[1], ch_title, ch_bg, ch_1[1], ch_2[1], ch_3[1], ch_4[1], ch_shadow, back];
  };
  // choose3
  LoadImg[5]  = function() {
    return [ch_i[2], ch_title, ch_bg, ch_1[2], ch_2[2], ch_3[2], ch_4[2], ch_shadow, back];
  };
  // choose4
  LoadImg[6]  = function() {
    return [ch_i[3], ch_title, ch_bg, ch_1[3], ch_2[3], ch_3[3], ch_4[3], ch_shadow, back];
  };
  // choose5
  LoadImg[7]  = function() {
    return [ch_i[4], ch_title, ch_bg, ch_1[4], ch_2[4], ch_3[4], ch_4[4], ch_shadow, back];
  };
  // balance
  LoadImg[8]  = function() {
    return [wel_bg_clear[wel_index], wel_bg_dim[wel_index], back_w, bal_t1, bal_t2, touch, bal_arrow, bal_t3, touched];
  };
  // result
  LoadImg[9]  = function() {
    return [rst_i[0], rst_i[1], rst_i[2], rst_i[3], rst_t, rst_b, rst_g];
  };
  // share
  LoadImg[10] = function() {
    return [sha_i, sha_btn, sha_gbg, sha_g];
  };

  // 画布尺寸
  fun(canvas);
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
  var wel_run=bal_run=ch1_run=ch2_run=ch3_run=ch4_run=ch5_run=load_run=rst_run=share_run=false; var load_complete = [false, false, false, false, false, false, false, false, false, false, false]; var sha_random=[1, 5, 9];
  var wel_first_load = true;
  var share_show     = 0;
  var bal_maxshift   = 0;
  var bal_finish     = 0;
  var bal_f_shift    = 0;
  var INIT_PAGE    = 0;
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
  function getNextPage(page) {
    switch (page) {
      case INIT_PAGE    : return WELCOME_PAGE; break;
      case WELCOME_PAGE : return CHOOSE1_PAGE; break;
      case CHOOSE1_PAGE : return CHOOSE2_PAGE; break;
      case CHOOSE2_PAGE : return CHOOSE3_PAGE; break;
      case CHOOSE3_PAGE : return CHOOSE4_PAGE; break;
      case CHOOSE4_PAGE : return CHOOSE5_PAGE; break;
      case CHOOSE5_PAGE : return BALANCE_PAGE; break;
      case BALANCE_PAGE : return RESULT_PAGE ; break;
      case RESULT_PAGE  : return SHARE_PAGE  ; break;
      case SHARE_PAGE   : return WELCOME_PAGE; break;
      case LOADING_PAGE : return CHOOSE1_PAGE; break;
    }
  }
  function start(runPage) {
    if (!load_complete[runPage]) {
      loadingpage(runPage);
      return ;
    }
    switch (runPage) {
      case 0: runPage+=1; return;
      case 1: if (true)                   // #1 欢迎页面
                current = 0;
              // wel_index = 2;
              if (!wel_run) {
                wel_run = true;
                console.log("start welcome!");
                welcome();
              }
              break;
      case 2: ;                           // #2 加载页面
              loadingpage();
              break;
      case 8: current = 0;                // #3 平衡页面
              end     = 300;
              bal_maxshift = 0;
              bal_finish   = 0;
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
                if (bal_maxshift>50) {
                  rst_class -= 1;
                  rst_class = rst_class<0 ? 0 : rst_class;
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
    context.restore();
  }
  // ---------------欢迎页面-------------- #1
  var last_num = 120;
  var p_wel_clear = {
    w : function(current) {
      return canvasW;
    },
    h : function(current) {
      return canvasW*1016/640;
    },
    x : function(current) {
      return 0;
    },
    y : function(current) {
      return 0;
    }
  };
  var p_wel_title1 = {
    w : function(current) {
      return this.h(current)*152/300;
    }, 
    h : function(current) {
      return canvasH*196/730;
    }, 
    x : function(current) {
      return canvasW/2-this.w(current)/2;
    },
    y : function(current) {
      return canvasH*92/730;
    }
  };
  var p_wel_title2 = {
    w : function(current) {
      var w_rate = current<last_num ? current/last_num : 1;
      return this.w_base()*w_rate;
    },
    h : function(current) {
      return canvasH*196/730;
    },
    x : function(current) {
      return canvasW/2+this.w_base()/2-this.w(current);
    },
    y : function(current) {
      return canvasH*333/730;
    },
    w_base : function(current) {
      return this.h(current)*523/286;
    },
    cut_x : function(current) {
      var w_rate = current<last_num ? current/last_num : 1;
      return 523*(1-w_rate);
    },
    cut_y : function(current) {
      return 0;
    },
    cut_w : function(current) {
      var w_rate = current<last_num ? current/last_num : 1;
      return 523*w_rate;
    },
    cut_h : function(current) {
      return 286;
    }
  };
  var p_fade = {
    num   : function(current) {
              return 40;
            },
    staynum : function(current) {
              return 36;
            },
    scale : function(current) {
              return 1;
            }
  }
  var p_wel_bottom = {
    w : (1-0.075-0.15/2)/25*canvasW,
    x : 0.15/2*canvasW,
    y : canvasH*0.95,
    num : 19
  };
  function welcome() {       // 第一张页面，欢迎页面。
    current += 1;
    current += 4*isAndroid();
    wel_bg_black.get(0);
    context.clearRect(0, 0, canvasW, canvasH);
    context.save();                    // 淡出效果
    if (current>last_num+p_fade.staynum()) {
      if ((1-(current-last_num-p_fade.staynum())/p_fade.num())*p_fade.scale() > 0) {
        context.globalAlpha = (1-(current-last_num-p_fade.staynum())/p_fade.num())*p_fade.scale();
      } else {
        context.globalAlpha = 0;
      }
    }
    context.drawImage(wel_bg_clear[wel_index].get(0), p_wel_clear.x(), p_wel_clear.y(), p_wel_clear.w(), p_wel_clear.h());
    context.save();
    context.globalAlpha = last_num>current ? 1-current/last_num : 0;
    context.drawImage(wel_bg_dim[wel_index].get(0), p_wel_clear.x(), p_wel_clear.y(), p_wel_clear.w(), p_wel_clear.h());
    context.restore();
    context.drawImage(wel_bg_black.get(0), p_wel_clear.x(), p_wel_clear.y(), p_wel_clear.w(), p_wel_clear.h());
    context.save();
    context.globalAlpha = last_num>current ? current/last_num : 1;
    context.drawImage(wel_title1.get(0), p_wel_title1.x(), p_wel_title1.y(), p_wel_title1.w(), p_wel_title1.h());
    context.drawImage(wel_title2.get(0), p_wel_title2.cut_x(current), p_wel_title2.cut_y(), p_wel_title2.cut_w(current), p_wel_title2.cut_h(), p_wel_title2.x(current), p_wel_title2.y(), p_wel_title2.w(current), p_wel_title2.h());
    context.restore();
    context.font      = "bold " + p_wel_bottom.w + "px serif";
    context.fillStyle = "rgb(255,255,255)";
    context.fillText("*本测试内容包含酒类信息，请确保您已年满十八周岁。", p_wel_bottom.x, p_wel_bottom.y);
    context.restore();
    if (wel_run) {
      setTimeout(welcome, 33);
    } else {
      console.log("stop welcome!");
      wel_run = false;
      wel_first_load = false;
      runPage = 3;
      start(runPage);
    }
    if (current > last_num + p_fade.staynum() + p_fade.num()) {   // 出口
      wel_run = false;
    }
  };
  // ---------------载入页面-------------- #2
  var p_load1 = {
    i   :  255
  };
  var p_load_logo = {
    x: function(){
         return (canvasW-this.w())/2;
       },
    y: function(){
         return (canvasH-this.h())/2;
       },
    w: function(){
         return canvasH*120/1136;
       },
    h: function(){
         return canvasH*120/1136;
       },
    xScale: function(c) {
         return Math.cos(c*this.av()*Math.PI/180);
       },
    ySkew : function(c) {
         return -Math.sin(c*this.av()*Math.PI/180);
       },
    xSkew : function(c) {
         return Math.sin(c*this.av()*Math.PI/180);
       },
    yScale: function(c) {
         return Math.cos(c*this.av()*Math.PI/180);
       },
    xTrans: function(c) {
         return canvasW/2;
       },
    yTrans: function(c) {
         return canvasH/2;
       },
    av: function () {
         return 30;
       }
  };
  var p_load_title = {
    w: canvasW*476/640,
    y: canvasH*504/1136,
    x: (1-476/640)*canvasW/2,
    h: canvasW*476/640*82/472
  };
  var load_current = 0;
  function checkLoadComplete(runPage) {
    var imgs = LoadImg[runPage]();
    for (var i=0; i<imgs.length; i++) {   // 有图片没加载完成
      imgs[i].load();
    }
    for (var i=0; i<imgs.length; i++) {   // 有图片没加载完成
      if (!imgs[i].complete())
        return false;
    }
    var next_imgs = LoadImg[getNextPage(runPage)]();
    for (var i=0; i<next_imgs.length; i++) {   // 本页图片加载完成，加载下一页图片
      next_imgs[i].load();
    }
    load_complete[runPage] = true;
    return true;
  };
  function loadingpage() {
    load_current += 1;
    checkLoadComplete(runPage);
    context.clearRect(0,0,canvasW, canvasH);
    context.save();
    context.transform(p_load_logo.xScale(load_current), p_load_logo.ySkew(load_current), p_load_logo.xSkew(load_current), p_load_logo.yScale(load_current), p_load_logo.xTrans(load_current), p_load_logo.yTrans(load_current));
    context.drawImage(load_logo.get(0), -p_load_logo.w()/2, -p_load_logo.h()/2, p_load_logo.w(), p_load_logo.h());
    context.restore();
    // context.drawImage(load_title.get(0), p_load_title.x, p_load_title.y, p_load_title.w, p_load_title.h);
    if (load_complete[runPage]) {
      start(runPage);
    } else {
      setTimeout(loadingpage, 70);
    }
  };
  // --------------重力感应页面---------- #3
  var p_bal_t1 = {
    x  : function(){
           return canvasW/5;
         },
    y  : function(){
           return canvasH/5;
         },
    w  : function(){
           return canvasW*3/5;
         },
    h  : function(){
           return this.w()*36/367;
         }
  }
  var p_bal_t2 = {
    x  : function(){
           return canvasW/5;
         },
    y  : function(){
           return canvasH/4+30;
         },
    w  : function(){
           return canvasW*3/5;
         },
    h  : function(){
           return this.w()*30/367;
         }
  }
  var p_bal_t3 = {
    x  : function(){
           return canvasW/5;
         },
    y  : function(){
           return canvasH*4/5.5;
         },
    w  : function(){
           return canvasW*3/5;
         },
    h  : function(){
           return this.w()*30/398;
         }
  }
  var backbtn = {
    x : canvasH*20/1008,
    y : canvasH*20/1008,
    w : canvasH*88/1008,
    h : canvasH*88/1008,
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
  var passThisPage = 0.9*canvasW;
  var p_bal_arrow = {
    h : 58,
    w : 84,
    x : canvasW/2-84/2,
    y : canvasH/2-58/2
  };
  var p_dim = {
    getDim : function(current) {
      var base = 0.3;
      var num  = 180;
      var c    = current%num;
      if (c<=num/4){
        return c*base/(num/4);
      } else if(c>num/4&&c<=num*2/4){
        return this.getDim(num*2/4-c);
      } else {
        return 0;
      }
    }
  };
  var p_bal_rst = {
    h  : 0.075*canvasH,
    w  : 0.075*canvasH*240/72,
    x  : canvasW/2-0.075*canvasH*240/72/2,
    y  : canvasH*0.8,
    clicked: clicked
  };
  function balance() {
    if (current === 0) {
      touchbtn.touched = 0;
    }
    context.save();
    if (current < p_fade.num()) {
      context.globalAlpha = current/p_fade.num();
    }
    var Hshift = function() {
      return -10*3*(Arraw.beta-Orient.beta);
    };
    if (current===0) {
      Arraw = new CArraw(Orient.alpha, Orient.beta, Orient.gamma);
    }
    current += 1+4*isAndroid();
    context.clearRect(0, 0, canvasW, canvasH);  // 清屏
    context.fillStyle = "rgb(9,144,236)";       // 背景色
    context.fillRect(0, 0, canvasW, canvasH);
    context.save();
    context.globalAlpha = 0.2;
    context.drawImage(wel_bg_clear[wel_index].get(0), p_wel_clear.x(), p_wel_clear.y(), p_wel_clear.w(), p_wel_clear.h());
    context.restore();
    context.save();
    context.globalAlpha = p_dim.getDim(current);
    context.drawImage(wel_bg_dim[wel_index].get(0), p_wel_clear.x(), p_wel_clear.y(), p_wel_clear.w(), p_wel_clear.h());
    context.restore();
    var drawColor = "rgb(255,255,255)";
    var lineH = canvasH/2;
    var arraw_height = canvasH/25*2;
    var arraw_width  = arraw_height;
    draw_background();                          // 背景
    context.strokeStyle = drawColor;            // 水平线
    context.beginPath();
    context.moveTo(0,lineH);
    context.lineTo(canvasW,lineH);
    context.closePath();
    context.stroke();
    context.beginPath();                        // 起始线
    context.moveTo(0.1*canvasW-canvasH/50,lineH-10);
    context.lineTo(0.1*canvasW-canvasH/50,lineH+10);
    context.closePath();
    context.stroke();
    context.beginPath();                        // 终点线
    context.moveTo(passThisPage+canvasH/50,lineH-10);
    context.lineTo(passThisPage+canvasH/50,lineH+10);
    context.closePath();
    context.stroke();
    // context.drawImage(test.get(0), canvasW/10-arraw_width/2+Arraw.shift*touchbtn.touched, lineH-arraw_height/2+Hshift()*touchbtn.touched, arraw_width, arraw_height);         // 画箭头
    context.fillStyle = drawColor;              // 画一个圆
    if (bal_finish === 0) {
      context.beginPath();
      context.arc(canvasW/10+Arraw.shift*touchbtn.touched, lineH+Hshift()*touchbtn.touched, canvasH/50, 0, Math.PI*2, false);
      context.closePath();
      context.fill();
    } else {
      context.beginPath();
      context.arc(passThisPage, lineH+bal_f_shift, canvasH/50, 0, Math.PI*2, false);
      context.closePath();
      context.fill();
    }
    context.drawImage(back_w.get(0), backbtn.x, backbtn.y, backbtn.w, backbtn.h); // 画返回键
    context.drawImage(bal_t1.get(0), p_bal_t1.x(), p_bal_t1.y(), p_bal_t1.w(), p_bal_t1.h());
    context.drawImage(bal_t2.get(0), p_bal_t2.x(), p_bal_t2.y(), p_bal_t2.w(), p_bal_t2.h());
    if (!touchbtn.touched) {                     // 画箭头
      context.drawImage(bal_arrow.get(0), p_bal_arrow.x, p_bal_arrow.y, p_bal_arrow.w, p_bal_arrow.h);
      context.drawImage(bal_t3.get(0), p_bal_t3.x(), p_bal_t3.y(), p_bal_t3.w(), p_bal_t3.h());
    } else {
      // context.drawImage(touched.get(0), touchbtn.x, touchbtn.y, touchbtn.w, touchbtn.h);
    }
    if (bal_finish!==1 && canvasW/10+Arraw.shift*touchbtn.touched > passThisPage) {
      bal_finish  = 1;
      bal_f_shift = Hshift()*touchbtn.touched;
    }
    if (bal_maxshift < Hshift()*touchbtn.touched) {     // 记录最大偏移
      bal_maxshift = Hshift()*touchbtn.touched;
    }
    if (bal_finish !== 0) {
      // context.drawImage(bal_rst.get(0), p_bal_rst.x, p_bal_rst.y, p_bal_rst.w, p_bal_rst.h);
      context.drawImage(touched.get(0), touchbtn.x, touchbtn.y, touchbtn.w, touchbtn.h);  // 查看结果按钮
    } else {
      context.drawImage(touch.get(0), touchbtn.x, touchbtn.y, touchbtn.w, touchbtn.h);    // 开始按钮不影藏
    }
    if (bal_run) {
      setTimeout(balance, 33);
    } else {
      // 执行完了以后怎么办
      bal_run = false;
      start(runPage);
    }
    context.restore();
  };
  canvas.get(0).addEventListener("touchstart",function(e){     // 重力平衡点击响应 $3
    if (touchbtn.clicked(e.changedTouches[0].pageX-canvas.offset().left, e.changedTouches[0].pageY-canvas.offset().top) && bal_run && current >= click_delay/100 && touchbtn.touched !== 1) {
      Arraw.beta = Orient.beta;                                // 初始化角度
      touchbtn.touched = 1;                                    // -touchbtn.touched;
      Arraw.shift = 0;
      Arraw.vx    = 0;
    }
    if (backbtn.clicked(e.changedTouches[0].pageX-canvas.offset().left, e.changedTouches[0].pageY-canvas.offset().top) && bal_run && current >= click_delay/100) {
      bal_run = false;
      touchbtn.touched = 0;
      runPage -= 1;
    }
    if (touchbtn.clicked(e.changedTouches[0].pageX-canvas.offset().left, e.changedTouches[0].pageY-canvas.offset().top) && bal_run && bal_finish) {
      bal_run = false;
      runPage += 1;
    }
  });
  // ---------------选择题一页面-------------- #4
  var chpicrate = 263/273;
  var chpwhite  = 0.02;
  var chp1h     = 0.37;   // 第一张图片的高
  var score_set = [[4,3,2,1],[4,3,2,1],[4,3,2,1],[4,3,2,1],[4,3,2,1],[4,3,2,1]]
  var choose_set = [[true,true,true,true],[true,true,true,true],[true,true,true,true],[true,true,true,true],[true,true,true,true]];
  var just_clicked = false;
  var just_delay = 600;
  var p_ch1i = {
    h   :  canvasH*chp1h,
    w   :  canvasH*chp1h*900/388,
    y   :  0,
    x   :  (canvasW-canvasH*chp1h*900/388)/2
  }
  var text_x = function(str) {
    var len = str.length;
    return this.x+(this.w-len*this.tw(str))/2
  };
  var text_y = function(str) {
    var len = str.length;
    return this.y+this.h-this.tw(str)*1.3;
  };
  var text_w = function(str) {
    var len = str.length;
    return 30/267*this.w;
  };
  var text_h = function(str) {
    var len = str.length;
    return 30/267*this.w;
  };
  var p_ch11 = {
    h   :  0.25*canvasH,
    w   :  0.25*canvasH,
    y   :  (chp1h+chpwhite)*canvasH,
    x   :  0.5*canvasW-chpwhite/2*canvasH-0.25*canvasH,
    tx  : text_x,
    ty  : text_y,
    tw  : text_w,
    th  : text_h,
    clicked : clicked
  }
  var p_ch12 = {
    h   :  0.25*canvasH,
    w   :  0.25*canvasH,
    y   :  (chp1h+chpwhite)*canvasH,
    x   :  0.5*canvasW+chpwhite/2*canvasH,
    tx  : text_x,
    ty  : text_y,
    tw  : text_w,
    th  : text_h,
    clicked : clicked
  }
  var p_ch13 = {
    h   :  0.25*canvasH,
    w   :  0.25*canvasH,
    y   :  (chp1h+chpwhite)*canvasH+0.25*canvasH+chpwhite*canvasH,
    x   :  0.5*canvasW-chpwhite/2*canvasH-0.25*canvasH,
    tx  : text_x,
    ty  : text_y,
    tw  : text_w,
    th  : text_h,
    clicked : clicked
  }
  var p_ch14 = {
    h   :  0.25*canvasH,
    w   :  0.25*canvasH,
    y   :  (chp1h+chpwhite)*canvasH+0.25*canvasH+chpwhite*canvasH,
    x   :  0.5*canvasW+chpwhite/2*canvasH,
    tx  : text_x,
    ty  : text_y,
    tw  : text_w,
    th  : text_h,
    clicked : clicked
  }
  var title_x = function(str) {
    var len  = str.length;
    return this.x + (this.w-this.tw(str)*len)/2;
  };
  var title_y = function(str) {
    return this.y+this.th(str)*1.25;
  };
  var title_w = function(str) {
    return this.th(str);
  };
  var title_h = function(str) {
    return this.h*0.55;
  };
  var p_ch_title = {
    h   :  canvasW*74/640,
    w   :  canvasW,
    y   :  p_ch1i.y+p_ch1i.h-canvasW*74/640,
    x   :  0,
    tx  : title_x,
    ty  : title_y,
    tw  : title_w,
    th  : title_h
  };
  var str_color_ch = "rgb(244,247,249)";
  function choose1() {
    context.clearRect(0, 0, canvasW, canvasH);
    current += 1+4*isAndroid();
    ch_index = 0;
    context.save();
    if (current < p_fade.num()) {
      context.globalAlpha = current/p_fade.num();
    }
    context.fillStyle = str_color_ch;
    context.fillRect(0, 0, canvasW, canvasH);
    // 标题图
    context.drawImage(ch_i[ch_index].get(0), p_ch1i.x, p_ch1i.y, p_ch1i.w, p_ch1i.h);
    // 标题文字
    context.drawImage(ch_title.get(0), p_ch_title.x, p_ch_title.y, p_ch_title.w, p_ch_title.h);
    context.font      = "bold " + p_ch_title.tw(chp_i[ch_index]) + "px serif";
    context.fillStyle = "rgb(255,255,255)";
    context.fillText(chp_i[ch_index], p_ch_title.tx(chp_i[ch_index]), p_ch_title.ty(chp_i[ch_index]));
    context.drawImage(ch_bg.get(0), (1-0.2)*canvasW, canvasH-0.2*canvasW, 0.2*canvasW, 0.2*canvasW);   // 页脚
    // 选项
    context.drawImage(ch_1[ch_index].get(0), p_ch11.x, p_ch11.y, p_ch11.w, p_ch11.h);
    context.fillStyle = "rgb(113,123,133)";
    context.font = "" + p_ch11.tw(chp_1[ch_index]) + "px serif";
    context.fillText(chp_1[ch_index], p_ch11.tx(chp_1[ch_index]), p_ch11.ty(chp_1[ch_index]));
    if (!choose_set[ch_index][0]) {
      context.drawImage(ch_shadow.get(0), p_ch11.x, p_ch11.y, p_ch11.w, p_ch11.h);
    }
    context.drawImage(ch_2[ch_index].get(0), p_ch12.x, p_ch12.y, p_ch12.w, p_ch12.h);
    context.fillText(chp_2[ch_index], p_ch12.tx(chp_2[ch_index]), p_ch12.ty(chp_2[ch_index]));
    if (!choose_set[ch_index][1]) {
      context.drawImage(ch_shadow.get(0), p_ch12.x, p_ch12.y, p_ch12.w, p_ch12.h);
    }
    context.drawImage(ch_3[ch_index].get(0), p_ch13.x, p_ch13.y, p_ch13.w, p_ch13.h);
    context.fillText(chp_3[ch_index], p_ch13.tx(chp_3[ch_index]), p_ch13.ty(chp_3[ch_index]));
    if (!choose_set[ch_index][2]) {
      context.drawImage(ch_shadow.get(0), p_ch13.x, p_ch13.y, p_ch13.w, p_ch13.h);
    }
    context.drawImage(ch_4[ch_index].get(0), p_ch14.x, p_ch14.y, p_ch14.w, p_ch14.h);
    context.fillText(chp_4[ch_index], p_ch14.tx(chp_4[ch_index]), p_ch14.ty(chp_4[ch_index]));
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
    if (backbtn.clicked(e.changedTouches[0].pageX-canvas.offset().left, e.changedTouches[0].pageY-canvas.offset().top) && ch1_run && current >= click_delay) {
      runPage = WELCOME_PAGE;
      ch1_run = false;
    }
    if (p_ch11.clicked(e.changedTouches[0].pageX-canvas.offset().left, e.changedTouches[0].pageY-canvas.offset().top) && ch1_run && current >= click_delay) {
      $("#pscore"+ch_index).text(parseInt(score_set[ch_index][0]));
      choose_set[ch_index][0] = true;
      choose_set[ch_index][1] = false;
      choose_set[ch_index][2] = false;
      choose_set[ch_index][3] = false;
      runPage += 1;
      setTimeout(function(){ch1_run = false;}, 1000);
    }
    if (p_ch12.clicked(e.changedTouches[0].pageX-canvas.offset().left, e.changedTouches[0].pageY-canvas.offset().top) && ch1_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[ch_index][1]);
      choose_set[ch_index][0] = false;
      choose_set[ch_index][1] = true;
      choose_set[ch_index][2] = false;
      choose_set[ch_index][3] = false;
      runPage += 1;
      setTimeout(function(){ch1_run = false;}, 1000);
    }
    if (p_ch13.clicked(e.changedTouches[0].pageX-canvas.offset().left, e.changedTouches[0].pageY-canvas.offset().top) && ch1_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[ch_index][2]);
      choose_set[ch_index][0] = false;
      choose_set[ch_index][1] = false;
      choose_set[ch_index][2] = true; 
      choose_set[ch_index][3] = false;
      runPage += 1;
      setTimeout(function(){ch1_run = false;}, 1000);
    }
    if (p_ch14.clicked(e.changedTouches[0].pageX-canvas.offset().left, e.changedTouches[0].pageY-canvas.offset().top) && ch1_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[ch_index][3]);
      choose_set[ch_index][0] = false;
      choose_set[ch_index][1] = false;
      choose_set[ch_index][2] = false;
      choose_set[ch_index][3] = true;
      runPage += 1;
      setTimeout(function(){ch1_run = false;}, 1000);
    }
  });
  // -------------第二个选择题页面------------- #5
  function choose2() {
    context.clearRect(0, 0, canvasW, canvasH);
    current += 1+4*isAndroid();
    ch_index = 1;
    context.save();
    if (current < p_fade.num()) {
      context.globalAlpha = current/p_fade.num();
    }
    context.fillStyle = str_color_ch;
    context.fillRect(0, 0, canvasW, canvasH);
    // 标题图
    context.drawImage(ch_i[ch_index].get(0), p_ch1i.x, p_ch1i.y, p_ch1i.w, p_ch1i.h);
    // 标题文字
    context.drawImage(ch_title.get(0), p_ch_title.x, p_ch_title.y, p_ch_title.w, p_ch_title.h);
    context.font      = "bold " + p_ch_title.tw(chp_i[ch_index]) + "px serif";
    context.fillStyle = "rgb(255,255,255)";
    context.fillText(chp_i[ch_index], p_ch_title.tx(chp_i[ch_index]), p_ch_title.ty(chp_i[ch_index]));
    context.drawImage(ch_bg.get(0), (1-0.2)*canvasW, canvasH-0.2*canvasW, 0.2*canvasW, 0.2*canvasW);   // 页脚
    // 选项
    context.drawImage(ch_1[ch_index].get(0), p_ch11.x, p_ch11.y, p_ch11.w, p_ch11.h);
    context.fillStyle = "rgb(113,123,133)";
    context.font = "" + p_ch11.tw(chp_1[ch_index]) + "px serif";
    context.fillText(chp_1[ch_index], p_ch11.tx(chp_1[ch_index]), p_ch11.ty(chp_1[ch_index]));
    if (!choose_set[ch_index][0]) {
      context.drawImage(ch_shadow.get(0), p_ch11.x, p_ch11.y, p_ch11.w, p_ch11.h);
    }
    context.drawImage(ch_2[ch_index].get(0), p_ch12.x, p_ch12.y, p_ch12.w, p_ch12.h);
    context.fillText(chp_2[ch_index], p_ch12.tx(chp_2[ch_index]), p_ch12.ty(chp_2[ch_index]));
    if (!choose_set[ch_index][1]) {
      context.drawImage(ch_shadow.get(0), p_ch12.x, p_ch12.y, p_ch12.w, p_ch12.h);
    }
    context.drawImage(ch_3[ch_index].get(0), p_ch13.x, p_ch13.y, p_ch13.w, p_ch13.h);
    context.fillText(chp_3[ch_index], p_ch13.tx(chp_3[ch_index]), p_ch13.ty(chp_3[ch_index]));
    if (!choose_set[ch_index][2]) {
      context.drawImage(ch_shadow.get(0), p_ch13.x, p_ch13.y, p_ch13.w, p_ch13.h);
    }
    context.drawImage(ch_4[ch_index].get(0), p_ch14.x, p_ch14.y, p_ch14.w, p_ch14.h);
    context.fillText(chp_4[ch_index], p_ch14.tx(chp_4[ch_index]), p_ch14.ty(chp_4[ch_index]));
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
    if (backbtn.clicked(e.changedTouches[0].pageX-canvas.offset().left, e.changedTouches[0].pageY-canvas.offset().top) && ch2_run && current >= click_delay) {
      runPage -= 1;
      ch2_run = false;
    }
    if (p_ch11.clicked(e.changedTouches[0].pageX-canvas.offset().left, e.changedTouches[0].pageY-canvas.offset().top) && ch2_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[ch_index][0]);
      choose_set[ch_index][0] = true;
      choose_set[ch_index][1] = false;
      choose_set[ch_index][2] = false;
      choose_set[ch_index][3] = false;
      runPage += 1;
      setTimeout(function(){ch2_run = false;}, 1000);
    }
    if (p_ch12.clicked(e.changedTouches[0].pageX-canvas.offset().left, e.changedTouches[0].pageY-canvas.offset().top) && ch2_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[ch_index][1]);
      choose_set[ch_index][0] = false;
      choose_set[ch_index][1] = true;
      choose_set[ch_index][2] = false;
      choose_set[ch_index][3] = false;
      runPage += 1;
      setTimeout(function(){ch2_run = false;}, 1000);
    }
    if (p_ch13.clicked(e.changedTouches[0].pageX-canvas.offset().left, e.changedTouches[0].pageY-canvas.offset().top) && ch2_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[ch_index][2]);
      choose_set[ch_index][0] = false;
      choose_set[ch_index][1] = false;
      choose_set[ch_index][2] = true;
      choose_set[ch_index][3] = false;
      runPage += 1;
      setTimeout(function(){ch2_run = false;}, 1000);
    }
    if (p_ch14.clicked(e.changedTouches[0].pageX-canvas.offset().left, e.changedTouches[0].pageY-canvas.offset().top) && ch2_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[ch_index][3]);
      choose_set[ch_index][0] = false;
      choose_set[ch_index][1] = false;
      choose_set[ch_index][2] = false;
      choose_set[ch_index][3] = true;
      runPage += 1;
      setTimeout(function(){ch2_run = false;}, 1000);
    }
  });
  // --------------第三个选择题页面------------- #6
  function choose3() {
    context.clearRect(0, 0, canvasW, canvasH);
    current += 1+4*isAndroid();
    ch_index = 2;
    context.save();
    if (current < p_fade.num()) {
      context.globalAlpha = current/p_fade.num();
    }
    context.fillStyle = str_color_ch;
    context.fillRect(0, 0, canvasW, canvasH);
    // 标题图
    context.drawImage(ch_i[ch_index].get(0), p_ch1i.x, p_ch1i.y, p_ch1i.w, p_ch1i.h);
    // 标题文字
    context.drawImage(ch_title.get(0), p_ch_title.x, p_ch_title.y, p_ch_title.w, p_ch_title.h);
    context.font      = "bold " + p_ch_title.tw(chp_i[ch_index]) + "px serif";
    context.fillStyle = "rgb(255,255,255)";
    context.fillText(chp_i[ch_index], p_ch_title.tx(chp_i[ch_index]), p_ch_title.ty(chp_i[ch_index]));
    context.drawImage(ch_bg.get(0), (1-0.2)*canvasW, canvasH-0.2*canvasW, 0.2*canvasW, 0.2*canvasW);   // 页脚

    // 选项
    context.drawImage(ch_1[ch_index].get(0), p_ch11.x, p_ch11.y, p_ch11.w, p_ch11.h);
    context.fillStyle = "rgb(113,123,133)";
    context.font = "" + p_ch11.tw(chp_1[ch_index]) + "px serif";
    context.fillText(chp_1[ch_index], p_ch11.tx(chp_1[ch_index]), p_ch11.ty(chp_1[ch_index]));
    if (!choose_set[ch_index][0]) {
      context.drawImage(ch_shadow.get(0), p_ch11.x, p_ch11.y, p_ch11.w, p_ch11.h);
    }
    context.drawImage(ch_2[ch_index].get(0), p_ch12.x, p_ch12.y, p_ch12.w, p_ch12.h);
    context.fillText(chp_2[ch_index], p_ch12.tx(chp_2[ch_index]), p_ch12.ty(chp_2[ch_index]));
    if (!choose_set[ch_index][1]) {
      context.drawImage(ch_shadow.get(0), p_ch12.x, p_ch12.y, p_ch12.w, p_ch12.h);
    }
    context.drawImage(ch_3[ch_index].get(0), p_ch13.x, p_ch13.y, p_ch13.w, p_ch13.h);
    context.fillText(chp_3[ch_index], p_ch13.tx(chp_3[ch_index]), p_ch13.ty(chp_3[ch_index]));
    if (!choose_set[ch_index][2]) {
      context.drawImage(ch_shadow.get(0), p_ch13.x, p_ch13.y, p_ch13.w, p_ch13.h);
    }
    context.drawImage(ch_4[ch_index].get(0), p_ch14.x, p_ch14.y, p_ch14.w, p_ch14.h);
    context.fillText(chp_4[ch_index], p_ch14.tx(chp_4[ch_index]), p_ch14.ty(chp_4[ch_index]));
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
    if (backbtn.clicked(e.changedTouches[0].pageX-canvas.offset().left, e.changedTouches[0].pageY-canvas.offset().top) && ch3_run && current >= click_delay) {
      runPage -= 1;
      ch3_run = false;
    }
    if (p_ch11.clicked(e.changedTouches[0].pageX-canvas.offset().left, e.changedTouches[0].pageY-canvas.offset().top) && ch3_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[2][0]);
      choose_set[2][0] = true;
      choose_set[2][1] = false;
      choose_set[2][2] = false;
      choose_set[2][3] = false;
      runPage += 1;
      setTimeout(function(){ch3_run = false;}, 1000);
    }
    if (p_ch12.clicked(e.changedTouches[0].pageX-canvas.offset().left, e.changedTouches[0].pageY-canvas.offset().top) && ch3_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[2][1]);
      choose_set[2][0] = false;
      choose_set[2][1] = true;
      choose_set[2][2] = false;
      choose_set[2][3] = false;
      runPage += 1;
      setTimeout(function(){ch3_run = false;}, 1000);
    }
    if (p_ch13.clicked(e.changedTouches[0].pageX-canvas.offset().left, e.changedTouches[0].pageY-canvas.offset().top) && ch3_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[2][2]);
      choose_set[2][0] = false;
      choose_set[2][1] = false;
      choose_set[2][2] = true;
      choose_set[2][3] = false;
      runPage += 1;
      setTimeout(function(){ch3_run = false;}, 1000);
    }
    if (p_ch14.clicked(e.changedTouches[0].pageX-canvas.offset().left, e.changedTouches[0].pageY-canvas.offset().top) && ch3_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[ch_index][3]);
      choose_set[ch_index][0] = false;
      choose_set[ch_index][1] = false;
      choose_set[ch_index][2] = false;
      choose_set[ch_index][3] = true;
      runPage += 1;
      setTimeout(function(){ch3_run = false;}, 1000);
    }
  });
  // ---------------选择题4页面-------------- #7
  function choose4() {
    context.clearRect(0, 0, canvasW, canvasH);
    current += 1+4*isAndroid();
    ch_index = 3;
    context.save();
    if (current < p_fade.num()) {
      context.globalAlpha = current/p_fade.num();
    }
    context.fillStyle = str_color_ch;
    context.fillRect(0, 0, canvasW, canvasH);
    // 标题图
    context.drawImage(ch_i[ch_index].get(0), p_ch1i.x, p_ch1i.y, p_ch1i.w, p_ch1i.h);
    // 标题文字
    context.drawImage(ch_title.get(0), p_ch_title.x, p_ch_title.y, p_ch_title.w, p_ch_title.h);
    context.font      = "bold " + p_ch_title.tw(chp_i[ch_index]) + "px serif";
    context.fillStyle = "rgb(255,255,255)";
    context.fillText(chp_i[ch_index], p_ch_title.tx(chp_i[ch_index]), p_ch_title.ty(chp_i[ch_index]));
    context.drawImage(ch_bg.get(0), (1-0.2)*canvasW, canvasH-0.2*canvasW, 0.2*canvasW, 0.2*canvasW);   // 页脚

    // 选项
    context.drawImage(ch_1[ch_index].get(0), p_ch11.x, p_ch11.y, p_ch11.w, p_ch11.h);
    context.fillStyle = "rgb(113,123,133)";
    context.font = "" + p_ch11.tw(chp_1[ch_index]) + "px serif";
    context.fillText(chp_1[ch_index], p_ch11.tx(chp_1[ch_index]), p_ch11.ty(chp_1[ch_index]));
    if (!choose_set[ch_index][0]) {
      context.drawImage(ch_shadow.get(0), p_ch11.x, p_ch11.y, p_ch11.w, p_ch11.h);
    }
    context.drawImage(ch_2[ch_index].get(0), p_ch12.x, p_ch12.y, p_ch12.w, p_ch12.h);
    context.fillText(chp_2[ch_index], p_ch12.tx(chp_2[ch_index]), p_ch12.ty(chp_2[ch_index]));
    if (!choose_set[ch_index][1]) {
      context.drawImage(ch_shadow.get(0), p_ch12.x, p_ch12.y, p_ch12.w, p_ch12.h);
    }
    context.drawImage(ch_3[ch_index].get(0), p_ch13.x, p_ch13.y, p_ch13.w, p_ch13.h);
    context.fillText(chp_3[ch_index], p_ch13.tx(chp_3[ch_index]), p_ch13.ty(chp_3[ch_index]));
    if (!choose_set[ch_index][2]) {
      context.drawImage(ch_shadow.get(0), p_ch13.x, p_ch13.y, p_ch13.w, p_ch13.h);
    }
    context.drawImage(ch_4[ch_index].get(0), p_ch14.x, p_ch14.y, p_ch14.w, p_ch14.h);
    context.fillText(chp_4[ch_index], p_ch14.tx(chp_4[ch_index]), p_ch14.ty(chp_4[ch_index]));
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
    if (backbtn.clicked(e.changedTouches[0].pageX-canvas.offset().left, e.changedTouches[0].pageY-canvas.offset().top) && ch4_run && current >= click_delay) {
      runPage -= 1;
      ch4_run = false;
    }
    if (p_ch11.clicked(e.changedTouches[0].pageX-canvas.offset().left, e.changedTouches[0].pageY-canvas.offset().top) && ch4_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[3][0]);
      choose_set[3][0] = true;
      choose_set[3][1] = false;
      choose_set[3][2] = false;
      choose_set[3][3] = false;
      runPage += 1;
      setTimeout(function(){ch4_run = false;}, 1000);
    }
    if (p_ch12.clicked(e.changedTouches[0].pageX-canvas.offset().left, e.changedTouches[0].pageY-canvas.offset().top) && ch4_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[3][1]);
      choose_set[3][0] = false;
      choose_set[3][1] = true;
      choose_set[3][2] = false;
      choose_set[3][3] = false;
      runPage += 1;
      setTimeout(function(){ch4_run = false;}, 1000);
    }
    if (p_ch13.clicked(e.changedTouches[0].pageX-canvas.offset().left, e.changedTouches[0].pageY-canvas.offset().top) && ch4_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[3][2]);
      choose_set[3][0] = false;
      choose_set[3][1] = false;
      choose_set[3][2] = true;
      choose_set[3][3] = false;
      runPage += 1;
      setTimeout(function(){ch4_run = false;}, 1000);
    }
    if (p_ch14.clicked(e.changedTouches[0].pageX-canvas.offset().left, e.changedTouches[0].pageY-canvas.offset().top) && ch4_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[3][3]);
      choose_set[3][0] = false;
      choose_set[3][1] = false;
      choose_set[3][2] = false;
      choose_set[3][3] = true;
      runPage += 1;
      setTimeout(function(){ch4_run = false;}, 1000);
    }
  });
  // ----------------选择题5------------- #8
  function choose5() {
    context.clearRect(0, 0, canvasW, canvasH);
    current += 1+4*isAndroid();
    ch_index = 4;
    context.save();
    if (current < p_fade.num()) {
      context.globalAlpha = current/p_fade.num();
    }
    context.fillStyle = str_color_ch;
    context.fillRect(0, 0, canvasW, canvasH);
    // 标题图
    context.drawImage(ch_i[ch_index].get(0), p_ch1i.x, p_ch1i.y, p_ch1i.w, p_ch1i.h);
    // 标题文字
    context.drawImage(ch_title.get(0), p_ch_title.x, p_ch_title.y, p_ch_title.w, p_ch_title.h);
    context.font      = "bold " + p_ch_title.tw(chp_i[ch_index]) + "px serif";
    context.fillStyle = "rgb(255,255,255)";
    context.fillText(chp_i[ch_index], p_ch_title.tx(chp_i[ch_index]), p_ch_title.ty(chp_i[ch_index]));

    // 选项
    context.drawImage(ch_1[ch_index].get(0), p_ch11.x, p_ch11.y, p_ch11.w, p_ch11.h);
    context.fillStyle = "rgb(113,123,133)";
    context.font = "" + p_ch11.tw(chp_1[ch_index]) + "px serif";
    context.fillText(chp_1[ch_index], p_ch11.tx(chp_1[ch_index]), p_ch11.ty(chp_1[ch_index]));
    if (!choose_set[ch_index][0]) {
      context.drawImage(ch_shadow.get(0), p_ch11.x, p_ch11.y, p_ch11.w, p_ch11.h);
    }
    context.drawImage(ch_2[ch_index].get(0), p_ch12.x, p_ch12.y, p_ch12.w, p_ch12.h);
    context.fillText(chp_2[ch_index], p_ch12.tx(chp_2[ch_index]), p_ch12.ty(chp_2[ch_index]));
    if (!choose_set[ch_index][1]) {
      context.drawImage(ch_shadow.get(0), p_ch12.x, p_ch12.y, p_ch12.w, p_ch12.h);
    }
    context.drawImage(ch_3[ch_index].get(0), p_ch13.x, p_ch13.y, p_ch13.w, p_ch13.h);
    context.fillText(chp_3[ch_index], p_ch13.tx(chp_3[ch_index]), p_ch13.ty(chp_3[ch_index]));
    if (!choose_set[ch_index][2]) {
      context.drawImage(ch_shadow.get(0), p_ch13.x, p_ch13.y, p_ch13.w, p_ch13.h);
    }
    context.drawImage(ch_4[ch_index].get(0), p_ch14.x, p_ch14.y, p_ch14.w, p_ch14.h);
    context.fillText(chp_4[ch_index], p_ch14.tx(chp_4[ch_index]), p_ch14.ty(chp_4[ch_index]));
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
    if (backbtn.clicked(e.changedTouches[0].pageX-canvas.offset().left, e.changedTouches[0].pageY-canvas.offset().top) && ch5_run && current >= click_delay) {
      runPage -= 1;
      ch5_run = false;
    }
    if (p_ch11.clicked(e.changedTouches[0].pageX-canvas.offset().left, e.changedTouches[0].pageY-canvas.offset().top) && ch5_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[4][0]);
      choose_set[4][0] = true;
      choose_set[4][1] = false;
      choose_set[4][2] = false;
      choose_set[4][3] = false;
      runPage += 1;
      setTimeout(function(){ch5_run = false;}, 1000);
    }
    if (p_ch12.clicked(e.changedTouches[0].pageX-canvas.offset().left, e.changedTouches[0].pageY-canvas.offset().top) && ch5_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[4][1]);
      choose_set[4][0] = false;
      choose_set[4][1] = true;
      choose_set[4][2] = false;
      choose_set[4][3] = false;
      runPage += 1;
      setTimeout(function(){ch5_run = false;}, 1000);
    }
    if (p_ch13.clicked(e.changedTouches[0].pageX-canvas.offset().left, e.changedTouches[0].pageY-canvas.offset().top) && ch5_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[4][2]);
      choose_set[4][0] = false;
      choose_set[4][1] = false;
      choose_set[4][2] = true;
      choose_set[4][3] = false;
      runPage += 1;
      setTimeout(function(){ch5_run = false;}, 1000);
    }
    if (p_ch14.clicked(e.changedTouches[0].pageX-canvas.offset().left, e.changedTouches[0].pageY-canvas.offset().top) && ch5_run && current >= click_delay) {
      $("#pscore"+ch_index).text(score_set[4][3]);
      choose_set[4][0] = false;
      choose_set[4][1] = false;
      choose_set[4][2] = false;
      choose_set[4][3] = true;
      runPage += 1;
      setTimeout(function(){ch5_run = false;}, 1000);
    }
  });
  // -----------结果页面----------- #9
  var rst_b_height = 0.12;
  var p_rst_btn = {
    y : canvasH*(1-rst_b_height-0.015),
    h : canvasH*rst_b_height,
    w : canvasH*146/99*rst_b_height,
    x : canvasW/2-canvasH*rst_b_height*146/99/2,
    clicked : clicked
  };
  var p_rst_guide = {
    h : p_rst_btn.h*34/99,
    w : p_rst_btn.w*64/146,
    x : function() {
      return p_rst_btn.x-this.w;
    },
    y : function() {
      return p_rst_btn.y+this.h;
    }
  };
  var p_rst_img = {
    x : canvasW/2-canvasH*0.37*900/388/2,
    y : 0,
    h : canvasH*0.37,
    w : canvasH*0.37*900/388
  }
  var p_rst_t = {
    x : 0,
    y : canvasH*0.37+40,
    h : canvasW*106/634,
    w : canvasW,
    tx : function() {
      return canvasW*275/1600;
    },
    ty : function() {
      return this.y+this.tw()*2.05;
    },
    tw : function() {
      return this.h*2/7.15;
    }
  }
  var p_rst_text = {
    w : (1-0.075-0.15/2)/20*canvasW,
    x : 0.15/2*canvasW,
    y : p_rst_t.y+p_rst_t.h,
    num : 19
  }
  function testrst() {
    current += 1+4*isAndroid();
    context.save();
    if (current < p_fade.num()) {
      context.globalAlpha = current/p_fade.num();
    }
    context.clearRect(0, 0, canvasW, canvasH);
    context.drawImage(rst_i[rst_class].get(0), p_rst_img.x, p_rst_img.y, p_rst_img.w, p_rst_img.h);
    context.drawImage(rst_t.get(0), p_rst_t.x, p_rst_t.y, p_rst_t.w, p_rst_t.h);
    context.save();
    context.fillStyle = "rgb(255,255,255)";
    context.font = "bold " + p_rst_t.tw() + "px serif";
    context.fillText($("#prst1"+rst_class).text(), p_rst_t.tx(), p_rst_t.ty());
    context.restore();
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
    context.drawImage(rst_b.get(0), p_rst_btn.x+p_rst_guide.w/2, p_rst_btn.y, p_rst_btn.w, p_rst_btn.h);
    context.drawImage(rst_g.get(0), p_rst_guide.x()+p_rst_guide.w/2, p_rst_guide.y(), p_rst_guide.w, p_rst_guide.h);
    context.restore();
    if (rst_run) {
      setTimeout(testrst, 33);
    } else {
      start(runPage);
    }
  };
  canvas.get(0).addEventListener("touchstart",function(e){    // 9——结果页面响应 $9
    if (p_rst_btn.clicked(e.changedTouches[0].pageX-canvas.offset().left, e.changedTouches[0].pageY-canvas.offset().top) && rst_run && current >= click_delay) {
      runPage += 1;
      rst_run = false;
    }
    if (backbtn.clicked(e.changedTouches[0].pageX-canvas.offset().left, e.changedTouches[0].pageY-canvas.offset().top) && rst_run && current >= click_delay) {
      runPage -= 1;
      rst_run = false;
    }
  });
  
  // -----------分享页面----------- #10
  var p_sha_text = {
    w : (1-0.075-0.15/2)/20*canvasW,
    x : 0.15/2*canvasW,
    y : canvasH*0.36,
    num : 19
  };
  var p_sha_t1 = {
    w : (1-0.075-0.15/2)/20*canvasW,
    x : 0.15/2*canvasW,
    y : 0.8*canvasH+(1-0.75-0.75)/20*canvasW
  };
  var p_sha_pic = {
    y : canvasH*50/1008,
    h : canvasH*268/1008,
    x : canvasW/2-canvasH*268/1008/268*401/2,
    w : canvasH*268/1008/268*401
  };
  var p_sha_btn = {
    w : canvasW,
    h : canvasW*125/640,
    y : canvasH-canvasW*125/640,
    x : 0,
    clicked : clicked
  };
  var p_sha_btn1 = {
    y : canvasH*0.85,
    h : canvasH*0.075,
    w : canvasH*0.075*248/72,
    x : canvasW/2-canvasH*0.075*248/72-20
  };
  var p_sha_btn2 = {
    y : canvasH*0.85,
    h : canvasH*0.075,
    w : canvasH*0.075*248/72,
    x : canvasW/2+20
  };
  function sharepage() {
    current += 1+4*isAndroid();
    context.clearRect(0, 0, canvasW, canvasH);
    context.drawImage(back.get(0), backbtn.x, backbtn.y, backbtn.w, backbtn.h); // 画返回键
    context.drawImage(sha_i.get(0), p_sha_pic.x, p_sha_pic.y, p_sha_pic.w, p_sha_pic.h);
    context.save();
    if (current < p_fade.num()) {
      context.globalAlpha = current/p_fade.num();
    }
    var text = $("#psharei").text();
    context.fillStyle = "rgb(91,91,91)";
    context.font = "italic "+p_sha_t1.w+"px 黑体";
    context.fillText(text.slice(0,18), p_sha_t1.x+p_sha_t1.w, p_sha_t1.y);
    context.fillText(text.slice(18), p_sha_t1.x, p_sha_t1.y+p_sha_t1.w*1.5);
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
      k+=0.5;
    }
    context.restore();
    context.drawImage(sha_btn.get(0), p_sha_btn.x, p_sha_btn.y, p_sha_btn.w, p_sha_btn.h);
    var text_h = p_sha_btn.h*0.225;
    context.font = text_h+"px serif";
    context.fillStyle = "rgb(255,255,255)";
    context.fillText("分享到朋友圈", p_sha_btn.x+text_h*0.6, p_sha_btn.y+text_h*3);
    context.fillText("发送给朋友", p_sha_btn.x+p_sha_btn.w-text_h*6.3, p_sha_btn.y+text_h*3);
    if (share_show>0) {
      context.drawImage(sha_gbg.get(0), 0, 0, canvasW, canvasH);
      context.drawImage(sha_g.get(0), canvasW*0.1, 10, canvasW*0.8, canvasW*0.8*296/479);
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
    if (p_sha_btn.clicked(e.changedTouches[0].pageX-canvas.offset().left, e.changedTouches[0].pageY-canvas.offset().top) && share_run && current >= click_delay) {
      var x_val = e.changedTouches[0].pageX-canvas.offset().left;
      if (x_val/p_sha_btn.w>=204/(204+230+206) && x_val/p_sha_btn.w<=(204+230)/(204+230+206))
        return;
      share_show = 100;
    }
    if (backbtn.clicked(e.changedTouches[0].pageX-canvas.offset().left, e.changedTouches[0].pageY-canvas.offset().top) && share_run && current >= click_delay) {
      runPage -= 1;
      share_run = false;
    }
  });
  init();
  var imgs = LoadImg[WELCOME_PAGE](); // 开始下载欢迎页面的图
  for (var i=0; i<imgs.length; i++) {
    imgs[i].load();
  }
  start(runPage);
});
$(window).resize(function(){
  fun($("#canvas1"));
});
