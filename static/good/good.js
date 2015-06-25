var fun = function (){
  var w_body  = $("body").width();
  var h_body  = $("body").height();
  var canvas = $("#canvas");
  canvas.get(0).width  = parseInt(w_body);
  canvas.get(0).height = parseInt(h_body);
};
$().ready(function() {

  var audio = $("#bgm").get(0);
  setTimeout(function(){
    audio.play();
  }, 300);

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
    if (true) {
      context.save();
      // context.globalAlpha = 0.75+0.25*Math.cos(current/9);
      context.drawImage(arraw,0,0,640,1008,0,Math.cos(current/9)*10,canvasW,canvasH);
      context.restore();
    }
    setTimeout(animate, 33);
  }
  function scale_bg(bg,scale,scale_index) {   // background,放大缩小比例,进度
    if (scale_index < 0 ) {
      context.drawImage(bg,0,0,640,1008,0,0,canvasW,canvasH);
    }
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
  var page6 = {   // 首页  背景渐入
    imgs: [$('#p61'), $('#p62')],
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
      // page6.download();
      return true;
    },
    show_num: ch_page_num,
    run: function (c) {
      if (c==undefined) 
      var c = 10000;
      scale_bg(this.imgs[0].get(0),0.1,c);    // BG
      draw_white_block(this.imgs[1].get(0),this.show_num,60,c); // img,skip,last,c
      if (c>60) {
        context.font="40px Georgia";
        context.fillStyle = 'white';
        context.fillText("进入天猫，搜索???得5元节能灯!",canvasW*0.05,canvasH*0.05);
      }
    }
  }
  var page5 = {   // 首页  背景渐入
    imgs: [$('#p51'), $('#p52'), $('#p53'), $('#p54')],
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
      page6.download();
      return true;
    },
    show_num: ch_page_num,
    run: function (c) {
      if (c==undefined) 
      var c = 10000;
      // scale_bg(this.imgs[0].get(0),0.1,c);    // BG
      draw_white_block(this.imgs[0].get(0),0,60,c); // img,skip,last,c
      // scale_bg(this.imgs[1].get(0),0.2,c);    // BG
      draw_white_block(this.imgs[1].get(0),60,60,c); // img,skip,last,c
      // scale_bg(this.imgs[2].get(0),0.3,c);    // BG
      draw_white_block(this.imgs[2].get(0),120,60,c); // img,skip,last,c
      draw_white_block(this.imgs[3].get(0),180,30,c); // img,skip,last,c
    }
  }
  var page4 = {   // 首页  背景渐入
    imgs: [$('#p41')],
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
      page5.download();
      return true;
    },
    show_num: ch_page_num,
    run: function (c) {
      if (c==undefined) 
      var c = 10000;
      scale_bg(this.imgs[0].get(0),0.1,c);    // BG
    }
  }
  var page3 = {   // 首页  背景渐入
    imgs: [$('#p31'), $('#p32')],
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
      page4.download();
      return true;
    },
    show_num: ch_page_num,
    run: function (c) {
      if (c==undefined) 
      var c = 10000;
      scale_bg(this.imgs[0].get(0),0.1,c);    // BG
      draw_white_block(this.imgs[1].get(0),this.show_num,60,c); // img,skip,last,c
    }
  }
  var page2 = {   // 首页  背景渐入
    imgs: [$('#p21'), $('#p22')],
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
      page3.download();
      return true;
    },
    show_num: ch_page_num,
    run: function (c) {
      if (c==undefined) 
      var c = 10000;
      scale_bg(this.imgs[0].get(0),0.1,c);    // BG
      draw_white_block(this.imgs[1].get(0),this.show_num,60,c); // img,skip,last,c
      //draw_white_block(this.imgs[1].get(0),this.show_num,60,c); // img,skip,last,c
    }
  }
  var page1 = {   // 首页  背景渐入
    imgs: [$('#p11'), $('#p12')],
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
      page2.download();
      return true;
    },
    show_num: ch_page_num,
    run: function (c) {
      if (c==undefined) 
      var c = 10000;
      scale_bg(this.imgs[0].get(0),0.1,c);    // BG
      draw_white_block(this.imgs[1].get(0),this.show_num,60,c); // img,skip,last,c
    }
  }
  var pages = [page1, page2, page3, page4, page5, page6];
  var played = false;

  var start_x = 0;
  var start_y = 0;
  var end_x = 0;
  var end_y = 0;
  var proc_change = function() {

    if (start_y-end_y>100 &&             // 上滑
        Math.abs((end_x-start_x)/(end_y-start_y))<1) {
      if (page_index == pages.length-1) {
        lastPage = pages[page_index];
        page_index = 0;
        currentPage = pages[page_index];
        current = 1;
        direction = "up";
        return;
      }
      if (currentPage.ready()) {
        lastPage = pages[page_index];
        page_index = page_index + 1;
        currentPage = pages[page_index];
        current = 1;
      }
      direction = "up";
    } else if (end_y-start_y>100 &&             // 下滑
        Math.abs((end_x-start_x)/(end_y-start_y))<1) {
      if (page_index == 0) {
        if (pages[pages.length-1].ready()) {
          lastPage = pages[page_index];
          page_index = pages.length-1;
          currentPage = pages[page_index];
          current = 1;
          direction = "down";
        }
        return;
      }
      direction = "down";
    } else if (page_index == pages.length) {
      page12.shadow_keep = 50;
      return;
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
  var lastPage = page1;
  pages[page_index].download();
  var currentPage = pages[page_index];
  animate();

  var down_index = 0;
  check_download = function() {
    if (pages[down_index].ready()) {
      down_index = (down_index + 1)%pages.length;
      pages[down_index].download();
    }
  }
});
$(window).resize(function(){
  fun($("#canvas"));
});


