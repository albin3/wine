var fun = function (){
  var w_body  = $("body").width();
  var h_body  = $("body").height();
  var canvas = $("#canvas");
  canvas.get(0).width  = parseInt(w_body);
  canvas.get(0).height = parseInt(h_body);
  var video = $("#video");
  video.get(0).width = parseInt(w_body);
  video.get(0).height = parseInt(h_body);
};
$().ready(function() {
  $("img").load(function(){
    $(this).attr("loaded","yes");
  })
  fun();
  var canvas = $('#canvas');
  var canvasW = canvas.width();
  var canvasH = canvas.height();
  var context = canvas.get(0).getContext("2d");
  var img_loading = $("#loading");
  var current = 1;
  var loading_c = 1;
  var currentPage,lastPage;
  var video = $("#video");
  var audio = $("#bgm").get(0);
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
    touchme: function(e) {
      var touch = e.touches[0];
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
  function animate() {    // 开启下一个页面
    context.clearRect(0,0,canvasW,canvasH);
    if (currentPage.show_num > current) {
      lastPage.run();
    }
    if (currentPage.ready()) {
      currentPage.run(current);
      current = current + 1;
    } else {
      loading.run(loading_c);
      loading_c += 1;
    }
    music.run(current);
    setTimeout(animate, 33)
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
    show_num: 60,
    run: function(c) {
      var c = c;
      var num = this.show_num;
      var scale_num = this.show_num;
      var light_skip = 50;
      var light_num = 50;
      var in_num = this.show_num;   // 进入效果
      var light_num = 50;           // 点亮效果
      var light_keep = 50;          // 点亮维持
      var scale_num = 60;           // 缩小效果
      var scale_keep = 30;          // 缩小维持
      var building_num = 100;       // 显示建筑
      var love_num = 60;            // 显示全世爱
      if (c<in_num) {                     // 背景+地图 出现
        context.save();
        context.transform(1,0,0,1,0,canvasH*(1-c/in_num));
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
        } else {
          context.drawImage(this.imgs[5].get(0),0,0,640,1008,0,0,canvasW,canvasH);
          drawText(0, 100, c-building_num, love_num, this.imgs[6].get(0));
        }
      } else {
        context.drawImage(this.imgs[0].get(0),0,0,640,1008,0,0,canvasW,canvasH);
        context.drawImage(this.imgs[2].get(0),0,0,640,1008,0,0,canvasW,canvasH);
        context.drawImage(this.imgs[1].get(0),0,0,640,1008,0,0,canvasW,canvasH);
        context.drawImage(this.imgs[5].get(0),0,0,640,1008,0,0,canvasW,canvasH);
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
    show_num: 60,
    run: function(c) {
      var c = c;
      var num = this.show_num;
      var n = parseInt(Math.random()*8)+1;
      drawText(0, 6, c, num, this.imgs[0].get(0));
      drawBlock(50, 0.90, c, 60, this.imgs[2].get(0));  // skip, height, c, last, img
      drawText(70, 150, c, 30, this.imgs[1].get(0));    // skip, 切片数, c, last, img
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
    show_num: 60,
    run: function(c) {
      var c = c;
      var num = this.show_num;
      var n = parseInt(Math.random()*8)+1;
      drawText(0, 1, c, num, this.imgs[0].get(0));
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
      drawText(70, 150, c, 30, this.imgs[2].get(0));    // skip, 切片数, c, last, img
      drawText(70, 150, c, 30, this.imgs[3].get(0));    // skip, 切片数, c, last, img
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
    show_num: 60,
    run: function(c) {
      var c = c;
      var num = this.show_num;
      var n = parseInt(Math.random()*8)+1;
      splitVertical(0, 1, c, num, this.imgs[0].get(0));
      drawBlock(50, 0.585, c, 60, this.imgs[2].get(0));  // skip, height, c, last, img
      drawText(70, 150, c, 30, this.imgs[1].get(0));    // skip, 切片数, c, last, img
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
    show_num: 60,
    run: function(c) {
      var c = c;
      var num = this.show_num;
      var n = parseInt(Math.random()*8)+1;
      drawText(0, 6, c, num, this.imgs[0].get(0));
      drawBlock(50, 0.90, c, 60, this.imgs[2].get(0));  // skip, height, c, last, img
      drawText(70, 150, c, 30, this.imgs[1].get(0));    // skip, 切片数, c, last, img
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
    show_num: 58,
    run: function(c) {
      var c = c;
      var num = this.show_num;
      var n = parseInt(Math.random()*8)+1;
      splitVertical(0, 2, c, num, this.imgs[0].get(0));
      drawBlock(60, 0.675, c, 60, this.imgs[2].get(0));  // skip, height, c, last, img
      drawText(80, 150, c, 30, this.imgs[1].get(0));    // skip, 切片数, c, last, img
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
    show_num: 60,
    run: function(c) {
      var c = c;
      var num = this.show_num;
      var n = parseInt(Math.random()*8)+1;
      drawText(0, 6, c, num, this.imgs[0].get(0));
      drawBlock(50, 0.765, c, 60, this.imgs[2].get(0));  // skip, height, c, last, img
      drawText(70, 150, c, 30, this.imgs[1].get(0));    // skip, 切片数, c, last, img
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
    show_num: 60,
    run: function(c) {
      var c = c;
      var num = this.show_num;
      var n = parseInt(Math.random()*8)+1;
      drawText(0, 5, c, num, this.imgs[0].get(0));
      drawBlock(50, 0.765, c, 60, this.imgs[2].get(0));  // skip, height, c, last, img
      drawText(70, 150, c, 30, this.imgs[1].get(0));    // skip, 切片数, c, last, img
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
    show_num: 60,
    run: function(c) {
      var c = c;
      var num = this.show_num;
      var n = parseInt(Math.random()*8)+1;
      drawText(0, 4, c, num, this.imgs[0].get(0));
      drawBlock(50, 0.699, c, 60, this.imgs[2].get(0));  // skip, height, c, last, img
      drawText(70, 150, c, 30, this.imgs[1].get(0));    // skip, 切片数, c, last, img
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
      drawText(0, 3, c, num, this.imgs[0].get(0));
      drawBlock(50, 0.699, c, 60, this.imgs[2].get(0));  // skip, height, c, last, img
      drawText(70, 150, c, 30, this.imgs[1].get(0));    // skip, 切片数, c, last, img
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
      splitVertical(0, 1, c, num, this.imgs[0].get(0));
      drawBlock(50, 0.699, c, 60, this.imgs[2].get(0));  // skip, height, c, last, img
      drawText(70, 150, c, 30, this.imgs[1].get(0));    // skip, 切片数, c, last, img
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
    show_num: 60,
    run: function(c) {
      var c = c;
      var num = this.show_num;
      if (c<this.show_num)
        context.drawImage(this.imgs[0].get(0),0,0,640,1008,canvasW*(c/num-1),0,canvasW,canvasH);
      else 
        context.drawImage(this.imgs[0].get(0),0,0,640,1008,0,0,canvasW,canvasH);
        
      drawBlock(50, 0.759, c, 60, this.imgs[2].get(0));  // skip, height, c, last, img
      drawText(70, 150, c, 30, this.imgs[1].get(0));    // skip, 切片数, c, last, img
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
    show_num: 60,
    run: function(c) {
      var c = c;
      var num = this.show_num;
      if (c<this.show_num)
        context.drawImage(this.imgs[0].get(0),0,0,640,1008,canvasW*(1-c/num),0,canvasW,canvasH);
      else 
        context.drawImage(this.imgs[0].get(0),0,0,640,1008,0,0,canvasW,canvasH);
        
      drawBlock(50, 0.561, c, 60, this.imgs[2].get(0));  // skip, height, c, last, img
      drawText(70, 150, c, 30, this.imgs[1].get(0));    // skip, 切片数, c, last, img
    }
  }
  var page0 = {   // 首页  背景渐入
    imgs: [$('#p01'), $('#p02'), $('#p03')],
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
    show_num: 0,
    nums: 100,
    nums1: 100,
    run: function (c) {
      if (c==undefined) 
      var c = 10000;
      if (c<this.nums) {    // bg 效果
        context.save();
        context.globalAlpha = c/this.nums;
        context.drawImage(this.imgs[0].get(0),0,0,640,1008,0,0,canvasW,canvasH);
        context.restore();
      } else {
        context.drawImage(this.imgs[0].get(0),0,0,640,1008,0,0,canvasW,canvasH);
      }
      drawBlock(45, 0.412, c, 100, this.imgs[2].get(0));
      drawText(60, 150, c, 30, this.imgs[1].get(0));
    }
  }
  var pages = [page0, page1, page2, page3, page4, page5, page6, page7, page8, page9, page10, page11, page12];
  var page_index = 0;
  var played = false;
  canvas.get(0).addEventListener("touchstart",function(e){
    if (music.touchme(e)) {
      return music.touched();
    }
    if (page_index == 11) {
      $("audio").get(0).pause();
      canvas.hide();
      video.show();
      video.get(0).play();
      video.bind('ended', function() {
        canvas.show();
        lastPage = pages[page_index];
        page_index = page_index + 1;
        currentPage = pages[page_index];
        current = 1;
        video.hide();
        $("audio").get(0).play();

      });
      return;
    } else if (page_index == 12) {
      page12.shadow_keep = 50;
      return;
    }
    if (currentPage.ready()) {
      lastPage = pages[page_index];
      page_index = page_index + 1;
      currentPage = pages[page_index];
      current = 1;
    }
  });
  var lastPage = page0;
  pages[page_index].download();
  var currentPage = pages[page_index];
  var debug = false;
  if (debug) {
    var video = $("#video");
    function a() {
      context.drawImage(video.get(0),0,0,canvasW,canvasH);
      setTimeout(a, 100);
    }
    a();
    video.get(0).play();
  } else 
    animate();
});
$(window).resize(function(){
  fun($("#canvas"));
});


