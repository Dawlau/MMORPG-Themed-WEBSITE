async function appearingTitle() {

    var h1 = document.getElementById("Title").getElementsByTagName("a")[0];

    var title = h1.innerHTML;

    h1.innerHTML = "";
    for (let idx = 0; idx < title.length; idx++)
        h1.innerHTML += " ";

    var low = 0;
    var high = title.length - 1;

    var id = setInterval(function () {

        if (low > high) {

            clearInterval(id);
        }
        else {

            h1.innerHTML = h1.innerHTML.substring(0, low) + title[low] + h1.innerHTML.substring(low + 1);
            h1.innerHTML = h1.innerHTML.substring(0, high) + title[high] + h1.innerHTML.substring(high + 1);
            ++low; --high;
        }

    }, 100);
}

function welcomePrompt() {

    var name = prompt("What is your name, friend?");

    var ogTitle = document.title;
    document.title = "Hello " + name + "!";

    appearingTitle();
    setTimeout(() => document.title = ogTitle, 2000);
}

window.onload = function () {

    welcomePrompt();
}