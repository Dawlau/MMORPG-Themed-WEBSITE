function randInt(a, b) {

    return Math.trunc(a + (b - a) * Math.random());
}

function animate(p) {

    p.style.display = "inline";
    p.style.webkitAnimationName = 'transparency';
    p.style.webkitAnimationDuration = '0.3s';
}

function shuffle(arr) {

    for (let idx = 1; idx < arr.length; ++idx) {

        var randIdx = randInt(0, idx - 1);
        [arr[idx], arr[randIdx]] = [arr[randIdx], arr[idx]];
    }
}

function appearLetters() {

    var p = document.getElementById("Progression").getElementsByTagName("p")[0];

    var target = $("#Progression > p:nth-of-type(1)");
    target.html(target.text().replace(/\S/g, "<span>$&</span>"));

    var spans = p.getElementsByTagName("span");

    for (let span of spans)
        span.style.display = "none";

    var availableIndices = [];

    for (let idx = 0; idx < spans.length; ++idx)
        availableIndices.push(idx);

    shuffle(availableIndices);

    var idx = 0;
    var id = setInterval(function () {

        if (idx == availableIndices.length) {
            clearInterval(id);
        }
        else {

            animate(spans[availableIndices[idx++]]);
        }

    }, 40);
    
}

appearLetters();