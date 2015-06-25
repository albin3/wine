var fun = function (){
  var w_body  = $("body").width();
  var h_body  = $("body").height();
  var canvas = $("#canvas");
  canvas.get(0).width  = parseInt(w_body);
  canvas.get(0).height = parseInt(h_body);
  var video = $("#video");
  video.get(0).width = parseInt(w_body);
  video.get(0).height = parseInt(w_body*480/640);
};
$().ready(function() {
  var check_download = function() {};   // 空函数，待重载
  $("img").load(function(){
    $(this).attr("loaded","yes");
    check_download();
  })
  fun();
  var canvas = $('#canvas');
  var canvasW = canvas.width();
  var canvasH = canvas.height();
  var context = canvas.get(0).getContext("2d");
  var img_loading = $("#loading");
  var current = 1;
  var loading_c = 1000;
  var currentPage,lastPage;
  var video = $("#video");
  var audio = $("#bgm").get(0);
  setTimeout(function(){
    audio.play();
  }, 3000);
  var arraw = $("#p09").get(0);
  var loading = {
    show_num: 0,    // 进入效果帧数
    run: function(c) { 
      var c = parseInt(c/2);
      context.save();
      context.transform(1,0,0,1,canvasW/2,canvasH/2);
      context.transform(Math.cos(c*30*Math.PI/180),-Math.sin(c*30*Math.PI/180),Math.sin(c*30*Math.PI/180),Math.cos(c*30*Math.PI/180),0,0);
      context.drawImage(img_loading.get(0),0,0,100,100,-100/2,-100/2,100,100);
      context.restore();
    }
  }
  var music = {
    r: 50,
    x_left: 0.02,   // 离右边的距离
    y_left: 0.02,   // 离下面的距离
    alpha: 0,
    run: function(c) {
      var music = $("#music").get(0);
      var a = this.alpha;
      context.save();
      context.transform(1,0,0,1,canvasW*(1-this.x_left)-2*this.r,canvasH*(1-this.y_left)-2*this.r);
      context.transform(Math.cos(a*Math.PI/180),-Math.sin(a*Math.PI/180),Math.sin(a*Math.PI/180),Math.cos(a*Math.PI/180),0,0);
      context.drawImage(music,0,0,100,100,-1*this.r,-1*this.r,2*this.r,2*this.r);
      context.restore();

      if (!audio.paused) {
        this.alpha = this.alpha + 1*1.5;
      }
    },
    touchme: function(start_x, start_y) {
      var touch = {clientX: start_x, clientY: start_y};
      if (touch.clientX>=canvasW*(1-this.x_left)-3*this.r && touch.clientY>=canvasH*(1-this.y_left)-3*this.r
          && touch.clientX<=canvasW*(1-this.x_left)+1*this.r && touch.clientY<=canvasH*(1-this.y_left)+1*this.r) {
        console.log("true");
        return true;
      } else {
        console.log("false");
        return false;
      }
    },
    touched: function() {
      if (audio.paused)
        audio.play();
      else 
        audio.pause();
    }
  }
  var page_index = 0;
  var ch_page_num = 20;
  var direction = "up";   // "up","down"
  function animate() {    // 开启下一个页面
    context.clearRect(0,0,canvasW,canvasH);
    if (currentPage.ready()) {      // 图片下载完成，进行切换
      if (current<ch_page_num&&lastPage!=currentPage) {
        context.save();
        if (direction == "up") {      // 老页面消失
          context.transform(1,0,0,1,0,-canvasH*current/ch_page_num);
        } else {
          context.transform(1,0,0,1,0,canvasH*current/ch_page_num);
        }
        lastPage.run();
        context.restore();
        context.save();             // 新页面进入
        if (direction == "up") {
          context.transform(1,0,0,1,0,canvasH*(1-current/ch_page_num));
        } else {
          context.transform(1,0,0,1,0,-canvasH*(1-current/ch_page_num));
        }
        currentPage.run(current);
        context.restore();
      } else {
        currentPage.run(current);
      }
      current = current + 1;
    } else {
      if (page_index != 0)
        lastPage.run(loading_c);
      loading.run(loading_c);
      loading_c += 1;
    }
    music.run(current);             // 音乐,旋转
    if (!(page_index==0&&!currentPage.left_slip) && page_index!=12) {
      context.save();
      context.globalAlpha = 0.75+0.25*Math.cos(current/9);
      context.drawImage(arraw,0,0,640,1008,0,Math.cos(current/9)*10,canvasW,canvasH);
      context.restore();
    }
    setTimeout(animate, 33);
  }
  function scale_bg(bg,scale,scale_index) {   // background,放大缩小比例,进度
    // 渐变背景
    context.save();
    scale_index = scale_index/100;
    context.transform(1+scale+Math.sin(scale_index)*scale,0,0,1+scale+Math.sin(scale_index)*scale,0,0);
    context.drawImage(bg,0,0,640,1008,0,0,canvasW,canvasH);
    context.restore();
  }
  function draw_white_block(img, skip, last, c) {
    if (c<skip) {
      return;
    }
    var c = c - skip;
    context.save();
    context.globalAlpha = c/last;
    context.drawImage(img,0,0,640,1008,0,0,canvasW,canvasH);
    context.restore();
  }
  function drawBlock(skip, hei, c, last, img) {
    var skip = skip;
    var hei = hei;
    var nums = last;
    var c = c;
    if (c<skip) { } else if (c<last+skip) {       // tu1效果
      var c = c-skip;
      // 下面这句，有疑问
      // 左到右
      context.drawImage(img,0,0,640*c/nums,1008*hei,0,0,canvasW*c/nums,
          canvasH*hei);
      // 右到左
      context.drawImage(img,640-640*c/nums,1008*hei,640*c/nums,1008*(1-hei),
          canvasW-canvasW*c/nums,canvasH*hei,canvasW*c/nums,canvasH-canvasH*hei);
    } else {
      context.drawImage(img,0,0,640,1008,0,0,canvasW,canvasH);
    }
  }
  function drawText(skip, cut_num, c, last, imgs) {
    var p = cut_num;
    var skip = skip;
    var nums = last;
    if (c<skip)
      return ;
    if (c<nums+skip) {
      var c = c-skip;
      for (var i=0; i<p; i++) {
        context.drawImage(imgs,640*i/p,0,c*640/p/nums,1008,canvasW*i/p,0,
            c*canvasW/p/nums,canvasH);
      }
    } else
      context.drawImage(imgs,0,0,640,1008,0,0,canvasW,canvasH);
  }
  function splitVertical(skip, split, c, last, img) {
    if (c<skip)
     return ;
   if (c<last+skip) {
     var c = c-skip;
      for (var i=0; i<split; i++) {
        context.drawImage(img,0,1008*i/split,640,c*1008/split/last,0,canvasH*i/split,
            canvasW,c*canvasH/split/last);
      }
   } else
      context.drawImage(img,0,0,640,1008,0,0,canvasW,canvasH);
  }
  var page12 = {
    shadow_keep: 0,
    imgs: [$('#p121'), $('#p122'), $('#p123'), $('#p124'), $('#p125'), $('#p126'), $('#p127')],
    download: function() {
      var i=0;
      for (; i<this.imgs.length; i++) {
        if (this.imgs[i].attr("src") === undefined) {
          this.imgs[i].attr("src", this.imgs[i].attr("load"));
        }
      }
    },
    ready: function() {
      var i=0;
      for (; i<this.imgs.length; i++) {
        if (!this.imgs[i].attr("loaded"))
          return false;
      }
      // page11.download();
      return true;
    },
    show_num: ch_page_num,
    run: function(c) {
      var c = c;
      var num = this.show_num;
      var scale_num = this.show_num;
      var light_skip = 50;
      var light_num = 50;
      var in_num = 0;   // 进入效果
      var light_num = 50;           // 点亮效果
      var light_keep = 0;          // 点亮维持
      var scale_num = 60;           // 缩小效果
      var scale_keep = 30;          // 缩小维持
      var building_num = 100;       // 显示建筑
      var love_num = 60;            // 显示全世爱
      if (c<in_num) {                     // 背景+地图 出现
        context.save();
        // context.transform(1,0,0,1,0,canvasH*(1-c/in_num));
          context.save();
          context.drawImage(this.imgs[0].get(0),0,0,640,10,0,0,canvasW,canvasH);
          context.restore();
        context.transform(1,0,0,1,canvasW/2,canvasH);
        context.transform(1.5,0,0,1.5,0,0);
        context.drawImage(this.imgs[0].get(0),0,0,640,1008,-canvasW/2,-canvasH/2,canvasW,canvasH);
        context.drawImage(this.imgs[1].get(0),0,0,640,1008,-canvasW/2,-canvasH/2,canvasW,canvasH);
        context.restore();
      } else if (c<in_num+light_num+light_keep) {    // 渐亮
        context.save();
          context.save();
          context.drawImage(this.imgs[0].get(0),0,0,640,10,0,0,canvasW,canvasH);
          context.restore();
        context.transform(1,0,0,1,canvasW/2,canvasH);
        context.transform(1.5,0,0,1.5,0,0);
        context.drawImage(this.imgs[0].get(0),0,0,640,1008,-canvasW/2,-canvasH/2,canvasW,canvasH);
          var c = c - in_num;
          if (c<light_num) {
            context.save();
            context.globalAlpha = c/light_num;
            context.drawImage(this.imgs[2].get(0),0,0,640,1008,-canvasW/2,-canvasH/2,canvasW,canvasH);
            context.restore();
          } else {
            context.drawImage(this.imgs[2].get(0),0,0,640,1008,-canvasW/2,-canvasH/2,canvasW,canvasH);
          }
        context.drawImage(this.imgs[1].get(0),0,0,640,1008,-canvasW/2,-canvasH/2,canvasW,canvasH);
        context.restore();
      } else if (c<in_num+light_num+light_keep+scale_num) {   // 缩小效果
        var c = c-(in_num+light_num+light_keep);
        var num = scale_num;
        context.save();
          context.save();
          context.drawImage(this.imgs[0].get(0),0,0,640,10,0,0,canvasW,canvasH);
          context.restore();
        context.transform(1,0,0,1,(1-c/num)*canvasW/2,(1-c/num)*canvasH);
        context.transform(1.5-0.5*c/scale_num,0,0,1.5-0.5*c/scale_num,0,0);
        context.drawImage(this.imgs[0].get(0),0,0,640,1008,-canvasW/2*(1-c/num),-canvasH/2*(1-c/num),canvasW,canvasH);
        context.drawImage(this.imgs[2].get(0),0,0,640,1008,-canvasW/2*(1-c/num),-canvasH/2*(1-c/num),canvasW,canvasH);
        context.drawImage(this.imgs[1].get(0),0,0,640,1008,-canvasW/2*(1-c/num),-canvasH/2*(1-c/num),canvasW,canvasH);
        context.restore();
      } else if (c<in_num+light_num+light_keep+scale_num+scale_keep+building_num+love_num) {   // 建筑及全世爱
        var c = c-(in_num+light_num+light_keep+scale_num+scale_keep);
        context.drawImage(this.imgs[0].get(0),0,0,640,1008,0,0,canvasW,canvasH);
        context.drawImage(this.imgs[2].get(0),0,0,640,1008,0,0,canvasW,canvasH);
        context.drawImage(this.imgs[1].get(0),0,0,640,1008,0,0,canvasW,canvasH);
        if (c<0) {    // scale_keep
        } else if (c<building_num) {
          context.save();
          context.globalAlpha = c/building_num;
          context.drawImage(this.imgs[5].get(0),0,0,640,1008,0,0,canvasW,canvasH);
          context.restore();
          drawText(0, 100, c, building_num, this.imgs[6].get(0));
        } else {
          context.drawImage(this.imgs[5].get(0),0,0,640,1008,0,0,canvasW,canvasH);
          context.drawImage(this.imgs[6].get(0),0,0,640,1008,0,0,canvasW,canvasH);
        }
      } else {
        context.drawImage(this.imgs[0].get(0),0,0,640,1008,0,0,canvasW,canvasH);
        context.drawImage(this.imgs[2].get(0),0,0,640,1008,0,0,canvasW,canvasH);
        context.drawImage(this.imgs[1].get(0),0,0,640,1008,0,0,canvasW,canvasH);
        context.drawImage(this.imgs[5].get(0),0,0,640,1008,0,0,canvasW,canvasH);
      }
      if (c<in_num+light_num+light_keep+scale_num) {
      } else {
        if (this.shadow_keep>0) {
          context.drawImage(this.imgs[4].get(0),0,0,640,1008,0,0,canvasW,canvasH);
          context.drawImage(this.imgs[3].get(0),0,0,640,1008,0,0,canvasW,canvasH);
          this.shadow_keep = this.shadow_keep-1;
        } else {
          context.drawImage(this.imgs[6].get(0),0,0,640,1008,0,0,canvasW,canvasH);
        }
      }
    }
  }
  var page11 = {
    imgs: [$('#p111'), $('#p112'), $('#p113'), $('#p114')],
    download: function() {
      var i=0;
      for (; i<this.imgs.length; i++) {
        if (this.imgs[i].attr("src") === undefined) {
          this.imgs[i].attr("src", this.imgs[i].attr("load"));
        }
      }
    },
    ready: function() {
      var i=0;
      for (; i<this.imgs.length; i++) {
        if (!this.imgs[i].attr("loaded"))
          return false;
      }
      page12.download();
      return true;
    },
    show_num: ch_page_num,
    run: function(c) {
      var c = c;
      var num = this.show_num;
      var n = parseInt(Math.random()*8)+1;
      scale_bg(this.imgs[0].get(0),0.1,c);    // BG
      var num = 60;
      if (c<this.show_num) {
      } else if (c<this.show_num+num) {
        var c = c-this.show_num;
        context.save();
        context.globalAlpha = c/num;
        context.drawImage(this.imgs[1].get(0),0,0,640,1008,0,0,canvasW,canvasH);
        context.restore();
      } else
        context.drawImage(this.imgs[1].get(0),0,0,640,1008,0,0,canvasW,canvasH);
      // drawBlock(50, 0.585, c, 60, this.imgs[2].get(0));  // skip, height, c, last, img
      draw_white_block(this.imgs[2].get(0),this.show_num,60,c); // img,skip,last,c
      context.save();
      context.globalAlpha = 0.75+0.25*Math.cos(c/21);
      drawText(this.show_num+20, 150, c, 30, this.imgs[3].get(0));    // skip, 切片数, c, last, img
      context.restore();
    }
  }
  var page10 = {
    imgs: [$('#p101'), $('#p102'), $('#p103')],
    download: function() {
      var i=0;
      for (; i<this.imgs.length; i++) {
        if (this.imgs[i].attr("src") === undefined) {
          this.imgs[i].attr("src", this.imgs[i].attr("load"));
        }
      }
    },
    ready: function() {
      var i=0;
      for (; i<this.imgs.length; i++) {
        if (!this.imgs[i].attr("loaded"))
          return false;
      }
      page11.download();
      return true;
    },
    show_num: ch_page_num,
    run: function(c) {
      var c = c;
      var num = this.show_num;
      var n = parseInt(Math.random()*8)+1;
      scale_bg(this.imgs[0].get(0),0.1,c);    // BG
      // drawBlock(50, 0.585, c, 60, this.imgs[2].get(0));  // skip, height, c, last, img
      draw_white_block(this.imgs[2].get(0),this.show_num,60,c); // img,skip,last,c
      drawText(this.show_num+20, 150, c, 30, this.imgs[1].get(0));    // skip, 切片数, c, last, img
    }
  }
  var page9 = {
    imgs: [$('#p91'), $('#p92'), $('#p93')],
    download: function() {
      var i=0;
      for (; i<this.imgs.length; i++) {
        if (this.imgs[i].attr("src") === undefined) {
          this.imgs[i].attr("src", this.imgs[i].attr("load"));
        }
      }
    },
    ready: function() {
      var i=0;
      for (; i<this.imgs.length; i++) {
        if (!this.imgs[i].attr("loaded"))
          return false;
      }
      page10.download();
      return true;
    },
    show_num: ch_page_num,
    run: function(c) {
      var c = c;
      var num = this.show_num;
      var n = parseInt(Math.random()*8)+1;
      scale_bg(this.imgs[0].get(0),0.1,c);    // BG
      // drawBlock(50, 0.90, c, 60, this.imgs[2].get(0));  // skip, height, c, last, img
      draw_white_block(this.imgs[2].get(0),this.show_num,60,c); // img,skip,last,c
      drawText(this.show_num+20, 150, c, 30, this.imgs[1].get(0));    // skip, 切片数, c, last, img
    }
  }
  var page8 = {
    imgs: [$('#p81'), $('#p82'), $('#p83')],
    download: function() {
      var i=0;
      for (; i<this.imgs.length; i++) {
        if (this.imgs[i].attr("src") === undefined) {
          this.imgs[i].attr("src", this.imgs[i].attr("load"));
        }
      }
    },
    ready: function() {
      var i=0;
      for (; i<this.imgs.length; i++) {
        if (!this.imgs[i].attr("loaded"))
          return false;
      }
      page9.download();
      return true;
    },
    show_num: ch_page_num,
    run: function(c) {
      var c = c;
      var num = this.show_num;
      var n = parseInt(Math.random()*8)+1;
      scale_bg(this.imgs[0].get(0),0.1,c);    // BG
      // drawBlock(60, 0.675, c, 60, this.imgs[2].get(0));  // skip, height, c, last, img
      draw_white_block(this.imgs[2].get(0),this.show_num,60,c); // img,skip,last,c
      drawText(this.show_num+20, 150, c, 30, this.imgs[1].get(0));    // skip, 切片数, c, last, img
    }
  }
  var page7 = {
    imgs: [$('#p71'), $('#p72'), $('#p73')],
    download: function() {
      var i=0;
      for (; i<this.imgs.length; i++) {
        if (this.imgs[i].attr("src") === undefined) {
          this.imgs[i].attr("src", this.imgs[i].attr("load"));
        }
      }
    },
    ready: function() {
      var i=0;
      for (; i<this.imgs.length; i++) {
        if (!this.imgs[i].attr("loaded"))
          return false;
      }
      page8.download();
      return true;
    },
    show_num: ch_page_num,
    run: function(c) {
      var c = c;
      var num = this.show_num;
      var n = parseInt(Math.random()*8)+1;
      scale_bg(this.imgs[0].get(0),0.1,c);    // BG
      // drawBlock(50, 0.765, c, 60, this.imgs[2].get(0));  // skip, height, c, last, img
      draw_white_block(this.imgs[2].get(0),this.show_num,60,c); // img,skip,last,c
      drawText(this.show_num+20, 150, c, 30, this.imgs[1].get(0));    // skip, 切片数, c, last, img
    }
  }
  var page6 = {
    imgs: [$('#p61'), $('#p62'), $('#p63')],
    download: function() {
      var i=0;
      for (; i<this.imgs.length; i++) {
        if (this.imgs[i].attr("src") === undefined) {
          this.imgs[i].attr("src", this.imgs[i].attr("load"));
        }
      }
    },
    ready: function() {
      var i=0;
      for (; i<this.imgs.length; i++) {
        if (!this.imgs[i].attr("loaded"))
          return false;
      }
      page7.download();
      return true;
    },
    show_num: ch_page_num,
    run: function(c) {
      var c = c;
      var num = this.show_num;
      var n = parseInt(Math.random()*8)+1;
      scale_bg(this.imgs[0].get(0),0.1,c);    // BG
      // drawBlock(50, 0.765, c, 60, this.imgs[2].get(0));  // skip, height, c, last, img
      draw_white_block(this.imgs[2].get(0),this.show_num,60,c); // img,skip,last,c
      drawText(this.show_num+20, 150, c, 30, this.imgs[1].get(0));    // skip, 切片数, c, last, img
    }
  }
  var page5 = {
    imgs: [$('#p51'), $('#p52'), $('#p53')],
    download: function() {
      var i=0;
      for (; i<this.imgs.length; i++) {
        if (this.imgs[i].attr("src") === undefined) {
          this.imgs[i].attr("src", this.imgs[i].attr("load"));
        }
      }
    },
    ready: function() {
      var i=0;
      for (; i<this.imgs.length; i++) {
        if (!this.imgs[i].attr("loaded"))
          return false;
      }
      page6.download();
      return true;
    },
    show_num: ch_page_num,
    run: function(c) {
      var c = c;
      var num = this.show_num;
      var n = parseInt(Math.random()*8)+1;
      scale_bg(this.imgs[0].get(0),0.1,c);    // BG
      // drawBlock(50, 0.699, c, 60, this.imgs[2].get(0));  // skip, height, c, last, img
      draw_white_block(this.imgs[2].get(0),this.show_num,60,c); // img,skip,last,c
      drawText(this.show_num+20, 150, c, 30, this.imgs[1].get(0));    // skip, 切片数, c, last, img
    }
  }
  var page4 = {
    imgs: [$('#p41'), $('#p42'), $('#p43')],
    download: function() {
      var i=0;
      for (; i<this.imgs.length; i++) {
        if (this.imgs[i].attr("src") === undefined) {
          this.imgs[i].attr("src", this.imgs[i].attr("load"));
        }
      }
    },
    ready: function() {
      var i=0;
      for (; i<this.imgs.length; i++) {
        if (!this.imgs[i].attr("loaded"))
          return false;
      }
      page5.download();
      return true;
    },
    show_num: 60,
    run: function(c) {
      var c = c;
      var num = this.show_num;
      var n = parseInt(Math.random()*8)+1;
      scale_bg(this.imgs[0].get(0),0.1,c);    // BG
      // drawBlock(50, 0.699, c, 60, this.imgs[2].get(0));  // skip, height, c, last, img
      draw_white_block(this.imgs[2].get(0),this.show_num,60,c); // img,skip,last,c
      drawText(this.show_num+20, 150, c, 30, this.imgs[1].get(0));    // skip, 切片数, c, last, img
    }
  }
  var page3 = {
    imgs: [$('#p31'), $('#p32'), $('#p33')],
    download: function() {
      var i=0;
      for (; i<this.imgs.length; i++) {
        if (this.imgs[i].attr("src") === undefined) {
          this.imgs[i].attr("src", this.imgs[i].attr("load"));
        }
      }
    },
    ready: function() {
      var i=0;
      for (; i<this.imgs.length; i++) {
        if (!this.imgs[i].attr("loaded"))
          return false;
      }
      page4.download();
      return true;
    },
    show_num: 60,
    run: function(c) {
      var c = c;
      var num = this.show_num;
      var n = parseInt(Math.random()*8)+1;
      scale_bg(this.imgs[0].get(0),0.1,c);    // BG
      // drawBlock(50, 0.699, c, 60, this.imgs[2].get(0));  // skip, height, c, last, img
      draw_white_block(this.imgs[2].get(0),this.show_num,60,c); // img,skip,last,c
      drawText(this.show_num+20, 150, c, 30, this.imgs[1].get(0));    // skip, 切片数, c, last, img
    }
  }
  var page2 = {
    imgs: [$('#p21'), $('#p22'), $('#p23')],
    download: function() {
      var i=0;
      for (; i<this.imgs.length; i++) {
        if (this.imgs[i].attr("src") === undefined) {
          this.imgs[i].attr("src", this.imgs[i].attr("load"));
        }
      }
    },
    ready: function() {
      var i=0;
      for (; i<this.imgs.length; i++) {
        if (!this.imgs[i].attr("loaded"))
          return false;
      }
      page3.download();
      return true;
    },
    show_num: ch_page_num,
    run: function(c) {
      var c = c;
      var num = this.show_num;
      scale_bg(this.imgs[0].get(0),0.1,c);    // BG
        
      // drawBlock(50, 0.759, c, 60, this.imgs[2].get(0));  // skip, height, c, last, img
      draw_white_block(this.imgs[2].get(0),this.show_num,60,c); // img,skip,last,c
      drawText(this.show_num+20, 150, c, 30, this.imgs[1].get(0));    // skip, 切片数, c, last, img
    }
  }
  var page1 = {   // 第一页   从左到右
    imgs: [$('#p11'), $('#p12'), $('#p13')],
    download: function() {
      var i=0;
      for (; i<this.imgs.length; i++) {
        if (this.imgs[i].attr("src") === undefined) {
          this.imgs[i].attr("src", this.imgs[i].attr("load"));
        }
      }
    },
    ready: function() {
      var i=0;
      for (; i<this.imgs.length; i++) {
        if (!this.imgs[i].attr("loaded"))
          return false;
      }
      page2.download();
      return true;
    },
    show_num: ch_page_num,
    scale_index: 1,
    run: function(c) {
      var c = c;
      var num = this.show_num;

      scale_bg(this.imgs[0].get(0),0.1,c);    // BG
        
      // drawBlock(50, 0.561, c, 60, this.imgs[2].get(0));  // skip, height, c, last, img
      draw_white_block(this.imgs[2].get(0),this.show_num,60,c); // img,skip,last,c
      drawText(this.show_num+20, 150, c, 30, this.imgs[1].get(0));    // skip, 切片数, c, last, img
    }
  }
  var page0 = {   // 首页  背景渐入
    imgs: [$('#p01'), $('#p02'), $('#p03'), $('#p04'), $('#p05'), $('#p06'), $('#p07'), $('#p08'), $('#p09')],
    download: function() {
      var i=0;
      for (; i<this.imgs.length; i++)
        if (this.imgs[i].attr('src')===undefined)
          this.imgs[i].attr("src", this.imgs[i].attr("load"));
    },
    ready: function() {
      var i=0;
      for (; i<this.imgs.length; i++) {
        if (!this.imgs[i].attr("loaded"))
          return false;
      }
      page1.download();
      return true;
    },
    show_num: ch_page_num,
    finger_r: 200,
    finger_l: 0,
    finger_p: 200,
    finger_v: 8,
    finger_move : function() {
      this.finger_p = this.finger_p - this.finger_v;
      if (this.finger_p<this.finger_l) {
        this.finger_p = this.finger_r;
      }
    },
    left_slip: false,    // 左滑
    run: function (c) {
      if (c==undefined) 
      var c = 10000;
      if (!this.left_slip) {
        context.drawImage(this.imgs[0].get(0),0,0,640,1008,0,0,canvasW,canvasH);
        context.drawImage(this.imgs[1].get(0),0,0,640,1008,0,0,canvasW,canvasH);
        context.drawImage(this.imgs[2].get(0),0,0,640,1008,0,0,canvasW,canvasH);
        context.drawImage(this.imgs[3].get(0),0,0,640,1008,this.finger_p,0,canvasW,canvasH);
        this.finger_move();
        context.drawImage(this.imgs[4].get(0),0,0,640,1008,0,0,canvasW,canvasH);
      } else {
        var num = 20; // 消失
        var skip = 10;// 消失后暂停
        var scale = 0.3;
        var in_num = 30;
        if (c<num) {
          context.save();
          context.globalAlpha = 1-c/num;
          context.transform(1+scale*c/num,0,0,1+scale*c/num,0,0);
          context.transform(1,0,0,1,-canvasW*c/num/9,-canvasH*c/num/4);
          context.drawImage(this.imgs[0].get(0),0,0,640,1008,0,0,canvasW,canvasH);
          context.drawImage(this.imgs[1].get(0),0,0,640,1008,0,0,canvasW,canvasH);
          context.drawImage(this.imgs[2].get(0),0,0,640,1008,0,0,canvasW,canvasH);
          context.drawImage(this.imgs[3].get(0),0,0,640,1008,this.finger_p,0,canvasW,canvasH);
          this.finger_move();
          context.drawImage(this.imgs[4].get(0),0,0,640,1008,0,0,canvasW,canvasH);
          context.restore();
        } else if (c<num+in_num) {
          var c = c-num;
          context.save();
          context.globalAlpha = c/num;
          context.transform(1+scale*(1-c/in_num),0,0,1+scale*(1-c/in_num),0,0);
          context.transform(1,0,0,1,-canvasW*(1-c/in_num)/9,-canvasH*(1-c/in_num)/4);
          context.drawImage(this.imgs[5].get(0),0,0,640,1008,0,0,canvasW,canvasH);
          context.restore();
        } else {
          context.drawImage(this.imgs[5].get(0),0,0,640,1008,0,0,canvasW,canvasH);
        }
        var lifestyle = 15;
        if (c<num+in_num) 
          ;
        else if (c<num+in_num+lifestyle){
          var c = c-(num+in_num);
          var base = 0.06;
          context.drawImage(this.imgs[6].get(0),0,0,640,1008,0,-base*canvasH*(1-c/lifestyle),canvasW,canvasH);
        } else {
          context.drawImage(this.imgs[6].get(0),0,0,640,1008,0,0,canvasW,canvasH);
        }
        var text_skip = 30;
        var text_num = 150;
        if (c<text_skip) {
        } else if (c<text_skip+text_num) {
          var c = c - text_skip;
          context.drawImage(this.imgs[7].get(0),0,0,640,1008*c/text_num,0,0,canvasW,canvasH*c/text_num);
        } else {
          context.drawImage(this.imgs[7].get(0),0,0,640,1008,0,0,canvasW,canvasH);
        }
      }
    }
  }
  var pages = [page0, page1, page2, page3, page4, page5, page6, page7, page8, page9, page10, page11, page12];
  var played = false;

  var start_x = 0;
  var start_y = 0;
  var end_x = 0;
  var end_y = 0;
  var proc_change = function() {
    video.get(0).pause();
    video.hide();
    if (audio.paused)
      audio.play();

    if (music.touchme(start_x,start_y)) {
      return music.touched();
    } else if (end_x-start_x<-30 &&            // 左滑
        Math.abs((end_y-start_y)/(end_x-start_x))<1) {
      if (page0.left_slip)
        return;
      current = 0;
      page0.left_slip = true;
    } else if (start_y-end_y>100 &&             // 上滑
        Math.abs((end_x-start_x)/(end_y-start_y))<1) {
      if (page_index == 12) {
        lastPage = pages[page_index];
        page_index = 0;
        currentPage = pages[page_index];
        current = 1;
        direction = "up";
        return;
      }
      if (currentPage.ready() && page0.left_slip) {
        lastPage = pages[page_index];
        page_index = page_index + 1;
        currentPage = pages[page_index];
        current = 1;
      }
      direction = "up";
    } else if (end_y-start_y>100 &&             // 下滑
        Math.abs((end_x-start_x)/(end_y-start_y))<1) {
      if (page_index == 0) {
        if (page12.ready()) {
          lastPage = pages[page_index];
          page_index = 12;
          currentPage = pages[page_index];
          current = 1;
          direction = "down";
        }
        return;
      }
      if (currentPage.ready() && page0.left_slip) {
        lastPage = pages[page_index];
        page_index = page_index - 1;
        currentPage = pages[page_index];
        current = 1;
      }
      direction = "down";
    } else if (page_index == 12) {
      page12.shadow_keep = 50;
      return;
    } else if (page_index == 11) {
      if (end_x>canvasW*0.2 && end_x<canvasW*0.8
       && end_y>canvasH*0.3 && end_y<canvasH*0.6) {
        video.get(0).play();
        video.show();
      }
    }
  }
  canvas.get(0).addEventListener("touchend",function(e){
    event.preventDefault();
    proc_change();
  });
  canvas.get(0).addEventListener("touchcancel",function(e){
    event.preventDefault();
    proc_change();
  });
  canvas.get(0).addEventListener("touchmove",function(e){
    event.preventDefault();
    end_x = e.touches[0].clientX;
    end_y = e.touches[0].clientY;
  });
  canvas.get(0).addEventListener("touchstart",function(e){
    event.preventDefault();
    start_x = e.touches[0].clientX;
    start_y = e.touches[0].clientY;
    end_x = e.touches[0].clientX;
    end_y = e.touches[0].clientY;
  });
  var lastPage = page0;
  pages[page_index].download();
  var currentPage = pages[page_index];
  animate();

  var down_index = 0;
  check_download = function() {
    if (pages[down_index].ready()) {
      down_index = (down_index + 1)%13;
      pages[down_index].download();
    }
  }
});
$(window).resize(function(){
  fun($("#canvas"));
});

