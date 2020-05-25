(function() {
    var headlines = document.getElementById("headlines");
    var links = headlines.getElementsByTagName("a");
    var left = headlines.offsetLeft;
    var anim;

    moveHeadlines();

    function moveHeadlines() {
        left--;

        if (left < -links[0].offsetWidth) {
            left += links[0].offsetWidth;
            links[0].parentNode.appendChild(links[0]);
        }

        headlines.style.left = left + "px";

        anim = requestAnimationFrame(moveHeadlines);
    }

    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("mouseover", function(evt) {
            cancelAnimationFrame(anim);
            var hoverIn = evt.target;
            hoverIn.style.color = "blue";
            hoverIn.style.textDecoration = "underline";
        });

        links[i].addEventListener("mouseout", function(evt) {
            moveHeadlines();
            var hoverOut = evt.target;
            hoverOut.style.color = "black";
            hoverOut.style.textDecoration = "none";
        });
    }
})();
