var textarea = $("textarea");
var valid = $(".valid");
var inv = $(".inv");

$(".button").on("click", function () {
    try {
        JSON.parse($("textarea").val());
        textarea.css({
            border: "green solid 10px",
        });
        valid.css({
            visibility: "visible",
        });
    } catch (err) {
        textarea.css({
            border: "red solid 10px",
        });
        inv.css({
            visibility: "visible",
        });
    }
});

$(".two").on("click", function () {
    textarea.val("");
    textarea.css({
        border: "2px solid black",
    });
    valid.css({
        visibility: "hidden",
    });
    inv.css({
        visibility: "hidden",
    });
});
