console.clear();

var express = require('express'); 
var fs = require('fs');
var app = express();
var port = 5500;

var serverData = {
    images: [],
    bg: []
}

app.use(express.static(__dirname+'/public'));

fs.readdir(__dirname+"/public/imgs/", (err, files) => {
    if (err)
        console.log(err);
    else {   
        files.forEach(file => {
            if(file != "wpp")
            serverData.images.push(file);
        });
    }
});

fs.readdir(__dirname+"/public/imgs/wpp/mainMenuBgs/", (err, files) => {
    if (err)
        console.log(err);
    else {   
        files.forEach(file => { 
            serverData.bg.push(file);
        });
    }
});


app.get('/serverData', function(req, res){
    res.json(serverData);
    res.end();
});


app.get('/', function(req, res) {
    res.sendfile("index.html");
});

app.get('/gallery', function(req, res) {
    res.sendfile("gallery.html");
});



app.listen(port, () => {
    console.log('\x1b[33m%s\x1b[0m', "Server Started.");
    require('dns').lookup(require('os').hostname(), function (err, add, fam) {
        console.log("Ip Link:", '\x1b[36m', 'http://'+ add + ":" + port +"/",'\x1b[0m');
        console.log("Localhost Link:", '\x1b[36m', 'http://localhost:' + port +"/",'\x1b[0m');
    })
});