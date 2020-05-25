var hmbrgr = document.getElementById("hamburger");
var hm = document.getElementById("hamburger-menu");
var x = document.getElementById("x");
var m = document.getElementById("menu");
var b = document.getElementsByTagName("body");

hmbrgr.addEventListener("click", function() {
    hm.classList.add("on");
});

x.addEventListener("click", function() {
    hm.classList.remove("on");
});

hm.addEventListener("click", function() {
    hm.classList.remove("on");
});

m.addEventListener("click", function(e) {
    e.stopPropagation();
});
