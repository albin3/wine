// Stack Blur v1.0
//
// Author: Mario Klingemann <mario@quasimondo.com>
// http://incubator.quasimondo.com
// created Feburary 29, 2004

// This is a compromise between Gaussian Blur and Box blur
// It creates much better looking blurs than Box Blur, but is
// 7x faster than my Gaussian Blur implementation.
//
// I called it Stack Blur because this describes best how this
// filter works varernally: it creates a kind of moving stack
// of colors whilst scanning through the image. Thereby it
// just has to add one new block of color to the right side
// of the stack and remove the leftmost color. The remaining
// colors on the topmost layer of the stack are either added on
// or reduced by one, depending on if they are on the right or
// on the left side of the stack. 
//
// If you are using this algorithm in your code please add
// the following line:
// 
// Stack Blur Algorithm by Mario Klingemann <mario@quasimondo.com>

// 高斯模糊 imgData, radius
function fastblur(img,radius){

  if (radius<1){
    return img;
  }
  var pix=img.data;
  var w=img.width;
  var h=img.height;
  var wm=w-1;
  var hm=h-1;
  var wh=w*h;
  var div=radius+radius+1;

  var r = new Array(wh);// []=new var[wh];
  var g = new Array(wh);// []=new var[wh];
  var b = new Array(wh);// []=new var[wh];
  var a = new Array(wh);// []=new var[wh];
  var rsum,gsum,bsum,x,y,i,p,yp,yi,yw;
  var asum;
  var vmin = new Array(Math.max(w,h));// [] = new var[max(w,h)];

  // var divsum=(div+1)>>1;
  var divsum=(div+1)/2;
  var dv = new Array(parseInt(256*divsum));//[]=new var[256*divsum];
  for (i=0;i<256*divsum;i++){
    dv[i]=(i/divsum);
  }

  yw=yi=0;

  // var[][] stack=new var[div][3];
  var stack=new Array(div*3);
  var stackpovarer;
  var stackstart;
  // var[] sir;
  var sir = new Array();
  var rbs;
  var r1=radius+1;
  var routsum,goutsum,boutsum;
  var aoutsum;
  var rinsum,ginsum,binsum;
  var ainsum;

  for (y=0;y<h;y++){
    rinsum=ginsum=binsum=routsum=goutsum=boutsum=rsum=gsum=bsum=0;
    asum=aoutsum=ainsum=0;
    for(i=-radius;i<=radius;i++){
      p=pix[yi+Math.min(wm,Math.max(i,0))];
      sir=stack[i+radius];
      //sir[0]=(p & 0xff0000)>>16;
      stack[i+radius]=parseInt(p/1024/64)%256;
      // sir[1]=(p & 0x00ff00)>>8;
      stack[i+radius+1]=parseInt(p/256)%256;
      // sir[2]=(p & 0x0000ff);
      stack[i+radius+2]=parseInt(p%256);
      // sir[3]=(p & 0x0000ff);
      // stack[i+radius+3]=parseInt(p%256);
      rbs=r1-Math.abs(i);
      // rsum+=sir[0]*rbs;
      rsum += stack[i+radius+0]*rbs;
      // gsum+=sir[1]*rbs;
      gsum += stack[i+radius+1]*rbs;
      // bsum+=sir[2]*rbs;
      bsum += stack[i+radius+2]*rbs;
      // asum += stack[i+radius+3]*rbs;
      if (i>0){
        rinsum+=stack[i+radius+0];
        ginsum+=stack[i+radius+1];
        binsum+=stack[i+radius+2];
        // ainsum+=stack[i+radius+3];
      } else {
        routsum+=stack[i+radius+0];
        goutsum+=stack[i+radius+1];
        boutsum+=stack[i+radius+2];
        // aoutsum+=stack[i+radius+3];
      }
    }
    stackpovarer=radius;

    for (x=0;x<w;x++){

      r[yi]=dv[rsum];
      g[yi]=dv[gsum];
      b[yi]=dv[bsum];
      
      rsum-=routsum;
      gsum-=goutsum;
      bsum-=boutsum;

      stackstart=stackpovarer-radius+div;
      sir=stack[stackstart%div];
      
      // routsum-=sir[0];
      // goutsum-=sir[1];
      // boutsum-=sir[2];
      routsum-=stack[stackstart%div+0];
      goutsum-=stack[stackstart%div+1];
      boutsum-=stack[stackstart%div+2];
      
      if(y==0){
        vmin[x]=Math.min(x+radius+1,wm);
      }
      p=pix[yw+vmin[x]];
      
      stack[stackstart%div+0]=Math.floor(p/256/256)%256;
      stack[stackstart%div+1]=Math.floor(p/256)%256;
      stack[stackstart%div+2]=p%256;

      rinsum+=stack[stackstart%div+0];
      ginsum+=stack[stackstart%div+1];
      binsum+=stack[stackstart%div+2];

      rsum+=rinsum;
      gsum+=ginsum;
      bsum+=binsum;
      
      stackpovarer=(stackpovarer+1)%div;
      sir=stack[(stackpovarer)%div];
     
      routsum+=stack[(stackpovarer)%div+0];
      goutsum+=stack[(stackpovarer)%div+1];
      boutsum+=stack[(stackpovarer)%div+2];
     
      rinsum-=stack[(stackpovarer)%div+0];
      ginsum-=stack[(stackpovarer)%div+1];
      binsum-=stack[(stackpovarer)%div+2];
     
      yi++;
    }
    yw+=w;
  }
  for (x=0;x<w;x++){
    rinsum=ginsum=binsum=routsum=goutsum=boutsum=rsum=gsum=bsum=0;
    yp=-radius*w;
    for(i=-radius;i<=radius;i++){
      yi=Math.max(0,yp)+x;
     
      sir=stack[i+radius];
      
      stack[i+radius+0]=r[yi];
      stack[i+radius+1]=g[yi];
      stack[i+radius+2]=b[yi];
     
      rbs=r1-Math.abs(i);
      
      rsum+=r[yi]*rbs;
      gsum+=g[yi]*rbs;
      bsum+=b[yi]*rbs;
     
      if (i>0){
        rinsum+=stack[i+radius+0];
        ginsum+=stack[i+radius+1];
        binsum+=stack[i+radius+2];
      } else {
        routsum+=stack[i+radius+0];
        goutsum+=stack[i+radius+1];
        boutsum+=stack[i+radius+2];
      }
      
      if(i<hm){
        yp+=w;
      }
    }
    yi=x;
    stackpovarer=radius;
    for (y=0;y<h;y++){
      // pix[yi]=0xff000000 | (dv[rsum]<<16) | (dv[gsum]<<8) | dv[bsum];
      pix[yi*4+0]=dv[rsum];
      pix[yi*4+1]=dv[gsum];
      pix[yi*4+2]=dv[bsum];
      pix[yi*4+3]=255;

      rsum-=routsum;
      gsum-=goutsum;
      bsum-=boutsum;

      stackstart=stackpovarer-radius+div;
      sir=stack[stackstart%div];
     
      routsum-=stack[stackstart%div+0];
      goutsum-=stack[stackstart%div+1];
      boutsum-=stack[stackstart%div+2];
     
       if(x==0){
        vmin[y]=Math.min(y+r1,hm)*w;
      }
      p=x+vmin[y];
      
      stack[stackstart%div+0]=r[p];
      stack[stackstart%div+1]=g[p];
      stack[stackstart%div+2]=b[p];
      
      rinsum+=stack[stackstart%div+0];
      ginsum+=stack[stackstart%div+1];
      binsum+=stack[stackstart%div+2];

      rsum+=rinsum;
      gsum+=ginsum;
      bsum+=binsum;

      stackpovarer=(stackpovarer+1)%div;
      sir=stack[stackpovarer];
     
      routsum+=stack[stackpovarer+0];
      goutsum+=stack[stackpovarer+1];
      boutsum+=stack[stackpovarer+2];
      
      rinsum-=stack[stackpovarer+0];
      ginsum-=stack[stackpovarer+1];
      binsum-=stack[stackpovarer+2];

      yi+=w;
    }
  }
}
