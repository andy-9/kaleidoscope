(function () {
    const textarea = $("textarea");

    $(".one").on("click", function () {
        const obj = textarea.val();
        console.log("input of textfield to local storage:", obj);
        try {
            localStorage.setItem("currentText", JSON.stringify(obj));
        } catch (e) {
            console.log("error in setting text:", e);
        }
        textarea.val("");
        $(".one").prop("disabled", true);
        // prop("disabled", true);
    });

    $(".two").on("click", function () {
        const newObj = JSON.parse(localStorage.getItem("currentText"));
        console.log("output of local storage to textfield:", newObj);
        try {
            textarea.val(newObj);
        } catch (e) {
            console.log("error in getting text:", e);
        }
        $(".one").prop("disabled", false);
    });

    $(".three").on("click", function () {
        localStorage.clear();
        console.clear();
        $(".one").prop("disabled", false);
    });
})();

// Make a static HTML page that has a large <textarea> on it. When the user types in it, save the value in localStorage. When the user comes back to the page after navigating away or closing the browser, the stored value should automatically appear in the <textarea>.
