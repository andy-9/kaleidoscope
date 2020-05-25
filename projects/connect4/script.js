(function () {
    var currentPlayer = "player1";
    var cols = $(".column");

    cols.on("click", function (e) {
        var col = $(e.currentTarget);
        var slotsInCol = col.children();
        var columnIndex = col.index();

        // $("audio#rop")[0].play();
        // $("audio#dro")[0].play();
        // $("audio#dop")[0].play();

        // FIND FIRST AVAILABLE SLOT FROM BOTTOM
        for (var i = slotsInCol.length - 1; i >= 0; i--) {
            if (
                !slotsInCol.eq(i).hasClass("player1") &&
                !slotsInCol.eq(i).hasClass("player2")
            ) {
                slotsInCol.eq(i).addClass(currentPlayer);
                break;
            }
        }

        var rowIndex = i;
        var slotsInRow = $(".row" + i);

        // SWITCH PLAYER IF ONE COLUMN IS FULL
        if (i === -1) {
            return;
        }

        // CHECK FOR DIAGONAL MATCH TOP LEFT TO BOTTOM RIGHT
        function downRight() {
            var count = 1;
            columnIndex -= 4;
            rowIndex -= 4;
            for (var a = 0; a < cols.length; a++) {
                columnIndex++;
                rowIndex++;
                if (
                    cols
                        .eq(columnIndex)
                        .children()
                        .eq(rowIndex)
                        .hasClass(currentPlayer)
                ) {
                    count++;
                    if (count === 4) {
                        console.log("diagonal victory!");
                        winner();
                        return true;
                    }
                } else {
                    count = 0;
                }
            }
        }
        downRight();

        // CHECK FOR DIAGONAL MATCH BOTTOM LEFT TO TOP RIGHT
        function upRight() {
            var count = 1;
            columnIndex -= 7;
            rowIndex += 1;
            for (var b = 0; b < cols.length; b++) {
                columnIndex++;
                rowIndex--;
                if (
                    cols
                        .eq(columnIndex)
                        .children()
                        .eq(rowIndex)
                        .hasClass(currentPlayer)
                ) {
                    count++;
                    if (count === 4) {
                        console.log("diagonal victory!");
                        winner();
                        return true;
                    }
                } else {
                    count = 0;
                }
            }
        }
        upRight();

        // CHECK FOR VICTORY
        if (checkForVictory(slotsInCol)) {
            console.log("There was a column victory!");
            winner();
        } else if (checkForVictory(slotsInRow)) {
            console.log("There was a row victory!");
            winner();
            // no one wins:
        } else if ($(".player1").length + $(".player2").length == 42) {
            $(".slot").removeClass("player1").removeClass("player2");
            console.clear();
        } else {
            console.log("There was no victory, switch turns.");
            switchPlayer();
        }
    });

    function checkForVictory(slots) {
        var count = 0;
        // loop through slots, we only need to care about the currentPlayer
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                count++;
                if (count === 4) {
                    return true;
                }
            } else {
                // reset the count to zero because it found the other player (or no player)
                count = 0;
            }
        }
    }

    // SWITCH PLAYER
    function switchPlayer() {
        if (currentPlayer === "player1") {
            currentPlayer = "player2";
        } else {
            currentPlayer = "player1";
        }
    }

    // WINNER
    function winner() {
        console.log("Congratulations! You won!");
        $("#youwintext").css({
            visibility: "visible",
        });
        if (currentPlayer === "player1") {
            $(".slot").animate(
                {
                    height: 1000,
                    width: 2000,
                },
                4000
            );
            $(".game-container").css({
                backgroundColor: "rgb(117, 8, 8)",
            });
            console.log("Player 1 wins!");
        } else {
            $(".slot").animate(
                {
                    height: 1000,
                    width: 2000,
                },
                4000
            );
            $(".game-container").css({
                backgroundColor: "rgb(187, 6, 163)",
            });
            console.log("Player 2 wins!");
        }
    }

    // RESTART GAME
    $("button").on("click", function () {
        $(".slot").removeClass("player1").removeClass("player2");
        console.clear();
        $("#youwintext").css({
            visibility: "hidden",
        });
        $(".game-container").css({
            backgroundColor: "white",
        });
        $(".slot").animate(
            {
                height: 100,
                width: 100,
            },
            200
        );
    });
})();
