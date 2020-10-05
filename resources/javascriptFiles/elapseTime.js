function elapseTime() {

    currURL = window.location.href;
    //localStorage.clear();
    var div = document.createElement("div");
    id = setInterval(function () {

        var initTime = localStorage.getItem(currURL + "hours");

        if (initTime === null) {

            localStorage.setItem(currURL + "hours", 0);
            localStorage.setItem(currURL + "minutes", 0);
            localStorage.setItem(currURL + "seconds", 0);
        }
        else {

            var seconds = parseInt(localStorage.getItem(currURL + "seconds"));
            var minutes = parseInt(localStorage.getItem(currURL + "minutes"));
            var hours = parseInt(localStorage.getItem(currURL + "hours"));

            ++seconds;

            minutes += Math.floor(seconds / 60);
            seconds %= 60;

            hours += Math.floor(minutes / 60);
            minutes %= 60;

            localStorage.setItem(currURL + "seconds", seconds);
            localStorage.setItem(currURL + "minutes", minutes);
            localStorage.setItem(currURL + "hours", hours);

            div.innerHTML = hours + ":" + minutes + ":" + seconds;
            div.style.fontSize = "1.5em";
            div.style.position = "absolute";
            div.style.top = "0";
            div.style.right = "0";
            div.style.color = "red";

            document.body.appendChild(div);
        }
    }, 1000);
}

elapseTime();