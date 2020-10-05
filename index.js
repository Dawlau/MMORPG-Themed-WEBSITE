const express = require('express');
const path = require('path');
const formidable = require('formidable');
const session = require('express-session');
const fs = require('fs');
const crypto = require('crypto');


const PORT = 3000;
const URL = "http://localhost:3000/";

const app = express();

//session middleware
app.use(session({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: false
}));

//ejs middleware
app.set('view engine', 'ejs');

// loading static files

app.use('/cssFiles', express.static(path.join(__dirname, 'resources', 'cssFiles')));
app.use('/images', express.static(path.join(__dirname, 'resources', 'images')));
app.use('/javascriptFiles', express.static(path.join(__dirname, 'resources', 'javascriptFiles')));
app.use('/htmlFiles', express.static(path.join(__dirname, 'resources', 'htmlFiles')));
app.use('/jsonFiles', express.static(path.join(__dirname, 'resources', 'jsonFiles')));

//main page

app.use('/', express.static(path.join(__dirname, 'resources', 'htmlFiles')));

app.get('/index', function (req, res) {

    res.render('index', { user: req.session.username });
});

app.get('/Common_Features', function (req, res) {

    res.render('Common_Features', {user: req.session.username});
});

app.get('/Gallery', function (req, res) {

    res.render('Gallery', { user: req.session.username });
});

app.get('/Table', function (req, res) {

    res.render('Table', { user: req.session.username });
});

app.get('/MMOS', function (req, res) {

    res.render('MMOS', { user: req.session.username });
});

function encryptPassword(password) {

    var cipher = crypto.createCipheriv('aes-192-cbc', crypto.scryptSync(password, 'GfG', 24), Buffer.alloc(16, 0));
    var encryptedPassword = cipher.update(password);
    encryptedPassword = Buffer.concat([encryptedPassword, cipher.final()]);
    encryptedPassword = encryptedPassword.toString('hex');

    return encryptedPassword;
}

app.post('/login.html', function (req, res) {

    var form = formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {

        var username = fields.username;
        var password = fields.password;

        //encrypt password
        password = encryptPassword(password);

        function findUser(users, user) {

            for (let x of users)
                if (x["username"] === user["username"] && x["password"] === user["password"])
                    return true;
            return false;
        }

        const user = {

            "username": username,
            "password": password
        };

        var users = JSON.parse(fs.readFileSync('resources/jsonFiles/users.json')); // load JSON file for users

        if (findUser(users, user)) {

            req.session.username = user.username;
            req.session.logged = true;
            res.render('index', { user: req.session.username });
        }
        else {

            res.redirect(URL + "login.html");
        }

    });
});

app.post('/register.html', function (req, res) {

    var form = formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {

        var username = fields.username;
        var password = fields.password;
        var email = fields.email;
        var gender = fields.gender;
        var description = fields.description;

        function findUser(users, user) {

            for (let x of users)
                if (x["username"] === user["username"])
                    return true;
            return false;
        }

        var users = JSON.parse(fs.readFileSync('resources/jsonFiles/users.json'));
        console.log(users);
        const user = {

            "username": username,
            "password": encryptPassword(password),
            "email": email,
            "gender": gender,
            "description": description
        }

        console.log(user);

        if (!findUser(users, user)) {
            
            //update json file
            
            users.push(user);
            console.log(users);
            fs.writeFileSync('resources/jsonFiles/users.json', JSON.stringify(users, null, 2));

            res.redirect(URL + "login.html");
        }
        else {

            //redirect to the same page

            res.redirect(URL + "register.html")
            
        }
    });
});

app.get('/logout.html', function (req, res) {

    req.session.destroy();
    res.redirect(URL + "logout.html");
});

// 404 page
app.use(function (req, res) {
    res.status(404).redirect(URL +  '404.html');
});

// run server on PORT
app.listen(PORT, () => console.log(`The server is running on ${PORT}`));