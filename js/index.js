(()=> {
	console.log('fired!');

var img = document.querySelector('.div_2').children;
var is_down = false; //Whether the mouse is pressed
var this_e_2 = {
	a: '', //A element is on the left of the drum, a [0] is the drum, played by a [1] is fill up
	b: '',
	item: 'a' //Which is the current drag to element
}
var gu = document.querySelector('.div_1').children
var this_e = null; //Get the Img 
var is_posi = false; //Whether moving pictures moved to the corresponding drum
var is_onclick=false; //Judge whether the time of the click click one or two drums
var is_img_dom=[0,0];
document.onmousedown=function(e){
	var is_item_=null;
	if(X_Y_IS(e,0)) {
		is_item_ = 'a'
	} else if(X_Y_IS(e,1)) {
		is_item_ = 'b'
	}
	if(is_item_!=null){
		is_onclick=true;
		this_e_2[is_item_].target.classList.remove('posi') //remove  the absolute position  then  let the icon back
		document.querySelector('#audio_auto1_' + this_e_2[is_item_].target.classList[0].toString().replace('d_', '')).pause() //将原先那个元素的音乐暂停
	}else{
		is_onclick=false;
	}
}
for(var i in img) {
	img[i].onmousedown = function(e) {
		move_down(e)
	}
}
function move_down(e) {
	is_img_dom[1]++;
	is_down = true;
	this_e = e;
	e.target.classList.add('posi')
	e.target.style.left = 'auto'
	e.target.style.top = 'auto'
}
function X_Y_IS(e,i){
	return (e.clientX > gu[i].offsetLeft && e.clientX < gu[i].offsetLeft + 200 &&
			e.clientY > gu[i].offsetTop && e.clientY < gu[i].offsetTop + 200)
}
document.onmousemove = function(e) {
	if(is_down) { //click mouse . inter in the condition 
		this_e.target.style.left = e.clientX - 50 + 'px'
		this_e.target.style.top = e.clientY - 50 + 'px'
		if(X_Y_IS(e,0)) {
			this_e_2.item = 'a'
			is_posi = true;
		} else if(X_Y_IS(e,1)) {
			this_e_2.item = 'b'
			is_posi = true;
		} else { //If above two conditions are not entered directly the picture is the way to the other place
			is_posi = false;
		}
	}
}
document.onmouseup = function(e) {
	if(is_img_dom[1]==is_img_dom[0]){
		this_e=''
	}
	is_down = false;
	var is_item=null;
	if(X_Y_IS(e,0)) {
		is_item = 'a'
	} else if(X_Y_IS(e,1)) {
		is_item = 'b'
	}else{
		is_item=null
	}
	if(is_item == 'a' || is_item == 'b' ) {
		console.log(is_onclick,is_posi)
		if(is_posi && !is_onclick) {
			if(this_e_2[this_e_2.item] != '') { //Determine whether to drag for the first time
				this_e_2[this_e_2.item].target.classList.remove('posi') //remove  the absolute position  then  let the icon back
				document.querySelector('#audio_auto1_' + this_e_2[this_e_2.item].target.classList[0].toString().replace('d_', '')).pause() //将原先那个元素的音乐暂停
				this_e_2[this_e_2.item] = this_e;
				this_e_2[this_e_2.item].target.classList.add('posi') //Add the ahsoulte position 
				document.querySelector('#audio_auto1_' + this_e_2[this_e_2.item].target.classList[0].toString().replace('d_', '')).play() //播放新拖动上来的元素中对应的音频
			} else {
				this_e_2[this_e_2.item] = this_e;
				document.querySelector('#audio_auto1_' + this_e_2[this_e_2.item].target.classList[0].toString().replace('d_', '')).play()
			}
		} else {
			this_e.target.classList.remove('posi')
		}
	}else if(!is_onclick){
		this_e.target.classList.remove('posi')
	}
	is_img_dom[0]++;
}
})();