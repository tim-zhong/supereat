$(document).ready(function() {
  $(".animsition").animsition({
    inClass: 'fade-in',
    outClass: 'fade-out',
    inDuration: 350,
    outDuration: 250,
    linkElement: '.animsition-link',
    // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
    loading: true,
    loadingParentElement: 'body', //animsition wrapper element
    loadingClass: 'animsition-loading',
    loadingInner: '', // e.g '<img src="loading.svg" />'
    timeout: true,
    timeoutCountdown: 2000,
    onLoadEvent: true,
    browser: [ 'animation-duration', '-webkit-animation-duration', '-moz-animation-duration'],
    // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
    // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
    overlay : false,
    overlayClass : 'animsition-overlay-slide',
    overlayParentElement : 'body',
    transition: function(url){ window.location.href = url; }
  });
});

var cartIcon = document.getElementById('cart');
var cartDropdown = document.getElementById('cart-hover');

cartIcon.addEventListener('mouseover', showCartDropdown);
cartIcon.addEventListener('mouseleave', hideCartDropdown);
cartDropdown.addEventListener('mouseover', showCartDropdown);
cartDropdown.addEventListener('mouseleave', hideCartDropdown);

function showCartDropdown(){
    if(cartDropdown.vanishing) clearTimeout(cartDropdown.vanishing);

    if(!cartDropdown.showed){
        cartDropdown.className = 'cart-hover-show';
        cartDropdown.showed = true;
    }
}

function hideCartDropdown(){
    if(cartDropdown.showed){
        cartDropdown.showed = false;
        cartDropdown.vanishing = setTimeout(function(){
            cartDropdown.className = 'cart-hover-hide';
        },100);
    }
}

function bounceCart(n){//n: how many time the cart bounces
    var n = n || 1;
    var cart = document.getElementById("cart");
    cart.className = "animsition-link bounce";
    setTimeout(function(){
        cart.className = "animsition-link";
    }, n * 2000);
}