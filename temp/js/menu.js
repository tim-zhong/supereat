var toolbar = document.getElementById("menu-tool-bar");
var toolbarWidth = toolbar.offsetWidth;
var toolbarScrollTop = toolbar.offsetTop;

console.log(toolbarScrollTop);
window.onscroll = stickyToolbar;

var sublinks = document.getElementsByClassName("subsection-link");
for (var i = sublinks.length - 1; i >= 0; i--) {
	sublinks[i].addEventListener("click", function(){
		var id = this.innerHTML.replace(/ /g, "-").toLowerCase();
		scrolltosection(id);
	});
}

function stickyToolbar(){
	var curTop = document.documentElement.scrollTop || document.body.scrollTop;
	
	if(curTop > toolbarScrollTop - 30){
		toolbar.style.position = "fixed";
		toolbar.style.width = toolbarWidth + "px";
		toolbar.style.top = "30px";
	} else {
		toolbar.style.position = "relative";
		toolbar.style.with = "33.33%";
		toolbar.style.top = 0;
	}
}

function scrolltosection(id,relct){
	if (typeof relct === 'undefined') { relct = '';}
	var bm=document.getElementById(id);
	//var base=document.getElementById('page').offsetTop;
	var base=0;
	if(id=='top'){
		bm=document.body;
		base=document.body.offsetTop;
	}
	var b=base+bm.offsetTop;
	if(document.getElementById(relct)) b+=document.getElementById(relct).offsetTop;

	var scrollTop=document.documentElement.scrollTop;
	if (scrollTop<document.body.scrollTop) scrollTop=document.body.scrollTop;

	var a=scrollTop;
	var frames=1000;
	var step=(b-a)/frames;
	var settop=function(target, t){
		setTimeout(function(){
			document.documentElement.scrollTop=target;
			document.body.scrollTop=target;
		}, Math.sqrt(t/100)*200);
	}

	for(var i=1; i<=frames;i++){
		settop(a+step*i,i);
	}
}