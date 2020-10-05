class Game {

    constructor(name, graphics, release_date, active_players) {

        this.name = name;
        this.graphics = graphics;
        this.release_date = release_date;
        this.active_players = active_players;
    }
}

window.onload = function () {

    var ajaxRequest = new XMLHttpRequest();

    ajaxRequest.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            var games = JSON.parse(this.responseText);
            printJson(games);
        }
    };

    ajaxRequest.open("GET", "jsonFiles/games.json", true);

    ajaxRequest.send();

    function createDiv(games) {

        var info = "";

        for (let idx = 0; idx < games.length; idx++) {

            info += ejs.render("<div>\
                                    <p><span>Name:</span> <%= game.name %></p>\
                                    <p><span>Graphics:</span> <%= game.graphics %></p>\
                                    <p><span>Release date:</span> <%= game.release_date %></p>\
                                    <p><span>Active players:</span> <%= game.active_players %></p>\
                                </div> ", {game: games[idx]});
        }

        return info;
    }

    function printJson(games) {

        var container = document.getElementById("printJson");
        var div = createDiv(games);
        container.innerHTML = div;
    }

    function parsePar(p) {

        var info = p.innerText;

        var idx = 0;
        while (info[idx] != ':')
            idx++;

        info = info.substring(idx + 1).trim();
        return info;
    }

    document.getElementById("selectReleaseDate").onclick = function () {

        var date = document.getElementById("releaseDataInput").value;

        if (isNaN(date)) {

            alert("The input is not a number");
            return;
        }

        if (localStorage.getItem("usedData") == null)
            localStorage.setItem("usedData", "");
        else localStorage.setItem("usedData", localStorage.getItem("usedData") + " " + date);

        document.getElementById("result").innerHTML = "";

        var content = document.getElementById("printJson");
        var divs = content.getElementsByTagName("div");

        var games = [];
        for (let idx = 0; idx < divs.length; idx++) {

            var paragraphs = divs[idx].getElementsByTagName("p");

            var name = parsePar(paragraphs[0]);
            var graphics = parsePar(paragraphs[1]);
            var release_date = parsePar(paragraphs[2]);
            var active_players = parsePar(paragraphs[3]);

            var game = new Game(name, graphics, release_date, active_players);

            if (parseInt(game.release_date) >= parseInt(date))
                games.push(game);
        }

        document.getElementById("result").innerHTML = createDiv(games);
    }

    document.getElementById("sortActivePlayers").onclick = function () {

        document.getElementById("result").innerHTML = "";

        var content = document.getElementById("printJson");
        var divs = content.getElementsByTagName("div");

        var games = [];
        for (let idx = 0; idx < divs.length; idx++) {

            var paragraphs = divs[idx].getElementsByTagName("p");

            var name = parsePar(paragraphs[0]);
            var graphics = parsePar(paragraphs[1]);
            var release_date = parsePar(paragraphs[2]);
            var active_players = parsePar(paragraphs[3]);

            var game = new Game(name, graphics, release_date, active_players);

            games.push(game);
        }
        games.sort(function (a, b) {

            return parseInt(a.active_players) - parseInt(b.active_players);
        });

        var wait = document.createElement("div");
        wait.className = "waitmessage";
        wait.innerHTML = "Wait please...";
        wait.style.padding = "5em";
        document.body.appendChild(wait);

        setTimeout(function () {
            wait.style.display = "none";
            document.getElementById("result").innerHTML = createDiv(games);
        }, 2000);

        
    }

    document.getElementById("countActivePlayers").onclick = function () {

        var number = document.getElementById("activePlayersInput").value;

        if (isNaN(number)) {

            alert("Input is not a number");
            return;
        }

        document.getElementById("result").innerHTML = "";

        var content = document.getElementById("printJson");
        var divs = content.getElementsByTagName("div");

        var cnt = 0;
        for (let idx = 0; idx < divs.length; idx++) {

            var paragraphs = divs[idx].getElementsByTagName("p");

            var name = parsePar(paragraphs[0]);
            var graphics = parsePar(paragraphs[1]);
            var release_date = parsePar(paragraphs[2]);
            var active_players = parsePar(paragraphs[3]);

            var game = new Game(name, graphics, release_date, active_players);

            if (parseInt(game.active_players) >= parseInt(number))
                cnt++;
        }

        var result = document.createElement("p");
        result.innerHTML = "Number of MMORPGS having at least " + number + " active players is :" + cnt;
        document.getElementById("result").appendChild(result);
    }

    document.getElementById("sortFormula").onclick = function () {

        document.getElementById("result").innerHTML = "";

        var content = document.getElementById("printJson");
        var divs = content.getElementsByTagName("div");

        var games = [];
        for (let idx = 0; idx < divs.length; idx++) {

            var paragraphs = divs[idx].getElementsByTagName("p");

            var name = parsePar(paragraphs[0]);
            var graphics = parsePar(paragraphs[1]);
            var release_date = parsePar(paragraphs[2]);
            var active_players = parsePar(paragraphs[3]);

            var game = new Game(name, graphics, release_date, active_players);

            games.push(game);
        }

        games.sort(function (a, b) {

            // ap/rd aka active_players/release_data

            var ap1 = parseInt(a.active_players);
            var rd1 = parseInt(a.release_date);
            var ap2 = parseInt(b.active_players);
            var rd2 = parseInt(b.release_date);

            // ap1/rd1 < ap2/rd2 <=> ap1 * rd2 < ap2 * rd1

            return ap1 * rd2 - ap2 * rd1;
        });

        document.getElementById("result").innerHTML = createDiv(games);
    }

    document.getElementById("selectPattern").onclick = function () {

        var pattern = document.getElementById("patternInput").value;

        document.getElementById("result").innerHTML = "";

        var content = document.getElementById("printJson");
        var divs = content.getElementsByTagName("div");

        var games = []
        for (let idx = 0; idx < divs.length; idx++) {

            var paragraphs = divs[idx].getElementsByTagName("p");

            var name = parsePar(paragraphs[0]);
            var graphics = parsePar(paragraphs[1]);
            var release_date = parsePar(paragraphs[2]);
            var active_players = parsePar(paragraphs[3]);

            var issubstring = false;
            for (let i = 0; i <= name.length - pattern.length && !issubstring; i++)
            if (name.substring(i, i + pattern.length) == pattern)
                issubstring = true;

            if (issubstring)
                games.push(new Game(name, graphics, release_date, active_players));
        }

        document.getElementById("result").innerHTML = createDiv(games);
    }

    document.getElementById("usedValues").onclick = function () {

        var string = localStorage.getItem("usedData");
        var res = document.getElementById("result");
        string = "Used values are " + string;
        res.innerHTML = string;
    }
}

const messages = [
    "Today Elder Scrolls Online is free on Steam!",
    "Rift is a really nice game to play with your friends",
    "World of Warcraft is considered to be the best MMORPG of all time",
    "Everquest is one of the oldest MMORPGs",
    "Runescape has currently the most active players of all MMORPGS"
]

function printMessages() {
    var div = document.createElement("div");
    div.innerHTML = messages[0];
    div.style.textAlign = "center";
    div.style.paddingBottom = "5em";
    document.body.appendChild(div);
    var idx = 1;
    setInterval(function () {

        if (idx == messages.length)
            idx = 0;
        else {

            
            div.innerHTML = messages[idx++];
            
        }

    }, 5000);
}

printMessages();