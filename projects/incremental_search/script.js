(function() {
    var input = $("input");
    var resultsElem = $(".results");

    input.on("input focus", function() {
        var val = input.val();

        if (val == "") {
            resultsElem.empty();
            return;
        }

        $.ajax({
            url: "http://spicedworld.herokuapp.com/",
            method: "GET",
            // as the 'query' inside ajax, pass to it whatever the user typed in the input field
            // make "a" dynamic!! not string, but variable!
            data: {
                q: val
            },
            // success only runs when we get a positive response from API
            success: function(matches) {
                console.log("matches: ", matches);

                var resultsHtml = "";
                for (var i = 0; i < matches.length; i++) {
                    // loop through array of countries
                    console.log(matches[i]);
                    resultsHtml +=
                        '<div class="result">' + matches[i] + "</div>";
                    resultsElem.css({
                        visibility: "visible"
                    });
                }
                if (resultsHtml == "") {
                    resultsElem.css({
                        visibility: "visible"
                    });
                    resultsHtml += '<div id="noResult">No results</div>'; // no results

                    // invalid responses
                    // compare the variable that stores the user's input with the value in the input field

                    // $("input").val() == val;
                }
                if (input.val() !== val) {
                    console.log(input.val());
                    return; // abort function from running
                    // val = input field value when ajax request was made
                    // $("input").val(): the current value in the input field
                }
                resultsElem.html(resultsHtml); // convert to HTML
            },
            error: function(err) {
                console.log(err);
            }
        });
    });

    // MOUSEOVER: HIGHLIGHT ELEMENT
    resultsElem.on("mouseover", function(e) {
        $(e.target).addClass("highlight");
        $(e.target)
            .prev()
            .removeClass("highlight");
        $(e.target)
            .next()
            .removeClass("highlight");
    });

    $("body").on("mouseover", function(e) {
        e.stopPropagation();
    });

    // MOUSEDOWN: SET HIGHLIGHTED ELEMENT IN INPUT FIELD AND HIDE CONTAINER
    resultsElem.on("mousedown", function(e) {
        input.val($(e.target).html());
        resultsElem.css({
            visibility: "hidden"
        });
    });

    // KEYDOWN: DOWN, UP, ENTER
    input.on("keydown", function(e) {
        var highlight = $(".highlight");

        if (e.keyCode == 40) {
            if (highlight.length == 0) {
                $(".results :first-child").addClass("highlight");
            } else if (highlight.length == 1) {
                $(".highlight")
                    .next()
                    .addClass("highlight");
                $(".highlight")
                    .prev()
                    .removeClass("highlight");
            }
        } else if (e.keyCode == 38) {
            if (highlight.length == 0) {
                $(".results :last-child").addClass("highlight");
            } else if (highlight.length == 1) {
                $(".highlight")
                    .prev()
                    .addClass("highlight");
                $(".highlight")
                    .next()
                    .removeClass("highlight");
            }
        } else if (e.keyCode == 13) {
            input.val($(".highlight").html());
            resultsElem.css({
                visibility: "hidden"
            });
        }
    });

    // BLUR
    input.on("blur", function() {
        resultsElem.css({
            visibility: "hidden"
        });
    });
})();
