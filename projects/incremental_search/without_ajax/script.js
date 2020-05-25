(function() {
    var countries = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "American Samoa",
        "Angola",
        "Anguilla",
        "Antigua",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia",
        "Bonaire (Netherlands Antilles)",
        "Bosnia Herzegovina",
        "Botswana",
        "Brazil",
        "British Virgin Islands",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cape Verde",
        "Cayman Islands",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Congo",
        "Congo, The Democratic Republic of",
        "Cook Islands",
        "Costa Rica",
        "Croatia",
        "Curacao (Netherlands Antilles)",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Ethiopia",
        "Fiji",
        "Finland",
        "France",
        "French Guiana",
        "French Polynesia",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guinea",
        "Guinea Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iraq",
        "Ireland (Republic of)",
        "Israel",
        "Italy",
        "Ivory Coast",
        "Jamaica",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Kosovo",
        "Kosrae Island",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Lithuania",
        "Luxembourg",
        "Macau",
        "Macedonia (FYROM)",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Moldova",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Namibia",
        "Nepal",
        "Netherlands",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "Northern Mariana Islands",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Ponape",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Reunion",
        "Romania",
        "Rota",
        "Russia",
        "Rwanda",
        "Saba (Netherlands Antilles)",
        "Saipan",
        "Samoa",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "South Africa",
        "South Korea",
        "Spain",
        "Sri Lanka",
        "St. Barthelemy",
        "St. Croix",
        "St. Eustatius (Netherlands Antilles)",
        "St. John",
        "St. Kitts and Nevis",
        "St. Lucia",
        "St. Maarten (Netherlands Antilles)",
        "St. Thomas",
        "St. Vincent and the Grenadines",
        "Suriname",
        "Swaziland",
        "Sweden",
        "Switzerland",
        "Syria",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Tinian",
        "Togo",
        "Tonga",
        "Tortola",
        "Trinidad and Tobago",
        "Truk",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks and Caicos",
        "Tuvalu",
        "US Virgin Islands",
        "Uganda",
        "Ukraine",
        "Union Island",
        "United Arab Emirates",
        "United Kingdom",
        "United States",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela",
        "Vietnam",
        "Virgin Gorda",
        "Wallis and Futuna",
        "Yap",
        "Yemen",
        "Zambia",
        "Zimbabwe"
    ];

    var input = $("input");
    var resultsElem = $(".results");

    input.on("input focus", function() {
        // runs for input & focus
        var val = input.val(); // Get the current value of the input element

        // See if there is a match at all. If not, quit.
        if (val == "") {
            resultsElem.empty();
            return;
        }

        // GET THE CURRENT VALUE OF THE TEXT FIELD AND SELECT 4

        var matches = [];
        for (var i = 0; i < countries.length; i++) {
            if (countries[i].toLowerCase().indexOf(val.toLowerCase()) == 0) {
                // newer way: "startsWith" // case-insensitive match
                matches.push(countries[i]);
                if (matches.length == 4) {
                    // select max. 4 options
                    break; // "break" ends the loop
                }
            }
        }
        // console.log(matches);
        // matches = matches.slice(0, 4);   // would be another option for second if-statement, but doesn't end loop

        // CONVERT MATCHES INTO HTML-ELEMENTS

        var resultsHtml = "";

        for (var j = 0; j < matches.length; j++) {
            resultsHtml += '<div class="result">' + matches[j] + "</div>";
            resultsElem.css({
                visibility: "visible"
            });
            // Before you put resultsHtml on screen, you need to give it a value. Its value will either be a bunch of divs with countries in them or just the string "no results".
        }

        // if there are no matches then put "No results" in the result container element and show the result container element if it is hidden.
        if (resultsHtml == "") {
            resultsElem.css({
                visibility: "visible"
            });
            resultsHtml += '<div id="noResult">No results</div>';
        }

        resultsElem.html(resultsHtml); // html() is a jQuery method which accepts a string and adds it to the parent element specified before the dot.
    });
    // MOUSEOVER: HIGHLIGHT ELEMENT

    resultsElem.on("mouseover", function(e) {
        // add the highlight class to the event target
        $(e.target).addClass("highlight");
        // remove the highlight class from whatever element has it
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

    // set the value of the input field to be the text contained in the event target
    resultsElem.on("mousedown", function(e) {
        input.val($(e.target).html());
        // empty and/or hide the results container element
        resultsElem.css({
            visibility: "hidden"
        });
    });

    // KEYDOWN: DOWN, UP, ENTER

    input.on("keydown", function(e) {
        var highlight = $(".highlight");

        // DOWN-ARROW
        if (e.keyCode == 40) {
            // if none of the currently displayed individual result elements have the highlight class, add the highlight class to the first individual result element
            if (highlight.length == 0) {
                $(".results :first-child").addClass("highlight");
            } else if (highlight.length == 1) {
                // if an individual result other than the last one has the highlight class, remove the highlight class from the one that has it and add it to the next one
                // use jQueries next-method or index-method (tells index of element in its parent)
                $(".highlight")
                    .next()
                    .addClass("highlight");
                $(".highlight")
                    .prev()
                    .removeClass("highlight");
                // if the last individual result is highlighted, do nothing
            }
        }

        // UP-ARROW
        else if (e.keyCode == 38) {
            // if none of the currently displayed individual result elements have the highlight class, add the highlight class to the last individual result element
            if (highlight.length == 0) {
                $(".results :last-child").addClass("highlight");
                // if an individual result other than the first one has the highlight class, remove the highlight class from the one that has it and add it to the previous one
            } else if (highlight.length == 1) {
                $(".highlight")
                    .prev()
                    .addClass("highlight");
                $(".highlight")
                    .next()
                    .removeClass("highlight");
                // if the first individual result is highlighted, do nothing
            }
        }
        // ENTER-KEY
        else if (e.keyCode == 13) {
            // similar to mousedown. Difference: not event target, but element that currently has the highlight class
            // set the value of the input field to be the text contained in the element that currently has the highlight class
            input.val($(".highlight").html());
            // empty and/or hide the results container element
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
