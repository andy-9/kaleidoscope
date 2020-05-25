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

setTimeout(modalShowUp, 1000);

function modalShowUp() {
    $("#modal").css({
        visibility: "visible"
    });
    $("#darkness").css({
        visibility: "visible"
    });
}

$("#xx").on("click", function() {
    $("#modal").css({
        visibility: "hidden"
    });
    $("#darkness").css({
        visibility: "hidden"
    });
});

$("#darkness").on("click", function() {
    $("#modal").css({
        visibility: "hidden"
    });
    $("#darkness").css({
        visibility: "hidden"
    });
});

// var timer = setTimeout(myFunction, 3000);
// clearTimeout(timer);
