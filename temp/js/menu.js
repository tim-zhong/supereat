var toolbar = document.getElementById("menu-tool-bar");
var toolbarWidth = toolbar.offsetWidth;
var toolbarScrollTop = toolbar.offsetTop;
var catItems = document.getElementsByClassName("cat-item")

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

menuOptionsContainer = document.getElementById("menu-options-container");
menuOptions = document.getElementById('menu-options');
menuOptionsInnerContainer = document.getElementById("menu-options-inner-container");
menuOptionsConfirm = document.getElementById("menu-options-confirm");

menuOptionsContainer.addEventListener("click",closemenuOptionsModal);

// Note: replace this with an AJAX call to populate the options
function openMenuOptions(menuId, itemId){
	// $.ajax({
 //        url: "someurl",
 //        type: 'post',
 //        dataType: 'json',
 //        data: {menuid:menuId, itemId:itemId},
 //        success: function(response) {
 //            console.log(response);
 //            if(response[0].status = 'success') {
 //                console.log('success',response[0]);
 //                $('#menu-options').html(response[0].data);
 //                showmenuOptionsModal();
 //            } else {
 //                console.log('success-error',response[0].data);
 //            }
 //        },
 //        error: function(xhr, status, msg){
 //            console.log('Error:'+status,msg);
 //        }
 //    });

 // Replace what's below with what's above
	showmenuOptionsModal();
};

function showmenuOptionsModal(){
    document.getElementById("menu-options-container").className = 'modal-container-show';
}

function closemenuOptionsModal(event){
    if(event.target != menuOptionsContainer &&
        event.target != menuOptionsInnerContainer) return;

    event.stopPropagation();
    document.getElementById("menu-options-container").className = 'modal-container';
}