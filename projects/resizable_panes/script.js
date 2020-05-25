(function() {
    var bar = $(".bar");
    var top = $(".top-image");
    var body = $("body");
    var container = $(".container");
    var conLeft = $(".container").offset().left;
    // to figure out how far an element is from the left of its container -> offset().left

    bar.on("mousedown", function() {
        body.on("mousemove", function(e) {
            body.on("mouseup", function() {
                body.off("mousemove");
            });

            // resizing the .top-image div and resizing the bar
            // to figure out the width of something with jQuery: .outerWidth()
            var newLeft = e.clientX - bar.outerWidth() - conLeft;

            // resize .top-image
            top.css({
                width: newLeft + "px"
            });

            //move the bar
            bar.css({
                left: newLeft + "px"
            });

            // prevent user from dragging image out of the pane
            if (newLeft < -5) {
                bar.css({
                    left: 0
                });
            }
            if (newLeft >= container.outerWidth() - 20) {
                bar.css({
                    left: container.outerWidth() - bar.outerWidth() - 10 + "px"
                });
            }
        });
    });
})();
