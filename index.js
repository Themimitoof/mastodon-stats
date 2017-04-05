/*
    mastodon-stats: Get easily the data from the about page of Mastodon instances.
    Version: 1.0
    Author: Michael Vieira <contact+dev[at]mvieira[dot]fr>
    Licence: MIT
*/

// Include all dependencies
var express = require("express");
var request = require("request");
var cheerio = require("cheerio");
var config  = require("./config.js"); 
var app     = express();

// getData function
var getData = function(instance, callback) {
    request(instance, (err, data, response) => {
        if(err) callback({ code: 400, message: "An error is occured with the specified link. Please check the URI and restart." }, null);
        else {
            var $ = cheerio.load(data.body);

            // Check if is Mastodon instance (by getting the source code link)
            if($("a[href='https://github.com/tootsuite/mastodon']").text() == "") callback({ code: 400, message: "An error is occured with the specified link. Cannot find Mastodon instance." }, null);
            else {
                var data = $(".section strong");
                callback(null, {
                    users: parseInt($(data[0]).text().replace(",", "")),
                    messages: parseInt($(data[1]).text().replace(",", "")),
                    connected_instances: parseInt($(data[2]).text().replace(",", ""))
                });
            }
        }
    });
}

// Routes
app.get("/", (req, res) => { res.send({ code: 200, message: "Hello! Mastodon-stats API are operational :)"}) });


app.get("/stats", (req, res) => {
    if(typeof req.query.instance == undefined || req.query.instance == null) res.status(400).send({code: 400, message: "An error is occured with the specified link. Please check the URI and restart."});
    else {
        if(req.query.instance.match(/\/about\/more(\/|)$/) != null) {
            getData(req.query.instance, (err, data) => {
                if(err) res.status(err.code).send(err);
                else res.send(data);
            });
        } else {
            getData(req.query.instance + "/about/more", (err, data) => {
                if(err) res.status(err.code).send(err);
                else res.send(data);
            });
        }
    }
});


// Open express port
app.listen(config.bind_port, config.bind_port, (err) => {
    if(err) throw err;
    console.log("The server as been started on " + config.bind_host + ":" + config.bind_port);
});