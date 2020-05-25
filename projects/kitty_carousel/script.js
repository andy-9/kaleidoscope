(function() {
    var kitties = document.querySelectorAll("#kitties img");
    var dots = document.querySelectorAll("#dots .dot");
    var n = 0;
    var timer;
    var isTransitioning;

    for (var i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", clickHandler(i));
    }

    // When transitioning or when image is on screen that user clicks, nothing
    // should happen. Else, user should be able to click an image to appear on screen.
    function clickHandler(dotIndex) {
        return function() {
            if (isTransitioning || dotIndex == n) {
                return; // if transition going on do nothing
            } else {
                clearTimeout(timer); // cancels any setTimeout currently pending, then moveKitties is called
                moveKitties(dotIndex); // moves to the specific image
            }
        };
    }

    // kitties carousel
    function moveKitties(index) {
        kitties[n].classList.remove("onscreen");
        dots[n].classList.remove("on");
        kitties[n].classList.add("offscreen-left");
        isTransitioning = true;

        if (typeof index === "number") {
            n = index; // user cklicked a dot! We need to show the image that corresponds with the dot that was clicked
        } else {
            n++; // user didn't touch it. Let carousel run on its own.
        }

        if (n > kitties.length - 1) {
            n -= kitties.length;
        }

        kitties[n].classList.add("onscreen");
        dots[n].classList.add("on");
    }

    // stack transitioned image "below" the others on the "right" side
    document.addEventListener("transitionend", function(e) {
        isTransitioning = false; // now it's possible to click on a dot and get the corresponding image
        if (e.target.classList.contains("offscreen-left")) {
            e.target.classList.remove("offscreen-left");
            timer = setTimeout(moveKitties, 1000);
        }
    });

    timer = setTimeout(moveKitties, 1000);
})();
