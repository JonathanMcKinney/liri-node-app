require("dotenv").config();
var fs=require('fs');
var keys = require("./keys.js");
var axios = require('axios');
var moment = require('moment');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var action = process.argv[2];
var search = process.argv.slice(3);

var command = {
    'concert-this': function () {
        search = search.join(" ");
        var queryUrl = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp";

        console.log(queryUrl);

        axios.get(queryUrl)
            .then(function (response) {
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    console.log(results[i].venue.name);
                    if (results[i].venue.region === "") {
                        console.log(results[i].venue.city + ", " + results[i].venue.country);
                    }
                    console.log(results[i].venue.city + ", " + results[i].venue.region);
                    console.log(moment(results[i].datetime).format("MM/DD/YYYY"));
                    console.log("-----------------")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    'spotify-this-song': function () {
        spotify.search({ type: 'track', query: search }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            for (var j = 0; j < data.tracks.items.length; j++) {
                var art = [];
                for (var i = 0; i < data.tracks.items[j].album.artists.length; i++) {
                    // console.log(data.tracks.items[j].album.artists[i].name);
                    art.push(data.tracks.items[j].album.artists[i].name);
                }
                console.log(art.join(", "));
                console.log(data.tracks.items[j].name);
                console.log(data.tracks.items[j].preview_url);
                console.log(data.tracks.items[j].album.name);
                console.log("-----------------");
            }
        });
    },
    'movie-this': function(){
        search = search.join("+");

        if (!process.argv[3]) {

            axios.get("http://www.omdbapi.com/?t=mr+nobody&apikey=trilogy")
            .then(function(response){
                console.log("If you haven't seen 'Mr. Nobody,' then you should.");
                console.log("It's on Netflix!");
                console.log("-----------------");
                console.log("Title: " + response.data.Title);
                console.log("Released: " + response.data.Year);
                console.log("IMDB rating: " + response.data.Ratings[0].Value);
                console.log("Prodoction country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log("-----------------")
            })
            .catch(function (error) {
                console.log(error);
            });
        }else {
            var queryUrl = "http://www.omdbapi.com/?t=" + search + "&apikey=trilogy";

            axios.get(queryUrl)
            .then(function(response){
                console.log("Title: " + response.data.Title);
                console.log("Released: " + response.data.Year);
                console.log("IMDB rating: " + response.data.Ratings[0].Value);
                console.log("Prodoction country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log("-----------------")
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    },
    'do-what-it-says': function(){
        fs.readFile('random.txt', 'utf8', function(error, data){
            if (error) {
                return console.log(error);
              }
            data = data.split(",");
            action = data[0];
            search = data[1].toString(); 
            console.log(search);
            console.log(action);
            // return search && command[action]();
        })
    }
}
command[action]();