function countWords() {

    var tags = document.getElementsByTagName("*");

    var idx = 0
    while (tags[idx].tagName != "BODY")
        ++idx;
    
    var text = tags[idx].innerText;
 
    const alphanum = /^[0-9a-zA-Z]+$/;

    idx = 0;
    var words = 0;
    while (idx < text.length) {

        while (idx < text.length && !text[idx].match(alphanum)) {

            idx++;
        }

        while (idx < text.length && text[idx].match(alphanum)) {

            ++idx;
        }

        ++words;
    }

    var footer = document.getElementById("Footer");
    var node = document.createElement("p");
    node.innerHTML = words;
    footer.appendChild(node);
}

countWords();