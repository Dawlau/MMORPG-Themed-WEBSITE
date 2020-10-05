window.onload = function () {

    // create button element
    var button = document.createElement("BUTTON");
    button.innerHTML = "Hide images";

    var main = document.getElementsByTagName("MAIN")[0];

    document.body.insertBefore(button, main);

    button.onclick = function () {

        if (button.innerHTML === "Hide images") {

            button.innerHTML = "Show images";
            var images = document.querySelectorAll("IMG");

            for (let img of images)
                img.style.display = "none";
        }
        else {

            button.innerHTML = "Hide images";
            var images = document.querySelectorAll("IMG");

            for (let img of images)
                img.style.display = "initial";
        }
    }
}