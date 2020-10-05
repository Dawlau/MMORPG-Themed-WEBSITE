window.onload = function () {

    var paragraphs = document.getElementsByTagName("p");
    var p0 = paragraphs[0];
    var p1 = paragraphs[1];

    textp0 = p0.innerHTML;
    textp1 = p1.innerHTML;

    p0.innerHTML = "";
    p1.innerHTML = "";

    var idx0 = 0;
    var idx1 = 0;

    textp0 = textp0.split(' ');
    textp1 = textp1.split(' ');

    var id = setInterval(function () {

        if (idx0 === textp0.length && idx1 === textp1.length)
            clearInterval(id);
        else if (idx0 === textp0.length) {

            p1.innerHTML += textp1[idx1++] + " ";
        }
        else if (idx1 === textp1.length) {

            p0.innerHTML += textp0[idx0++] + " ";
        }
        else {

            p0.innerHTML += textp0[idx0++] + " ";
            p1.innerHTML += textp1[idx1++] + " ";
        }

    }, 1000/3);
}