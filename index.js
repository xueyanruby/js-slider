var Slider = function(){
   this.imgs = ["imgs/image1.jpg","imgs/image2.jpg",
                "imgs/image3.jpg","imgs/image4.jpg",
                "imgs/image5.jpg","imgs/image6.jpg"];

   this.container = document.getElementById("fillImage");
   this.nav = document.getElementById("slider_nav");
   this.currentIndex = 0;//当前索引
   this.pause = false; //暂停|播放
   this.num = this.imgs.length ;
   this.timer = null ; //定时器handler
   this.render();
   this.listeningWindow();
}

/**函数名：play
 **参数：index---开始播放的图片索引
 **功能：开始播放
*/
Slider.prototype.play = function(index){
  var me = this;
  var time = 3000;
  if(!me.pause){
    me.container.style.transition = "transform 0.4s ease-in-out" ;
    //切换nav
    if(index < this.num){
      me.changeNav(index);
    }else{
      me.changeNav(0);
    }
    //最后一张切换第一张首先过渡切换到第一张放在最后的复制图
    me.changeImage(index);
    //然后立即取消过渡动画，硬切换到第一张
    //transition延迟一帧的原因，判断的索引往后移一位？？？
    if(index == this.num+1){
      index = 0 ;
      me.container.style.transition = "none" ;
      me.changeImage(index);
      time = 0;
    }
    index++ ;
  }
  me.timer = setTimeout(function(){
    me.play(index);
  },time)
}

/**函数名：stopPlay
 **功能：停止播放
*/
Slider.prototype.stopPlay = function(){
  var me = this;
  me.pause = true;
  clearTimeout(me.timer);
  me.pause = false;
}

/**函数名：pausePlay
 **功能：暂停播放
*/
Slider.prototype.pausePlay = function(){
  var me = this;
  me.pause = true;
}

/**函数名：replay
 **功能：暂停播放后的恢复播放
*/
Slider.prototype.replay = function(){
  var me = this;
  me.pause = false;
}

/**函数名：next
 **功能：下一帧
*/
Slider.prototype.next = function(){
  var me = this;
  me.stopPlay();
  me.play(me.currentIndex+1);
}

/**函数名：previous
 **功能：上一帧
*/
Slider.prototype.previous = function(){
  var me = this;
  me.stopPlay();
  me.play(me.currentIndex-1);
}

Slider.prototype.changeImage = function(i){
  var me = this;
  me.container.style.transform = "translateX(-"+i*660+"px)" ;
  if(i < this.num)
    me.currentIndex  =  i ;
  else {
    me.currentIndex  =  0 ;
  }
}

Slider.prototype.changeNav = function(i){
  var me = this;
  me.nav.children[me.currentIndex].className = "";
  me.currentIndex = i ;
  me.nav.children[me.currentIndex].className = "selected";
}

Slider.prototype.listeningWindow = function(){
  var me = this;
  window.onfocus = function() {
      me.pause = false;
  }
  window.onblur = function() {
      me.pause = true;
  }
}

Slider.prototype.render = function(){
  var me = this;
  // var container = document.getElementById("fillImage");
  for(var i =0 ;i<me.imgs.length ;i++){
    var img = document.createElement("img");
    img.src = me.imgs[i];
    me.container.appendChild(img);
  }
  for(var i =0 ;i<1 ;i++){
    var img = document.createElement("img");
    img.src = me.imgs[i];
    me.container.appendChild(img);
  }

  for(var i =0 ;i<me.imgs.length ;i++){
    var li = document.createElement("li");
    li.value = i;
    me.nav.appendChild(li);
  }

  me.container.onmouseover = function(){
    me.pause = true;
  }
  me.container.onmouseout = function(){
    me.pause = false;
  }
  me.nav.onclick = function(e){
    var event = e || window.event;
    var target = event.target || event.srcElement ;
    me.stopPlay();
    me.play(target.value);
  }
}

var slider = new Slider();
slider.play(0);
