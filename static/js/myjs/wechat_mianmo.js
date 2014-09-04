var dataForWeixin={
<!-- lang: js -->
   appId:"",
<!-- lang: js -->
   MsgImg:"http://183.61.111.195:3003/static/img/icon.png",
<!-- lang: js -->
   TLImg:"http://183.61.111.195:3003/static/img/icon.png",
<!-- lang: js -->
   url:"http://louding.com/mianmo",
<!-- lang: js -->
   title:"玩游戏，赢面膜！",
<!-- lang: js -->
   desc:"小清新面膜，原价98元，玩游戏免费送，更有88元优惠价！",
<!-- lang: js -->
   fakeid:"",
<!-- lang: js -->
   callback:function(){}
<!-- lang: js -->
};
<!-- lang: js -->
(function(){
<!-- lang: js -->
   var onBridgeReady=function(){
<!-- lang: js -->
   WeixinJSBridge.on('menu:share:appmessage', function(argv){
<!-- lang: js -->
      WeixinJSBridge.invoke('sendAppMessage',{
<!-- lang: js -->
         "appid":dataForWeixin.appId,
<!-- lang: js -->
         "img_url":dataForWeixin.MsgImg,
<!-- lang: js -->
         "img_width":"120",
<!-- lang: js -->
         "img_height":"120",
<!-- lang: js -->
         "link":dataForWeixin.url,
<!-- lang: js -->
         "desc":dataForWeixin.desc,
<!-- lang: js -->
         "title":dataForWeixin.title
<!-- lang: js -->
      }, function(res){(dataForWeixin.callback)();});
<!-- lang: js -->
   });
<!-- lang: js -->
   WeixinJSBridge.on('menu:share:timeline', function(argv){
<!-- lang: js -->
      (dataForWeixin.callback)();
<!-- lang: js -->
      WeixinJSBridge.invoke('shareTimeline',{
<!-- lang: js -->
         "img_url":dataForWeixin.TLImg,
<!-- lang: js -->
         "img_width":"120",
<!-- lang: js -->
         "img_height":"120",
<!-- lang: js -->
         "link":dataForWeixin.url,
<!-- lang: js -->
         "desc":dataForWeixin.desc,
<!-- lang: js -->
         "title":dataForWeixin.title
<!-- lang: js -->
      }, function(res){});
<!-- lang: js -->
   });
<!-- lang: js -->
   WeixinJSBridge.on('menu:share:weibo', function(argv){
<!-- lang: js -->
      WeixinJSBridge.invoke('shareWeibo',{
<!-- lang: js -->
         "content":dataForWeixin.title,
<!-- lang: js -->
         "url":dataForWeixin.url
<!-- lang: js -->
      }, function(res){(dataForWeixin.callback)();});
<!-- lang: js -->
   });
<!-- lang: js -->
   WeixinJSBridge.on('menu:share:facebook', function(argv){
<!-- lang: js -->
      (dataForWeixin.callback)();
<!-- lang: js -->
      WeixinJSBridge.invoke('shareFB',{
<!-- lang: js -->
         "img_url":dataForWeixin.TLImg,
<!-- lang: js -->
         "img_width":"120",
<!-- lang: js -->
         "img_height":"120",
<!-- lang: js -->
         "link":dataForWeixin.url,
<!-- lang: js -->
         "desc":dataForWeixin.desc,
<!-- lang: js -->
         "title":dataForWeixin.title
<!-- lang: js -->
      }, function(res){});
<!-- lang: js -->
   });
<!-- lang: js -->
};
<!-- lang: js -->
if(document.addEventListener){
<!-- lang: js -->
   document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
<!-- lang: js -->
}else if(document.attachEvent){
<!-- lang: js -->
   document.attachEvent('WeixinJSBridgeReady'   , onBridgeReady);
<!-- lang: js -->
   document.attachEvent('onWeixinJSBridgeReady' , onBridgeReady);
<!-- lang: js -->
}
<!-- lang: js -->
})();

