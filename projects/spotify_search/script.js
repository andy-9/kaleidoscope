(function() {
    $("#submit-btn").on("click", function() {
        var userInput = $("input[name=user-input]").val(); // .val() grabs the value of the input field
        var dropdownSelectVal = $("select").val(); // grab value of select
        var baseUrl = "https://elegant-croissant.glitch.me/spotify";

        $.ajax({
            // send this to our proxy
            url: baseUrl,
            method: "GET",
            data: {
                query: userInput,
                type: dropdownSelectVal
            },
            success: function(response) {
                response = response.albums || response.artists; // set response value
                // console.log("response from Spotify:", response);
                // if (response.albums) {               // same code as the line before
                //     response = response.albums;
                // } else (response.artists) {
                //     response = response.artists;
                // }

                // SHOW HEADLINE: (NO) RESULTS FOR SEARCH ITEM
                var resultsFor = "";
                if (response.items.length == "") {
                    resultsFor +=
                        "<div>" +
                        "No results for " +
                        '"' +
                        userInput +
                        '"' +
                        "</div>";
                } else {
                    resultsFor +=
                        "<div>" +
                        "Results for " +
                        '"' +
                        userInput +
                        '"' +
                        "</div>";
                }

                // SHOW NEXT BUTTON
                if (response.items.length === 20) {
                    $("#more-btn").css({
                        visibility: "visible"
                    });
                } else {
                    $("#more-btn").css({
                        visibility: "hidden"
                    });
                }

                setNextUrl(response);

                infiniteScroll();

                // TURNING RESULTS INTO HTML
                $("h3").html(resultsFor);
                $("#results-container").html(nextResultsHtml(response));
            }
        });
    });

    // SECOND AJAX REQUEST
    function moreResults() {
        $.ajax({
            url: nextUrl,
            method: "GET",
            success: function(response) {
                response = response.albums || response.artists;

                $("#results-container").append(nextResultsHtml(response));

                if (response.next == null || response.items.length < 20) {
                    $("#more-btn").css({
                        visibility: "hidden"
                    });
                }

                setNextUrl(response);

                infiniteScroll();
            }
        });
    }

    // FETCH IMAGES AND NAMES
    function nextResultsHtml(response) {
        var myHtml = "";
        var albumImage = "";
        var albumName = "";
        var imgUrl = "/default.jpg"; // default image when there is none

        for (var i = 0; i < response.items.length; i++) {
            // check if the item we are currently looping over has images
            if (response.items[i].images[0]) {
                imgUrl = response.items[i].images[0].url;
            }

            albumImage =
                "<a href='" +
                response.items[i].external_urls.spotify +
                "'>" +
                "<img class='cover' src='" +
                imgUrl +
                "'/>" +
                "</a>";

            albumName =
                "<a href='" +
                response.items[i].external_urls.spotify +
                "'>" +
                "<div class='album'>" +
                response.items[i].name +
                "</div>" +
                "</a>";

            myHtml +=
                "<div class='resultList'>" + albumImage + albumName + "</div>";
        }
        return myHtml;
    }

    // CLICK MORE BUTTON
    $("#more-btn").on("click", function() {
        moreResults();
    });

    // INFINITE SCROLL
    function infiniteScroll() {
        if (location.search == "?scroll=infinitely") {
            $("#more-btn").css({
                visibility: "hidden"
            });
            checkScroll();
        }
    }

    function checkScroll() {
        var hasReachedBottom = $(document).scrollTop() + $(window).height();
        if ($(document).height() - hasReachedBottom < 250) {
            moreResults();
        } else {
            setTimeout(checkScroll, 500);
        }
    }

    // ASK PROXY TO ASK SPOTIFY API - FETCH NEXT 20 RESULTS
    // we would run into errors if we had the following block in the loop
    function setNextUrl(response) {
        nextUrl =
            response.next && // nextResponse.next has to exist, only then replace()
            response.next.replace(
                "api.spotify.com/v1/search",
                "elegant-croissant.glitch.me/spotify"
            );
    }
    // replace() takes two arguments:
    // 1. the pattern you want to replace
    // 2. the what you want to replace it with
})();
